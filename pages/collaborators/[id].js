import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import GET_COLLABORATOR from '../../lib/apollo/queries/getCollaborator'
import Collaborator from '../../components/Collaborator'
import Loading from '../../components/Loading'
import { Box, Flex, Heading, Link, VStack, ChakraLink } from '@chakra-ui/react'

const Period = ({ start_date, end_date }) => {
  return (
    <Box p={3} borderWidth="1px" borderRadius="lg">
      <p>
        <b>Data de Início:</b> {start_date}
      </p>
      <p>
        <b>Data de Término:</b> {end_date}
      </p>
    </Box>
  )
}

function CollaboratorPage() {
  const router = useRouter()
  const { id } = router.query

  const { loading, data } = useQuery(GET_COLLABORATOR, {
    variables: { id },
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <Loading />
  }

  const collaborator = data?.collaborator?.data
  const periods = collaborator?.attributes?.periods?.data || []

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={20}
    >
      <Heading as="h1" fontSize="3xl" mb={5}>
        Colaborador
      </Heading>
      <Box>
        <Collaborator {...collaborator.attributes} />
      </Box>
      <Box mt={5}>
        <Heading as="h2" fontSize="xl" mb={3}>
          Períodos de Férias
        </Heading>
        <Link href={`new-period?collaboratorId=${id}`}>
          Adicionar Novo Período de Férias
        </Link>
        <VStack spacing={3} align="stretch">
          {periods.map((period) => (
            <Period
              key={period.id}
              start_date={period.attributes.start_date}
              end_date={period.attributes.end_date}
            />
          ))}
        </VStack>
      </Box>
      <Link href="/" color="purple.600">
        Voltar ao Início
      </Link>
    </Flex>
  )
}

export default CollaboratorPage
