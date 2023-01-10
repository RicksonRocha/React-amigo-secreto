import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Footer from './Footer'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes'

jest.mock('../../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavigation = jest.fn()
jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigation
    }
})

const mockSorteio = jest.fn()
jest.mock('../../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

describe('Quando não existem participantes suficientes', () => {
    
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test('a brincadeira não pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Footer/>
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })
})

describe('Quando existem participantes suficientes', () => {
    
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Rhaenyra', 'Jacaerys', 'Rhaenys'])
    })

    test('a brincadeira pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Footer/>
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
    })
    
    test('a brincadeira foi iniciada', () => {
        render(
            <RecoilRoot>
                <Footer/>
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(mockNavigation).toHaveBeenCalledTimes(1) //qtd de vezes que foi chamado
        expect(mockNavigation).toHaveBeenCalledWith('/sorteio') // chamado com 'argumento'
        expect(mockSorteio).toHaveBeenCalledTimes(1)
    })
})