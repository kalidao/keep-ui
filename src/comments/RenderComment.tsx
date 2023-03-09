import { useState } from 'react'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Box, Button, Card, IconPencil, IconTrash, Stack } from '@kalidao/reality'
import { EditComment } from '~/comments/EditComment'
import { useGetComment } from '~/hooks/useGetComments'
import { prettyDate } from '~/utils'

import { JSONContentRenderer } from '~/components/Editor/JSONContent'
import { User } from '~/components/User'

import { Flip } from '@design/Flip'
import { IconChat } from '@design/IconChat'

import { CommentVote } from './CommentVote'
import { CreateComment } from './CreateComment'
import { CommentHome } from './types'
import { deleteComment } from './utils'

export const RenderComment = ({ home, comment, callback }: { home: CommentHome; comment: any; callback: any }) => {
  const { data, isLoading, isError } = useGetComment(comment.id)
  const [reply, setReply] = useState(false)
  const [showChildren, setShowChildren] = useState<any>(false)
  const [edit, setEdit] = useState(false)
  const { user } = useDynamicContext()

  let children = null
  let replies = 0
  if (comment.parentId) {
    children = data?.children?.map((child: any) => (
      <RenderComment key={child.id} home={home} comment={child} callback={callback} />
    ))
    replies = data?.children?.length
  } else {
    children = comment?.children?.map((child: any) => (
      <RenderComment key={child.id} home={home} comment={child} callback={callback} />
    ))
    replies = comment?.children?.length
  }

  let isUserComment = comment?.userId?.toLowerCase() === user?.blockchainAccounts?.[0]?.address?.toLowerCase()

  return (
    <Card padding="3">
      <Stack>
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <User address={comment.userId} size="lg" />
          {isUserComment ? (
            <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
              <Button shape="circle" variant="transparent" size="small" onClick={() => setEdit(!edit)}>
                <IconPencil />
              </Button>
              <Button
                shape="circle"
                variant="secondary"
                size="small"
                onClick={() => {
                  deleteComment(comment.id).then(() => {
                    callback?.()
                  })
                }}
              >
                <IconTrash />
              </Button>
            </Stack>
          ) : null}
        </Stack>
        {edit ? (
          <EditComment
            comment={comment}
            callback={() => {
              callback?.().then(() => {
                setEdit(false)
              })
            }}
          />
        ) : (
          <JSONContentRenderer content={comment.content} />
        )}
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
            <CommentVote commentId={comment.id} callback={callback} type={true} />
            <CommentVote commentId={comment.id} callback={callback} type={false} />
            <Button size="small" variant="secondary" onClick={() => setReply(!reply)} prefix={<IconChat />}>
              Reply
            </Button>
            <Flip
              from={`🕓 updated ${prettyDate(comment.updatedAt)}`}
              to={`🕓 created ${prettyDate(comment.createdAt)}`}
            />
          </Stack>
          {replies > 0 ? (
            <Box color="textSecondary" as="button" onClick={() => setShowChildren(!showChildren)}>
              {showChildren
                ? `Hide ${replies} ${replies > 1 ? 'replies' : 'reply'}`
                : `Show ${replies} more ${replies > 1 ? 'replies' : 'reply'}`}
            </Box>
          ) : null}
        </Stack>
        {reply && (
          <CreateComment
            home={home}
            txId={comment.transactionId ?? undefined}
            signalId={comment.signalId ?? undefined}
            parentId={comment.id ?? undefined}
            refetch={() => {
              callback?.()
              setReply(false)
            }}
          />
        )}
        {showChildren && children}
      </Stack>
    </Card>
  )
}
