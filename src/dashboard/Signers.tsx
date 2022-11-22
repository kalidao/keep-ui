import { Avatar, Card, Heading, Stack, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils'

const Signers = ({ signers }: { signers: any[] }) => {
  // const signers = ['shivanshi.eth', 'ross.eth', 'audsssy.eth', 'jordanteague.eth']
  return (
    <Card padding="6">
      <Stack space="4" align={'flex-start'}>
        <Heading transform="capitalize">Signers</Heading>
        <Stack space={'2'}>
          {signers &&
            signers.map((signer) => {
              return <Signer key={signer} signer={signer} />
            })}
        </Stack>
      </Stack>
    </Card>
  )
}

const Signer = ({ signer }: { signer: string }) => {
  const { data: ensName } = useEnsName({
    address: signer as `0x${string}`,
    chainId: 1,
  })
  const { data: user, error } = useQuery(['signerDashProfile', signer], () =>
    fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/users/${signer}`),
  )
  console.log('user', user?.picture?.original?.url, error)

  return (
    <Stack direction="horizontal" align="center">
      <Avatar src={user?.picture?.original?.url} label={signer} address={signer} />
      <Text>{user?.handle != undefined ? user?.handle : ensName ? ensName : truncAddress(signer)}</Text>
    </Stack>
  )
}

export default Signers
