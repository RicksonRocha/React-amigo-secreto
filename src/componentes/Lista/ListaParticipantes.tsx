import React from 'react'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes'

export const ListaParticipantes = () => {
    const participantes: string[] = useListaDeParticipantes()
    const quantidade = participantes.length
    const mensagem = {
        minimo: 'Mínimo de 3 participantes para iniciar',
        faltaUm: `Falta 1 participante para iniciar`,
        faltaDois: `Faltam 2 participantes para iniciar`,
        prontos: 'Pronto para iniciar!'
    }
    
    return (
        <ul>
            {quantidade < 3 
                ? (quantidade === 0 
                    ? <p role="alert">{mensagem['minimo']}</p> 
                    : <p role="alert">{quantidade === 2 ? mensagem['faltaUm'] : mensagem['faltaDois']}</p>) 
                : <p role="alert">{mensagem['prontos']}</p>
            }
            {participantes.map((participante, idx) => <li key={idx}>{participante}</li>)}
        </ul>
    )
}
