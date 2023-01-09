import Card from "../componentes/Card/Card"
import Formulario from "../componentes/Formulario/Formulario"
import { ListaParticipantes } from "../componentes/Lista/ListaParticipantes"
import Footer from "../componentes/Footer/Footer"

const Configuracao = () => {
    return (
        <Card>
            <section>
                <h2>Vamos começar!</h2>
                <Formulario />
                <ListaParticipantes />
                <Footer />
            </section>
        </Card>
    )
}

export default Configuracao