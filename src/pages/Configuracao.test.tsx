import { render } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Configuracao from './Configuracao'

const mockNavigation = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigation
    }
})

describe('A pagina de configuracao', () => {
    test('deve ser renderizada corretamente', () => {
        const { container } = render(
            <RecoilRoot>
                <Configuracao />
            </RecoilRoot>
        )

        expect(container).toMatchSnapshot() // a primeira foto sempre será comparada com a nova
    })
})