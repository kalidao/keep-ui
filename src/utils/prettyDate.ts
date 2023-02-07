import dayjs from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'

dayjs.extend(relative)

export const prettyDate = (time: string) => {
  console.log('day', time)
  return dayjs(time).fromNow()
}

export const timestampToTimepassed = (timestamp: number) => {
  return dayjs.unix(timestamp).fromNow(true)
}
