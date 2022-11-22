import { Tag } from '@kalidao/reality'
import { prettyDate } from '~/utils'

const PrettyDate = ({ timestamp }: { timestamp: string }) => {
  return <Tag label="Created">{prettyDate(timestamp)}</Tag>
}

export default PrettyDate
