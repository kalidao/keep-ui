import { Tag } from '@kalidao/reality'
import { prettyDate } from '~/utils'

const PrettyDate = ({ timestamp }: { timestamp: string }) => {
  return (
    <Tag label="Created" size="medium">
      {prettyDate(timestamp)}
    </Tag>
  )
}

export default PrettyDate
