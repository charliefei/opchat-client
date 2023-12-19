import dayjs from 'dayjs'

export const formatDateTime = (date: Date | number) => 
  dayjs(date).format('YYYY-MM-DD HH:mm:ss')

