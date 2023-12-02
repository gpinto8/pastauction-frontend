export const getDifferenceDate = (start_date: Date, end_date: Date) => {
  const date1 = new Date(start_date) as any
  const date2 = new Date(end_date) as any
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
