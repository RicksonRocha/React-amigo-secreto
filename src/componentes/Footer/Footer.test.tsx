import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Footer from './Footer'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipante'

jest.mock('../../state/hook/useListaDeParticipante', () => {
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
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Rickson', 'Juliane', 'Lula da Silva'])
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
    })
})