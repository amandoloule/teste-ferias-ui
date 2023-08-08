import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import ADD_PERIOD from '../../lib/apollo/queries/addPeriod'
import { Box, Flex, Heading, Input, Button, Link, Text } from '@chakra-ui/react'
import { format, parse, isValid } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

function NewPeriodPage() {
  const router = useRouter()
  const { collaboratorId } = router.query
  const [formState, setFormState] = useState({})
  const [error, setError] = useState(null)
  const [addPeriod] = useMutation(ADD_PERIOD, {
    onCompleted() {
      router.push(`${collaboratorId}`)
    },
  })

  const handleInput = ({ e, name }) => {
    if (name === 'start_date' || name === 'end_date') {
      const dateValue = e.target.value
      const isValidDate = isValidDateBrazilianFormat(dateValue)

      setError(isValidDate ? null : 'Data inválida')
      setFormState({
        ...formState,
        [name]: isValidDate ? convertToGraphQLDate(dateValue) : '',
      })
    } else {
      setFormState({
        ...formState,
        [name]: e.target.value,
      })
    }
  }

  const isValidDateBrazilianFormat = (date) => {
    const parsedDate = parse(date, 'dd-MM-yyyy', new Date())
    return isValid(parsedDate)
  }

  const convertToGraphQLDate = (date) => {
    const parsedDate = parse(date, 'dd-MM-yyyy', new Date())
    const zonedDate = utcToZonedTime(parsedDate, 'America/Sao_Paulo')
    return format(zonedDate, 'yyyy-MM-dd')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!collaboratorId) {
      setError('ID do colaborador não encontrado na rota')
      return
    }

    if (!formState.start_date || !formState.end_date) {
      setError('Por favor, preencha todas as datas obrigatórias')
      return
    }

    addPeriod({ variables: { ...formState, collaborator: collaboratorId } })
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={20}
    >
      <Heading as="h1" fontSize="3xl" mb={10}>
        Adicione um novo Período de Férias
      </Heading>
      <Box
        maxW="7xl"
        shadow="xl"
        bg="purple.50"
        p={7}
        mb={10}
        gridTemplateRows="1fr"
        gap={4}
        rounded="md"
        borderWidth="2px"
        borderColor="purple.800"
      >
        <Box>
          <label htmlFor="start_date" color="purple.900" mb={2}>
            Data de Início
          </label>
          <Input
            id="start_date"
            type="text"
            onChange={(e) => handleInput({ e, name: 'start_date' })}
            placeholder="DD-MM-AAAA"
            p={2}
            rounded="lg"
            w="full"
          />
        </Box>
        <Box>
          <label htmlFor="end_date" color="purple.900" mb={2}>
            Data de Término
          </label>
          <Input
            id="end_date"
            type="text"
            onChange={(e) => handleInput({ e, name: 'end_date' })}
            placeholder="DD-MM-AAAA"
            p={2}
            rounded="lg"
            w="full"
          />
        </Box>
        {error && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {error}
          </Text>
        )}
        <Button
          bg="purple.600"
          p={4}
          rounded="lg"
          color="gray.50"
          m="auto"
          mt={4}
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </Box>
      <Link href="/" color="purple.600">
        Voltar ao Início
      </Link>
    </Flex>
  )
}

export default NewPeriodPage
