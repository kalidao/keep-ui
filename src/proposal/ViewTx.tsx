import { Stack, Heading, Text, Button, Card } from '@kalidao/reality'
import { useSignMessage } from 'wagmi'

const ViewTx = ({ tx }: { tx: any }) => {
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage({
    message: tx?.txHash,
  })
  const sign = async () => {
    const sign = await signMessageAsync()
    console.log('sign', sign)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEEP_API}/transactions/${tx?.keepChainId}/${tx?.keepAddress}/${tx?.txHash}/sign`,
      {
        method: 'POST',
        body: JSON.stringify({
          sign: sign,
        }),
      },
    )
    const data = await res.json()
    console.log('post', data.body)
  }

  console.log('tx', tx)
  return (
    <Stack>
      <Card padding="10">
        <Text>Type: {tx?.op}</Text>
        <Text>Nonce: {tx?.nonce}</Text>
        <Text>To: {tx?.to}</Text>
        <Text>Value: {tx?.value}</Text>
        <Text wordBreak="break-word">Data: {tx?.data}</Text>
      </Card>
    </Stack>
  )
}

export default ViewTx
