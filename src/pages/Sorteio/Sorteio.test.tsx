import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes'
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio'
import Sorteio from './Sorteio'
import { act } from 'react-dom/test-utils'

jest.mock('../../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})
jest.mock('../../state/hook/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }
})

const mockNavigation = jest.fn()
jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigation
    }
})

describe('Na página de sorteio', () => {

    const participantes = ['Daenerys Targaryen', 'Daemon', 'Jaime Lennister']
    const resultado = new Map ([
        ['Daenerys Targaryen', 'Daemon'],
        ['Daemon', 'Jaime Lennister'],
        ['Jaime Lennister', 'Daenerys Targaryen']
    ])

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    })

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const options = screen.queryAllByRole('option')
        expect(options).toHaveLength(participantes.length + 1) //pois tem uma option value == ""
    })

    test('o amigo secreto é exibido quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o seu nome')
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        const amigoSecreto = screen.getByRole('alert')
        expect(amigoSecreto).toBeInTheDocument()
    })

    test('o nome do amigo secreto sorteado some após 5 segundos', () => {
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o seu nome')
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        let amigoSecreto = screen.getByRole('alert')
        expect(amigoSecreto).toBeInTheDocument()

        act(() => {
            jest.runAllTimers()
        });
 
        expect(amigoSecreto).not.toBeInTheDocument()
    })

    test('ao clicar em voltar, a página inicial é exibida', () => {
        render(
            <RecoilRoot>
                <Sorteio/>
            </RecoilRoot>
        )
        const button = screen.getByRole('navigation')
        fireEvent.click(button)
        expect(mockNavigation).toHaveBeenCalledTimes(1)
        expect(mockNavigation).toHaveBeenCalledWith('/')
    })
})