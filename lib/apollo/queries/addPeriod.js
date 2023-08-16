/*
* Mutation para adicionar um período
*/

import { gql } from '@apollo/client'

const ADD_PERIOD = gql`
  mutation createPeriod(
    $start_date: Date!
    $end_date: Date!
    $collaborator: ID!
  ) {
    createPeriod(
      data: {
        start_date: $start_date
        end_date: $end_date
        collaborator: $collaborator
      }
    ) {
      data {
        id
        attributes {
          start_date
          end_date
        }
      }
    }
  }
`
export default ADD_PERIOD
