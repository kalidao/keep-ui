import React from 'react'

import { Button, IconLightningBolt, IconSparkles } from '@kalidao/reality'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@design/Dialog'

export default function Send() {
  const [open, setOpen] = React.useState(false)
  const send = () => {
    setOpen(false)
  }
  const signSend = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open}>
      <DialogTrigger>Submit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>💸 Review and Submit</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={send}>
            Send
          </Button>
          <Button suffix={<IconLightningBolt />} onClick={signSend}>
            Sign and Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
