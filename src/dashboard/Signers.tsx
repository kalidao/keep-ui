import { Avatar, Box, Card, Heading, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'
import { fetcher } from '~/utils'

import * as styles from './styles.css'

const Signers = ({ signers }: { signers: any[] }) => {
  // const signers = ['shivanshi.eth', 'z0r0z.eth', 'audsssy.eth', 'jordanteague.eth']
  return (
    <Card padding="6" width="1/4">
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
  const { data: user, error } = useQuery(['signerDashProfile', signer], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${signer}`),
  )

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
