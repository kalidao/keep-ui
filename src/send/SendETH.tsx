import { Button, Stack } from '@kalidao/reality'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContractRead, useContractWrite, useNetwork, useSignTypedData } from 'wagmi'
import { getKeepContractConfig } from '~/hooks'

const TEST = '0x9D37f810a7E7fa723Bb76A1138ef8C08d161f5F7'

// All properties on a domain are optional
const domain = {
  name: 'Keep',
  version: '1',
  chainId: '5',
  verifyingContract: '0x9D37f810a7E7fa723Bb76A1138ef8C08d161f5F7',
} as const

const SendETH = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  // @ts-ignore
  const { refetch: getNonce } = useContractRead({
    ...getKeepContractConfig(TEST, 5),
    functionName: 'nonces',
    args: [address ? address : ethers.constants.AddressZero],
    enabled: false,
  })

  //('Execute(Operation op,address to,uint256 value,bytes data,uint256 nonce)')
  const { signTypedDataAsync } = useSignTypedData()
  const {} = useSignTypedData({
    domain,
    types: {
      Execute: [
        { name: 'op', type: 'uint8' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'nonce', type: 'uint256' },
      ],
    },
    value: {
      op: 0,
      to: '0x743Fc173fee5D44484efBE14b0c396149054c311',
      value: BigNumber.from(0),
      data: ethers.constants.HashZero,
      nonce: BigNumber.from(0),
    },
  })
  // @ts-ignore
  const { writeAsync } = useContractWrite({
    ...getKeepContractConfig(TEST, 5),
    mode: 'recklesslyUnprepared',
    functionName: 'execute',
  })

  const handleSign = async () => {
    if (!address) {
      console.error('No account connected.')
      return
    }
    if (!chain) {
      console.error('no active chain')
      return
    }
    const { data: nonce } = await getNonce()

    let signature
    try {
      const data = await signTypedDataAsync({
        domain: {
          name: 'Keep',
          version: '1',
          chainId: chain.id,
          verifyingContract: TEST,
        },
        // Execute(uint8 op,address to,uint256 value,bytes data,uint256 nonce)
        types: {
          Execute: [
            { name: 'op', type: 'uint8' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'data', type: 'bytes' },
            { name: 'nonce', type: 'uint256' },
          ],
        },
        value: {
          op: 0,
          to: address,
          value: BigNumber.from(0),
          data: ethers.constants.HashZero,
          nonce: BigNumber.from(nonce),
        },
      })
      signature = ethers.utils.splitSignature(data)

      const res = await writeAsync?.({
        recklesslySetUnpreparedArgs: [
          0,
          address,
          ethers.BigNumber.from(0),
          ethers.constants.HashZero,
          [
            {
              user: address,
              v: signature.v,
              r: signature.r as `0x${string}`,
              s: signature.s as `0x${string}`,
            },
          ],
        ],
      })
    } catch (e: unknown) {
      console.error(e)
    }
  }

  return (
    <Stack>
      <Button onClick={() => handleSign()}>Sign eip-712</Button>
    </Stack>
  )
}

export default SendETH
