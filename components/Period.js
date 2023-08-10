import { Box } from '@chakra-ui/react'
import { format, utcToZonedTime } from 'date-fns-tz'

const Period = ({ start_date, end_date }) => {
  const brazilTimeZone = 'America/Sao_Paulo'
  const startDate = utcToZonedTime(new Date(start_date), brazilTimeZone)
  const endDate = utcToZonedTime(new Date(end_date), brazilTimeZone)
  const formattedStartDate = format(startDate, 'dd-MM-yyyy')
  const formattedEndDate = format(endDate, 'dd-MM-yyyy')

  // Calculating total days in the period
  const totalDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1

  return (
    <Box p={3} borderWidth="1px" borderRadius="lg" bg="gray.100" mt={4}>
      <p>
        <b>Data de Início:</b> {formattedStartDate}
      </p>
      <p>
        <b>Data de Término:</b> {formattedEndDate}
      </p>
      <p>
        <b>Total de Dias:</b> {totalDays} dias
      </p>
    </Box>
  )
}

export default Period
