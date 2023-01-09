import React from "react"
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from "recoil"
import { ListaParticipantes } from "./ListaParticipantes"
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipante"

jest.mock('../../state/hook/useListaDeParticipante', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

describe('Uma lista vazia de participantes', () => {

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('deve ser renderizada sem elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)
    })
})

describe('Uma lista preenchida de participantes', () => {
    const participantes = ['Rickson', 'Juliane']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })
    test('deve ser renderizada com 2 elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)
    })
})