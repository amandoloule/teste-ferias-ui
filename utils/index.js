import { format, parse, isValid } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const isValidDateBrazilianFormat = (date) => {
  const parsedDate = parse(date, 'dd-MM-yyyy', new Date())
  return isValid(parsedDate)
}

export const convertToGraphQLDate = (date) => {
  const parsedDate = parse(date, 'dd-MM-yyyy', new Date())
  const zonedDate = utcToZonedTime(parsedDate, 'America/Sao_Paulo')
  return format(zonedDate, 'yyyy-MM-dd')
}
