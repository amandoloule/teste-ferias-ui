import { gql } from '@apollo/client'

const UPDATE_PERIOD = gql`
  mutation updatePeriod($periodId: ID!, $numPeriods: Int!) {
    updatePeriod(id: $periodId, data: { num_periods: $numPeriods }) {
      data {
        id
        attributes {
          num_periods
        }
      }
    }
  }
`

export default UPDATE_PERIOD
