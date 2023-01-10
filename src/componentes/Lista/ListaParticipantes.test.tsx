import React from "react"
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from "recoil"
import { ListaParticipantes } from "./ListaParticipantes"
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes"

jest.mock('../../state/hook/useListaDeParticipantes', () => {
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

        const mensagemParticipantes = screen.getByRole('alert')
        expect(mensagemParticipantes).toHaveTextContent('Mínimo de 3 participantes para iniciar')
    })
})

describe('Uma lista preenchida de participantes', () => {
    const participantes = ['Daenerys', 'Rhaenyra', 'Cersei']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })
    test('deve ser renderizada com 3 elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)
        const mensagemParticipantes = screen.getByRole('alert')
        expect(mensagemParticipantes).toHaveTextContent('Pronto para iniciar!')
    })
})

describe('Uma lista com 1 participante', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Daenerys'])
    })
    test('deve requerir mais 2 participantes', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
        const mensagemParticipantes = screen.getByRole('alert')
        expect(mensagemParticipantes).toHaveTextContent('Faltam 2 participantes para iniciar')
    })
})

describe('Uma lista com 2 participantes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Daenerys', 'Rhaenyra'])
    })
    test('deve requerir mais 1 participante', () => {
        render(<RecoilRoot><ListaParticipantes /></RecoilRoot>)
        const mensagemParticipantes = screen.getByRole('alert')
        expect(mensagemParticipantes).toHaveTextContent('Falta 1 participante para iniciar')
    })
})