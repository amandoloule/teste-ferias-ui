import { useQuery } from '@apollo/client'
import GET_COLLABORATORS from '../lib/apollo/queries/getCollaborators'
import Collaborator from '../components/Collaborator'
import Loading from '../components/Loading'
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react'

function HomePage() {
  const { loading, data } = useQuery(GET_COLLABORATORS, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <Loading />
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
    </Flex>
  )
}

export default HomePage
