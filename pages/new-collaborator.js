/*
* Página para adicionar um colaborador
*/

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import ADD_COLLABORATOR from '../lib/apollo/queries/addCollaborator'
import { Box, Flex, Heading, Input, Button, Link, Text } from '@chakra-ui/react'
import { isValidDateBrazilianFormat, convertToGraphQLDate } from '../utils'

function NewCollaborator() {
  const router = useRouter()
  const [formState, setFormState] = useState({})
  const [error, setError] = useState(null)
  const [addCollaborator] = useMutation(ADD_COLLABORATOR, {
    onCompleted() {
      router.push('/')
    },
  })

  const handleInput = ({ e, name }) => {
    if (name === 'contract_dt') {
      const dateValue = e.target.value
      const isValidDate = isValidDateBrazilianFormat(dateValue)

      setError(isValidDate ? null : 'Data de contratação inválida')
      setFormState({
        ...formState,
        contract_dt: isValidDate ? convertToGraphQLDate(dateValue) : '',
      })
    } else {
      setFormState({
        ...formState,
        [name]: e.target.value,
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formState.name || !formState.position || !formState.contract_dt) {
      setError('Por favor, preencha todos os campos obrigatórios')
      return
    }

    addCollaborator({ variables: formState })
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={20}
    >
      <Heading as="h1" fontSize="3xl" mb={10}>
        Adicione um novo Colaborador
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
          <label htmlFor="name" color="purple.900" mb={2}>
            Nome
          </label>
          <Input
            id="name"
            type="text"
            onChange={(e) => handleInput({ e, name: 'name' })}
            placeholder="O nome dele"
            p={2}
            rounded="lg"
            w="full"
          />
        </Box>
        <Box>
          <label htmlFor="position" color="purple.900" mb={2}>
            Cargo
          </label>
          <Input
            id="position"
            type="text"
            onChange={(e) => handleInput({ e, name: 'position' })}
            placeholder="O cargo dele"
            p={2}
            rounded="lg"
            w="full"
          />
        </Box>
        <Box>
          <label htmlFor="contract_dt" color="purple.900" mb={2}>
            Data de Contratação
          </label>
          <Input
            id="contract_dt"
            type="text"
            onChange={(e) => handleInput({ e, name: 'contract_dt' })}
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

export default NewCollaborator
