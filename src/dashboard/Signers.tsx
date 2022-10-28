import { Avatar, Card, Heading, Stack, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import { truncAddress } from '~/utils'

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

  console.log('ensName', ensName)

  return (
    <Stack direction="horizontal" align="center">
      <Avatar src="" placeholder label={signer} address={signer} />
      <Text>{ensName ? ensName : truncAddress(signer)}</Text>
    </Stack>
  )
}

export default Signers
