import React from 'react'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipante'

export const ListaParticipantes = () => {
    const participantes: string[] = useListaDeParticipantes()
    return (
        <ul>
            {participantes.map((participante, idx) => <li key={idx}>{participante}</li>)}
        </ul>
    )
}
