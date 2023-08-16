import {
  Box,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
} from '@chakra-ui/react'
import { format, utcToZonedTime } from 'date-fns-tz'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import UPDATE_PERIOD from '../lib/apollo/queries/updatePeriod'

const Period = ({ start_date, end_date, periodId, numPeriods }) => {
  const brazilTimeZone = 'America/Sao_Paulo'
  const startDate = utcToZonedTime(new Date(start_date), brazilTimeZone)
  const endDate = utcToZonedTime(new Date(end_date), brazilTimeZone)
  const formattedStartDate = format(startDate, 'dd-MM-yyyy')
  const formattedEndDate = format(endDate, 'dd-MM-yyyy')

  const [periods, setPeriods] = useState(numPeriods)
  const [fractureValue, setFractureValue] = useState(numPeriods)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [changePeriod] = useMutation(UPDATE_PERIOD, {
    onCompleted(data) {
      const changePeriodData = data?.updatePeriod?.data
      if (changePeriodData) {
        setPeriods(fractureValue)
      } else {
        setError('Erro ao atualizar período de férias')
      }
    },
    onError(error) {
      setError(error.message)
    },
  })

  const handleFractureChange = (event) => {
    setFractureValue(event.target.value)
  }

  const handleFracture = () => {
    if (periods === 1 && fractureValue > 1) {
      setIsDialogOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirmFracture = async () => {
    await changePeriod({
      variables: {
        periodId: periodId,
        numPeriods: parseInt(fractureValue),
      },
    })
    setIsDialogOpen(false)
  }

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
      <Select
        value={fractureValue}
        onChange={handleFractureChange}
        mt={4}
        disabled={periods > 1}
      >
        <option value={1}>Não Fracionar</option>
        <option value={2} disabled={totalDays <= 14}>
          Fracionar em 2 períodos
        </option>
        <option value={3} disabled={totalDays <= 19}>
          Fracionar em 3 períodos
        </option>
      </Select>
      <Button
        colorScheme="teal"
        mt={2}
        onClick={handleFracture}
        isDisabled={periods > 1}
      >
        Fracionar
      </Button>

      <AlertDialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Fracionamento
            </AlertDialogHeader>

            <AlertDialogBody>
              Você está prestes a fracionar as férias em {fractureValue}{' '}
              períodos. Essa ação é irreversível. Tem certeza de que deseja
              continuar?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button colorScheme="red" onClick={handleConfirmFracture} ml={3}>
                Fracionar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default Period
