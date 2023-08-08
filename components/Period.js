import { Box } from "@chakra-ui/react"

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

export default Period
