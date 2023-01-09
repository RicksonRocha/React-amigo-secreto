import React from 'react'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipante'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const participantes = useListaDeParticipantes()
    const navigate = useNavigate()

    const iniciar = () => {
        navigate('/sorteio')
    }

    return (
        <footer>
            <button onClick={iniciar} disabled={participantes.length < 3}>Iniciar brincadeira</button>
        </footer>
    )
}

export default Footer