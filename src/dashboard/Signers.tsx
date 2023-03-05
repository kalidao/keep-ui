import { Avatar, Box, Card, Heading, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { useEnsName } from 'wagmi'
import { useGetUser } from '~/hooks/useGetUser'
import { truncAddress } from '~/utils'
import { fetcher } from '~/utils'

import * as styles from './styles.css'
import { useKeepStore } from './useKeepStore'

const Signers = () => {
  const signers = useKeepStore((state) => state.signers)

  if (!signers) return null
  if (signers.length === 0) return null

  return (
    <Card padding="6" width="full">
      <Box className={styles.signers}>
        <Heading transform="capitalize">Signers</Heading>
        <Stack space={'2'}>
          {signers &&
            signers.map((signer) => {
              return <Signer key={signer} signer={signer} />
            })}
        </Stack>
      </Box>
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
