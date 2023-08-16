/*
* Testes unitários
*/

import { isValidDateBrazilianFormat, convertToGraphQLDate } from '../index'

describe('Checar se é uma data brasileira válida', () => {
  test('Deve ser uma data no formato 26-02-1990', () => {
    const initialDate = '15-07-2015'
    const dateResult = isValidDateBrazilianFormat(initialDate)
    expect(dateResult).toEqual(true)
  })
})

describe('Converter para uma data aceitável no GraphQL', () => {
  test('Converter para uma data no formato 1990-02-26', () => {
    const initialDate = '15-07-2015'
    const dateResult = convertToGraphQLDate(initialDate)
    expect(dateResult).toEqual('2015-07-15')
  })
})
