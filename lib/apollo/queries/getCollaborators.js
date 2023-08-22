/*
 * Query para obter o colaboradores
 */

import { gql } from '@apollo/client'

const GET_COLLABORATORS = gql`
  query ($page: Int, $psize: Int) {
    collaborators(pagination: { page: $page, pageSize: $psize }) {
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
