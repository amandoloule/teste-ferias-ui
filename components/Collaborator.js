import { Box, Text, Divider } from '@chakra-ui/react'
import { format } from 'date-fns'

function Collaborator({ name, position, contract_dt }) {
  const formattedDate = format(new Date(contract_dt), 'dd-MM-yyyy')

  return (
    <Box
      maxW="7xl"
      rounded="md"
      borderWidth="2px"
      borderColor="purple.800"
      shadow="xl"
      bg="purple.50"
      p={7}
      mb={10}
    >
      <Text color="gray.700" fontSize="xl">
        {name}
      </Text>
      <Divider my={3} borderColor="purple.800" />
      <Box>
        <Text color="purple.900">
          <b>Cargo: </b>
          {position}
        </Text>
        <Text color="purple.900">
          <b>Data de Contratação: </b>
          {formattedDate}
        </Text>
      </Box>
    </Box>
  )
}

export default Collaborator