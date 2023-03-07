import { useState } from 'react'

import { Avatar, Box, Card, Divider, Heading, Stack, Text } from '@kalidao/reality'
import { bodoni } from 'pages/_app'
import { useEnsName } from 'wagmi'
import { useGetUser } from '~/hooks/useGetUser'
import { truncAddress } from '~/utils'

import { useKeepStore } from './useKeepStore'

const Signers = () => {
  const signers = useKeepStore((state) => state.signers)
  const [initial, setInitial] = useState(5)
  if (!signers) return null
  if (signers.length === 0) return null

  return (
    <Card padding="6" width="full">
      <Stack align="center">
        <Box
          fontSize="headingThree"
          style={{
            ...bodoni.style,
            fontWeight: 500,
            fontStyle: 'italic',
          }}
        >
          Signers
        </Box>
        <Divider />
        <Stack space={'2'}>
          {signers &&
            signers.slice(0, initial).map((signer) => {
              return <Signer key={signer} signer={signer} />
            })}
        </Stack>
        {initial >= signers.length ? null : (
          <Box
            as="button"
            color="textSecondary"
            onClick={() => {
              const left = signers.length - initial
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
      <Avatar
        size="8"
        src={user?.picture?.uri ? user?.picture?.uri : user?.picture?.original?.url}
        label={signer}
        address={signer}
      />
      <Text>{user?.handle != undefined ? user?.handle : ensName ? ensName : truncAddress(signer)}</Text>
    </Stack>
  )
}

export default Signers
