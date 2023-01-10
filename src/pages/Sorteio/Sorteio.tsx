import React from "react";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";

const Sorteio = () => {
    const participantes = useListaDeParticipantes()

    return (
        <section>
            <form>
                <select name="participantesDaVez" id="participantesDaVez">
                    {participantes.map((participante, idx) => <option key={idx}>{participante}</option>)}
                </select>
            </form>
        </section>
    )
}

export default Sorteio