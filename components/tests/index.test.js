/**
 * @jest-environment jsdom
 */

// Testes de Integração

import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import Collaborator from '../Collaborator'

describe('Collaborator', () => {
  test('Renders collaborator information correctly', () => {
    const mockCollaborator = {
      name: 'Amando Lourenço',
      position: 'Full Stack Developer',
      contract_dt: '2023-08-13T12:00:00Z',
    }

    const { queryByText } = render(<Collaborator {...mockCollaborator} />)

    const nameElement = queryByText('Amando Lourenço')
    const positionElement = queryByText('Full Stack Developer')
    const contractDateElement = queryByText('13-08-2023')

    expect(nameElement).toBeInTheDocument()
    expect(positionElement).toBeInTheDocument()
    expect(contractDateElement).toBeInTheDocument()
  })
})
