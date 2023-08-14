import { gql } from '@apollo/client'

const GET_COLLABORATOR = gql`
  query ($id: ID!) {
    collaborator(id: $id) {
      data {
        id
        attributes {
          name
          position
          contract_dt
          periods {
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
      }
    }
  }
`

export default GET_COLLABORATOR
