import { useState } from 'react'
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useSignMessage,
  useSignTypedData,
  useNetwork,
} from 'wagmi'
import { Button, Heading, Input, Stack, Text } from '@kalidao/reality'
import { ethers, BigNumber, Signature } from 'ethers'
import { getKeepContractConfig } from '~/hooks'

const KEEP = require('~/constants/abis/Keep.json')
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
  const { refetch: getNonce } = useContractRead({
    ...getKeepContractConfig(TEST, 5),
    functionName: 'nonces',
    args: [address ? address : ethers.constants.AddressZero],
    enabled: false,
  })
  const [signature, setSignature] = useState<Signature>()

  //('Execute(Operation op,address to,uint256 value,bytes data,uint256 nonce)')
  const { signTypedDataAsync } = useSignTypedData()
  const { data, error, isError, isLoading, isSuccess, signTypedData } = useSignTypedData({
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
  const { writeAsync } = useContractWrite({
    ...getKeepContractConfig(TEST, 5),
    mode: 'recklesslyUnprepared',
    functionName: 'execute',
  })
  // console.log('prepareError', prepareError)

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
      console.log('signature', { signature })

      //     Operation op,
      // address to,
      // uint256 value,
      // bytes calldata data,
      // Signature[] calldata sigs
      console.log('Params', [
        0,
        address,
        0,
        ethers.utils.formatBytes32String('0x'),
        [
          {
            user: address,
            v: signature.v,
            r: signature.r,
            s: signature.s,
          },
        ],
      ])
      const res = await writeAsync?.({
        recklesslySetUnpreparedArgs: [
          0,
          address,
          0,
          ethers.constants.HashZero,
          [
            {
              user: address,
              v: signature.v,
              r: signature.r,
              s: signature.s,
            },
          ],
        ],
        recklesslySetUnpreparedOverrides: {
          gasLimit: 3000000,
        },
      })

      console.log('res', res)
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
