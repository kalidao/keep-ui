import { useCallback, useState } from 'react'

// import { addresses } from '@constants/addresses'
// import FACTORY_ABI from '@abi/KaliDAOfactory.json'
// ! import REDEMPTION_ABI from '@abi/KaliDAOredemption.json'
// ! import SALE_ABI from '@abi/KaliDAOcrowdsale.json'
// import { templates, handleEmail } from '@utils/handleEmail'
import { useRouter } from 'next/router'

// import validateDocs from './validateDocs'
// import { votingPeriodToSeconds } from '@utils/index'
// import { getRedemptionTokens } from '@utils/getRedemptionTokens'
// import { validateFounders } from './validateFounders'
import toast from '@design/Toast'
import { Box, Button, Stack, Text } from '@kalidao/reality'
// import { AddressZero } from '@ethersproject/constants'
import { useNonce } from '~/hooks/useNonce'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { JSONContent } from '@tiptap/core'
import { KALI_FACTORY_ADDRESS} from '~/constants'

import { useKeepStore } from '~/dashboard/useKeepStore'
import * as styles from '../styles.css'
import { DaoStore, useDaoStore } from '../tx/useDaoStore'
import { getTxHash } from '~/propose/getTxHash'
import { toOpString } from '~/utils/toOp'
import { sendTx } from '~/propose/tx/sendTx'
import {createDaoPayload} from '../tx/createDao'

import Confirmation from './Confirmation'

// import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}


export default function Checkout({ setStep }: Props) {
  const keep = useKeepStore((state) => state)
  const { identity, governance, redemption, crowdsale, founders, legalData, hardMode, reset } = useDaoStore()
  const { data: nonce } = useNonce(keep.chainId ?? 1, keep.address ? keep.address : '0x')
  const router = useRouter()
  // const { state } = useStateMachine()
  // const { hardMode } = state
  const { isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()
  
  const handleTx = async (
    chainId: number,
    address: string,
    title: string,
    content: JSONContent,
    op: number,
    to: string,
    value: string,
    data: string,
  ) => {
    const digest = await getTxHash(chainId, address, op, to, value, data, nonce.toString())
  
    if (digest === 'error') {
      toast('error', 'Error creating transaction')
      return
    }
  
    const send = await sendTx(
      chainId,
      address,
      {
        op: toOpString(op),
        to: to,
        value: value,
        data: data,
        txHash: digest,
        title: title,
        content: content,
      },
      router,
    ).then(() => {
      reset()
    })
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  // remove ricardian as default
  // const deployKaliDao = useCallback(async () => {
  //   setLoading(true)
  //   setMessage('Preparing transaction...')
  //   if (!isConnected || !activeChain) return


  //   try {
  //     setMessage(`Please confirm in your wallet.`)
      

  //     const payload = createDaoPayload(keep.address, identity.name, identity.symbol)
  //     await handleTx(keep.chainId, keep.address, "", "", 0, KALI_FACTORY_ADDRESS, '0', payload)

  //     // const i

  //     // console.log('relayed', relayTx)
  //   } catch (e) {
  //     console.log(e)
  //     setLoading(false)
  //     setMessage('Transaction failed.')
  //   }
  // }, [isConnected, activeChain, keep, router])
  const deployKaliDao = async () => {
    if (!keep.address || !keep.chainId) {
      toast('error', 'No keep selected')
      return
    }

    if (!keep.threshold) {
      toast('error', 'No threshold set')
      return
    }
    const payload = createDaoPayload(keep.address, identity.name, identity.symbol)
    await handleTx(keep.chainId, keep.address, "", {}, 0, KALI_FACTORY_ADDRESS, '0', payload)
  }
  const prev = () => {
    // if (!hardMode) {
    //   setStep(4)
    // } else {
    //   setStep(5)
    // }
    setStep(0)
  }
  // console.log(error?.message)
  return (
    <>
      <Box className={styles.form}>
        <Box className={styles.formHeader}>
          {/* <Stack align="center" direction="horizontal" space="3"></Stack> */}
        </Box>
        <Box className={styles.formContent}>
          {/* {isError && <Text>{error?.message}</Text>} */}
          <Confirmation />
          <Text>{message}</Text>
          {/* {!isConnected ? (
        <ConnectButton label="Login" />
      ) : (
        
      )} */}
        </Box>
        <Box className={styles.formFooter}>
          <Button variant="transparent" onClick={prev}>
            Previous
          </Button>
          <Button
            variant="primary"
            width="full"
            onClick={deployKaliDao}
            loading={loading}
            // disabled={isWritePending || isWriteSuccess || loading}
          >
            {/* {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>} */}
            Deploy
          </Button>
        </Box>
      </Box>
    </>
  )
}
