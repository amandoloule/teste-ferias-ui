/*
* Mutation para adicionar um colaborador
*/

import { gql } from '@apollo/client'

const ADD_COLLABORATOR = gql`
  mutation createCollaborator(
    $name: String!
    $position: String!
    $contract_dt: Date!
  ) {
    createCollaborator(
      data: { name: $name, position: $position, contract_dt: $contract_dt }
    ) {
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
export default ADD_COLLABORATOR
