/*
 * Página inicial na qual é listada os colaboradores
 */

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import GET_COLLABORATORS from '../lib/apollo/queries/getCollaborators'
import Collaborator from '../components/Collaborator'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react'

function HomePage() {
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useQuery(GET_COLLABORATORS, {
    fetchPolicy: 'cache-and-network',
    variables: { page: 1, psize: 2 },
  })

  const loadMore = () => {
    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.collaborators.data.length) {
          setHasMore(false)
          return prev
        }

        return {
          collaborators: {
            ...fetchMoreResult.collaborators,
            data: [
              ...prev.collaborators.data,
              ...fetchMoreResult.collaborators.data,
            ],
          },
        }
      },
    })
    setPage(page + 1)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error errorMessage={error.message} />
  }

  const collaborators = data.collaborators.data

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={20}
    >
      <Heading as="h1" fontSize="3xl" mb={5}>
        Colaboradores
      </Heading>
      <ChakraLink href="/new-collaborator">
        <Button
          mb={8}
          border="2px"
          borderColor="purple.800"
          color="purple.900"
          p={2}
          borderRadius="lg"
          bg="gray.50"
          _hover={{
            bg: 'purple.50',
            transform: 'scale(1.05)',
            textDecoration: 'none',
          }}
          _active={{ bg: 'purple.100' }}
        >
          Adicionar Colaborador
        </Button>
      </ChakraLink>
      <Box>
        {collaborators.map((col) => (
          <ChakraLink
            href={`/collaborators/${col.id}`}
            key={col.id}
            _hover={{ color: 'purple.600' }}
          >
            <Collaborator {...col.attributes} />
          </ChakraLink>
        ))}
      </Box>
      <Button
        onClick={loadMore}
        mt={4}
        visibility={hasMore ? 'visible' : 'hidden'}
      >
        Ver mais...
      </Button>
    </Flex>
  )
}

export default HomePage
