import { useState } from 'react'

import { useRouter } from 'next/router'

import { useDynamicContext } from '@dynamic-labs/sdk-react'
import { Dialog } from '@headlessui/react'
import { Button, Heading, Box, IconClose, IconEth, IconPlus, Input, Stack, Text, vars } from '@kalidao/reality'
import { BigNumber, ethers } from 'ethers'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@design/Select'

import { usePrepareSendTransaction, useSendTransaction, erc20ABI, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useKeepStore } from '~/dashboard/useKeepStore'
import toast from '@design/Toast'
import { dialog, dialogPanel, dialogBox } from '@design/dialog.css'
import { useAccountBalance } from 'ankr-react'
import { getBlockchainByChainId } from '~/utils/ankr'


const GiveMoney = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('0')
  const [token, setToken] = useState<string>()
  const keep = useKeepStore((state) => state)
  const { user } = useDynamicContext()
  const { data: userBalance, error: userBalanceError, isLoading: isLoadingUserBalance } = useAccountBalance({
    blockchain: keep.chainId ? getBlockchainByChainId(keep.chainId) : 'polygon',
    walletAddress: user?.walletPublicKey ? user.walletPublicKey : ethers.constants.AddressZero,
    onlyWhitelisted: true,
  })
  const { config, error } = usePrepareSendTransaction({
    request: {
      to: keep.address ? keep.address : ethers.constants.AddressZero,
      value: amount ? ethers.utils.parseEther(amount) : BigNumber.from(0),
    },
    chainId: keep.chainId,
    enabled: !!keep.address,
  })
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    ...config,
    onSuccess: () => {
      toast('success', 'Transaction sent')
      setIsOpen(false)
    },
    onError: () => {
      toast('error', 'Transaction failed')
    }
  })
  const selectedToken = token && userBalance && userBalance?.assets?.find((asset) => token == asset.tokenName)
  const { config: config2, error: error2 } = usePrepareContractWrite({
    address: selectedToken ? selectedToken.contractAddress as `0xstring` : ethers.constants.AddressZero,
    abi: erc20ABI,
    functionName: 'transfer',
    chainId: keep.chainId,
    args: [keep.address as `0xstring`, amount ? ethers.utils.parseUnits(amount, selectedToken ? selectedToken?.tokenDecimals : 18) : BigNumber.from(0)],
  })
  const { writeAsync } = useContractWrite({
    ...config2,
    onSuccess: () => {
      toast('success', 'Transaction sent')
      setIsOpen(false)
    },
    onError: (e) => {
      toast('error', `${e.name}`)
      setIsOpen(false)
    }
  })

  console.log('userBalance', userBalance?.assets)
  


  return (
    <>
      <button style={{
        all: 'unset',
        color: vars.colors.green,
        paddingLeft: vars.space[2],
        paddingRight: vars.space[4],
        paddingTop: vars.space[1],
        paddingBottom: vars.space[1],
      }} onClick={() => setIsOpen(true)}>
        Fund
        +
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={dialog} >
        <Dialog.Panel className={dialogPanel}>
          <Box className={dialogBox}>
          <Dialog.Title>
            <Heading>Gift</Heading>
          </Dialog.Title>
          <Dialog.Description>
            <Stack direction={'vertical'} align="flex-start" justify="center">
            <Text>Send money to this keep</Text>
            {isLoadingUserBalance && <Text>Loading your balance...</Text>}
            {userBalance ?  <Select
              
                onValueChange={(value) => {
                  setToken(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {userBalance?.assets?.map((token) => {
                      return (
                        <SelectItem key={token.contractAddress} value={token.tokenName}>
                          {token.tokenSymbol}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select> : <Text>Not enough balance</Text>}
            <Input
              label="Amount"
              min={0}
              type="number"
              labelSecondary={selectedToken ? selectedToken?.tokenSymbol : ''}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
            />
            </Stack>
          </Dialog.Description>
          <Stack direction={'horizontal'} align="center" justify="center">
            <Button width="full" tone="green" disabled={!sendTransaction} onClick={async () => {
              if (!token) {
                toast('error', 'No token selected')
                return
              }
              if (!amount) {
                toast('error', 'No amount selected')
                return
              }
              if (Number(amount) <= 0) {
                toast('error', 'Amount must be greater than 0')
                return
              }
              if (userBalanceError) {
                toast('error', 'Error loading your balance')
                return
              }
              if (!keep.address) {
                toast('error', 'No keep address')
                return
              }
              if (token === 'Polygon') {
                await sendTransaction?.()
              } else {
                await writeAsync?.()
              }
            }}>
              Send
            </Button>
            <Button width="full" variant="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Stack>
          </Box>
        </Dialog.Panel>
      </Dialog>
     </>
  )
}

export default GiveMoney
