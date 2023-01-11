// src/paginas/Sorteio.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../componentes/Card/Card"
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes"
import { useResultadoSorteio } from "../../state/hook/useResultadoSorteio"

import './Sorteio.css'

const Sorteio = () => {
    const participantes = useListaDeParticipantes()
    const resultado = useResultadoSorteio()
    const navigateTo = useNavigate()

    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
            setTimeout(() => setAmigoSecreto("") , 5000)
        }
    }

    return (
        <Card>
            <section className="sorteio">
                <h2>Quem vai tirar o papelzinho?</h2>
                <form onSubmit={sortear}>
                    <select
                        required
                        name="participanteDavez"
                        id="participanteDavez"
                        placeholder="Selecione o seu nome"
                        value={participanteDaVez}
                        onChange={evento => setParticipanteDaVez(evento.target.value)}
                    >
                        <option value="">Selecione o seu nome</option>
                        {participantes.map((participante, idx) => <option key={idx}>{participante}</option>)}
                    </select>
                    <p>Clique em sortear para ver quem é seu amigo secreto!</p>
                    <button className="botao-sortear">Sortear</button>
                </form>
                {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
                <footer className="sorteio">
                    <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
                    <button role="navigation" onClick={ev => navigateTo('/')}>Voltar</button>
                </footer>
            </section>
        </Card>
    )
}

export default Sorteio