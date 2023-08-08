import { gql } from '@apollo/client'

const GET_COLLABORATORS = gql`
  query {
    collaborators {
      data {
        id
        attributes {
          name
          position
          contract_dt
        }
      }
    }
  }
`

export default GET_COLLABORATORS
