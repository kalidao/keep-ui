import { useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Box, Button, Heading, IconPencil, Text } from '@kalidao/reality'

import { Progress } from '@design/Progress/index'
import { dialog, dialogBox, dialogPanel } from '@design/dialog.css'
import {
  DialogContentProps,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@design/Sheet'

import Crowdsale from './Crowdsale'
import Governance from './Governance'
import Identity from './Identity'
import Legal from './Legal'
import Members from './Members'
import Redemption from './Redemption'
import Toggle from './Toggle'
import Checkout from './checkout'
import * as styles from './styles.css'
// import { StateMachineProvider, createStore } from 'little-state-machine'
import { DaoStore, useDaoStore } from './tx/useDaoStore'

// TODO:
// Allow interaction with outside from within the modal
export default function DeployDaoWrapper() {
  const { open, setOpen } = useDaoStore()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  const steps = [
    {
      component: <Identity setStep={setStep} />,
      title: 'Summon',
      description: `You are about to summon a KaliDAO, an on-chain organization 
      with a native token and voting mechanism. To get 
      started, pick a name and symbol for your DAO and Token.`,
    },
    {
      component: <Governance setStep={setStep} />,
      title: 'Voting',
      description: `Update voting parameters according to your workflow. If 
      decision-making is generally consistent and frequent, we recommend shorter 
      voting period and lower participation requirements.`,
    },
    {
      component: <Redemption setStep={setStep} />,
      title: 'Extension: Redemption',
      description: `This extension gives everyone the ability
      to redeem KaliDAO treasury by burning her KaliDAO tokens.`,
    },
    {
      component: <Crowdsale setStep={setStep} />,
      title: 'Extension: Swap',
      description: `This extension gives KaliDAO the ability to swap KaliDAO tokens 
      for Eth or ERC20s.`,
    },
    {
      component: <Members setStep={setStep} />,
      title: 'Founding Members',
      description: `If a new founding member is added, we must specify a KaliDAO token
      amount.`,
    },
    {
      component: <Legal setStep={setStep} />,
      title: 'Type of entity',
      description: `Pick an entity for this KaliDAO. Read and understand entity formation 
      documents before making a selection. Review resources below to better identify the 
      entity structure this KaliDAO needs.
      `,
    },
    {
      component: <Checkout setStep={setStep} />,
      title: 'Checkout',
      description: `Updates to the DAO require proposals, i.e., 
      minting tokens, amending quorum etc.`,
    },
  ]

  return (
    <>
      <Button size="small" shape="circle" variant="transparent" onClick={() => setOpen(true)}>
        <IconPencil />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} className={dialog}>
        <Dialog.Panel className={dialogPanel}>
          <Box className={styles.container}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Heading>{steps[step]['title']}</Heading>
              {/* <Toggle /> */}
            </Box>
            <Text color="text">{steps[step]['description']}</Text>
            <Progress value={(step / (steps.length - 1)) * 100} />
            <Box width="full" style={{ overflowY: 'scroll', flexGrow: '1' }}>
              {steps[step]['component']}
            </Box>
          </Box>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
