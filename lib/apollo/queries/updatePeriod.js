/*
* Mutation para atualizar um período
*/

import { gql } from '@apollo/client'

const UPDATE_PERIOD = gql`
  mutation updatePeriod($periodId: ID!, $numPeriods: Int!) {
    updatePeriod(id: $periodId, data: { num_periods: $numPeriods }) {
      data {
        id
        attributes {
          start_date
          end_date
          num_periods
        }
      }
    }
  }
`

export default UPDATE_PERIOD
