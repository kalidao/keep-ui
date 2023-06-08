import React from 'react'
import updateAction from './updateAction'
// import { useStateMachine } from 'little-state-machine'

import { DaoStore, useDaoStore } from './tx/useDaoStore'

import { Button, IconLightningBolt, IconMinus, IconPlus } from '@kalidao/reality'

export default function Toggle() {
  // const { actions, state } = useStateMachine({ updateAction })
  const {  hardMode, setHardMode } = useDaoStore();
  // const { hardMode } = state

  return (
    <Button
      size="small"
      suffix={hardMode === false ? <IconPlus /> : <IconMinus />}
      variant="transparent"
      onClick={() =>
        // actions.updateAction({
        //   hardMode: !hardMode,
        // })
        setHardMode(!hardMode)
      }
    >
      {hardMode === false ? 'Easy' : 'Hard'}
    </Button>
  )
}
