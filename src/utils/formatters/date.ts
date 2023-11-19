import dayjs from 'dayjs'

export const date = (date?: string | Date | null, formatString = 'DD/MM/YYYY') => {
  if (date) {
    return dayjs(date).format(formatString)
  }
  return date
}
