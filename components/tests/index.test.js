/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import Collaborator from '../Collaborator'
import Period from '../Period'

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

describe('Period', () => {
  test('Renders period information correctly', () => {
    const mockPeriod = {
      start_date: '2023-08-01T12:00:00Z',
      end_date: '2023-08-10T12:00:00Z',
    }

    const { queryByText } = render(<Period {...mockPeriod} />)

    const startDateElement = queryByText('01-08-2023')
    const endDateElement = queryByText('10-08-2023')
    const totalDaysElement = queryByText('10 dias')

    expect(startDateElement).toBeInTheDocument()
    expect(endDateElement).toBeInTheDocument()
    expect(totalDaysElement).toBeInTheDocument()
  })
})
