import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes'
import Sorteio from './Sorteio'

jest.mock('../../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

describe('Na página de sorteio', () => {

    const participantes = ['Rickson', 'Juliane', 'Daenerys']
    beforeEach(() => (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes))

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const options = screen.queryAllByRole('option')
        expect(options).toHaveLength(participantes.length)
    })
})