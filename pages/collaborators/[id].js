/*
* Página individual com um colaborador e na qual é listada os períodos
*/

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import GET_COLLABORATOR from '../../lib/apollo/queries/getCollaborator'
import Collaborator from '../../components/Collaborator'
import Loading from '../../components/Loading'
import Period from '../../components/Period'
import Error from '../../components/Error'
import { Box, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'

function CollaboratorPage() {
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(GET_COLLABORATOR, {
    variables: { id },
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error errorMessage={error.message} />
  }

  const collaborator = data?.collaborator?.data
  const periods = collaborator?.attributes?.periods?.data || []

  // Código para calcular a quantidade de férias ganhas
  const totalYears = periods.reduce((total, period) => {
    const startDate = new Date(period.attributes.start_date)
    const endDate = new Date(period.attributes.end_date)
    const daysInPeriod = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
    return total + daysInPeriod / 365
  }, 0)
  const totalVacationDays = Math.floor(totalYears) * 30

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={10}
    >
      <Heading as="h1" fontSize="3xl" mb={3}>
        Colaborador
      </Heading>

      <Box mb={4}>
        {collaborator?.attributes && (
          <Collaborator {...collaborator.attributes} />
        )}
      </Box>

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold" color="purple.600" mb={2}>
          Total de Férias Ganhas: {totalVacationDays} dias
        </Text>

        <Heading as="h2" fontSize="xl" mb={2}>
          Períodos de Férias
        </Heading>
        <Link href={`new-period?collaboratorId=${id}`} color="purple.600">
          Adicionar Novo Período de Férias
        </Link>

        <VStack spacing={2} align="stretch" mt={3}>
          {periods.map((period) => (
            <Period
              key={period.id}
              start_date={period.attributes.start_date}
              end_date={period.attributes.end_date}
              periodId={period.id}
              numPeriods={period.attributes.num_periods}
            />
          ))}
        </VStack>
      </Box>

      <Link href="/" color="purple.600" mt={4}>
        Voltar ao Início
      </Link>
    </Flex>
  )
}

export default CollaboratorPage
