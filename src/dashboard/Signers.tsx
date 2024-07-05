import { useState } from 'react'

import { Avatar, Box, Card, Divider, Spinner, Stack, Tag, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { useGetKeep } from '~/hooks/useGetKeep'
import { useGetUser } from '~/hooks/useGetUser'
import { truncAddress } from '~/utils'

import { useGetParams } from './hooks/useGetParams'

const Signers = () => {
  const { chainId, keep } = useGetParams()
  const { data, isLoading, isError } = useGetKeep(
    chainId ? parseInt(chainId.toString()) : 1,
    keep?.toString() as `0x${string}`,
  )

  const [initial, setInitial] = useState(5)
  if (!data?.signers) return null
  if (data?.signers?.length === 0) return null
  let state = null
  if (isLoading) return <Spinner />
  if (isError) return <Text>Something went wrong</Text>

  console.log('signers', data?.signers, data?.signers?.length, initial)

  const signers = (
    <>
      <Stack space={'2'}>
        {data?.signers &&
          data?.signers.slice(0, initial).map((signer: string) => {
            return <Signer key={signer} signer={signer} />
          })}
      </Stack>
      {initial >= data?.signers?.length ? null : (
        <Box
          as="button"
          color="textSecondary"
          onClick={() => {
            const left = data?.signers?.length - initial
            if (left > 5) {
              setInitial(initial + 5)
            } else {
              setInitial(initial + left)
            }
          }}
        >
          Show more
        </Box>
      )}
    </>
  )

  if (data) state = signers

  return (
    <Card padding="6" width="full">
      <Stack align="flex-start">
        <Box display="flex" width="full" flexDirection={'row'} alignItems="center" justifyContent={'space-between'}>
          <Box fontSize="headingThree" fontWeight={'semiBold'}>
            Signers
          </Box>
          {data?.threshold ? (
            <Tag>
              {data?.threshold}/{data?.signers?.length}
            </Tag>
          ) : null}
        </Box>
        <Divider />
        {state}
      </Stack>
    </Card>
  )
}

export const Signer = ({ signer }: { signer: string }) => {
  const { data: ensName } = useEnsName({
    address: signer as `0x${string}`,
    chainId: 1,
  })
  const { data: user } = useGetUser(signer)

  return (
    <Stack direction="horizontal" align="center">
      <Avatar size="8" src={user?.avatar} label={signer} address={signer} />
      <Text>{user?.handle != undefined ? user?.handle : ensName ? ensName : truncAddress(signer)}</Text>
    </Stack>
  )
}

export default Signers
