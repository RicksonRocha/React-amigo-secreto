import { realizarSorteio } from "./realizarSorteio"

describe('Dado um sorteio de amigo secreto', () => {

    test('cada participante não sorteie o próprio nome', () => {
        const participantes = ['Daenerys Targaryen', 'John Snow', 'Cersei Lennister', 'Arya Stark']
        const sorteio = realizarSorteio(participantes)

        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})