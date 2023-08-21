/*
 * Componente Error
 */

import { Flex, Text } from '@chakra-ui/react'

function Error(props) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={20}
    >
      <Text color="red.500" fontWeight="bold">
        Ocorreu um erro ao carregar os colaboradores. Por favor, recarregue a
        página ou tente novamente mais tarde.
        {props.errorMessage && <p>{props.errorMessage}</p>}
      </Text>
    </Flex>
  )
}

export default Error
