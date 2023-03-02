import dayjs from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'

dayjs.extend(relative)

export const prettyDate = (time: string) => {
  return dayjs(time).fromNow()
}

export const prettyDateShort = (time: string) => {
  return dayjs(time).format('MMM D, YYYY')
}

export const timestampToTimepassed = (timestamp: number) => {
  return dayjs.unix(timestamp).fromNow(true)
}
