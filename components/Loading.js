/*
* Componente Loading
*/

import { Box, Flex, Spinner } from '@chakra-ui/react'

function Loading() {
  return (
    <Flex minH="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Box fontSize="xl" fontWeight="bold">
        Obtendo lista de colaboradores...
      </Box>
      <Spinner ml={2} color="purple.800" />
    </Flex>
  )
}

export default Loading
