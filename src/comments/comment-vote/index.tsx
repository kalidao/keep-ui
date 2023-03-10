import { useMemo } from 'react'

import { Box, Button, IconArrowDown, IconArrowUp } from '@kalidao/reality'
import { useGetComment } from '~/hooks/useGetComments'

import { voteOnComment } from '../utils'
import * as styles from './styles.css'

export const CommentVote = ({ commentId, callback }: { commentId: string; callback: any }) => {
  const { data: comment } = useGetComment(commentId)
  const vote = async (type: boolean) => {
    voteOnComment(commentId, type)
      .then(() => {
        callback?.()
      })
      .catch((e) => {
        console.error(e)
      })
  }
  const upvote = styles.btn
  const downvote = styles.btn

  const score =
    comment?.votes?.reduce(
      (
        acc: number,
        vote: {
          type: 'yes' | 'no'
        },
      ) => {
        if (vote.type === 'yes') acc += 1
        if (vote.type === 'no') acc -= 1
        return acc
      },
      0,
    ) ?? 0

  return (
    <Box className={styles.root}>
      <Box as="button" onClick={() => vote(true)}>
        <IconArrowUp className={upvote} />
      </Box>
      <Box className={styles.score}>{score}</Box>
      <Box as="button" onClick={() => vote(false)}>
        <IconArrowDown className={downvote} />
      </Box>
    </Box>
  )
}
