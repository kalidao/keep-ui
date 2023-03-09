import { Button, IconArrowDown, IconArrowUp } from '@kalidao/reality'
import { Tone } from '@kalidao/reality/dist/types/components/Button/styles.css'

import { voteOnComment } from './utils'

export const CommentVote = ({ commentId, type, callback }: { commentId: string; type: boolean; callback: any }) => {
  const Icon = type ? IconArrowUp : IconArrowDown
  const tone = type ? 'green' : 'red'

  const vote = async () => {
    voteOnComment(commentId, type)
      .then(() => {
        callback?.()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <Button variant="secondary" tone={tone as Tone} size="small" shape="circle" onClick={vote}>
      <Icon />
    </Button>
  )
}
