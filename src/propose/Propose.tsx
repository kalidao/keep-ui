import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Divider } from '@kalidao/reality'
import { FormProvider, useForm } from 'react-hook-form'
import { useMediaQuery } from 'react-responsive'
import { z } from 'zod'
import { useKeepStore } from '~/dashboard/useKeepStore'

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

import { ProposeForm } from './ProposeForm'
import { SendProposal } from './SendProposal'
import { proposeButton } from './styles.css'
import { useSendStore } from './tx/useSendStore'
import { baseSchema, schemas } from './types'

export const Propose = () => {
  const open = useSendStore((state) => state.open)
  const setOpen = useSendStore((state) => state.setOpen)
  const action = useSendStore((state) => state.action)
  const keep = useKeepStore((state) => state)

  const xs = useMediaQuery({ query: '(min-width: 0px)' })
  const md = useMediaQuery({ query: '(min-width: 768px)' })
  const lg = useMediaQuery({ query: '(min-width: 1024px)' })

  let schema: any = baseSchema
  if (action) {
    if (action != 'none') {
      if (action in schemas) {
        schema = baseSchema.merge(schemas[action])
      }
    }
  }

  type Schema = z.infer<typeof schema>
  const methods = useForm<Schema>({
    mode: 'onChange',
    resolver: async (data, context, options) => {
      console.log('zod formData', data)
      console.log('zod validation result', await zodResolver(schema)(data, context, options))
      return zodResolver(schema)(data, context, options)
    },
    defaultValues: {
      action: 'none',
      signers: keep.signers.map((signer) => {
        return {
          address: signer,
          resolves: undefined,
        }
      }),
      threshold: keep.threshold,
      transfers: [
        {
          amount: '',
          to: '',
          token_address: '',
        },
      ],
    },
  })

  let isPropose
  if (keep.chainId && keep.address) {
    isPropose = true
  } else {
    isPropose = false
  }

  let position: DialogContentProps['position'] = 'right'
  let size: DialogContentProps['size'] = 'xl'
  if (xs) {
    position = 'bottom'
    size = 'xl'
  }
  if (md) {
    position = 'right'
    size = 'xl'
  }
  if (lg) {
    position = 'right'
    size = 'lg'
  }

  if (isPropose) {
    return (
      <Sheet open={open}>
        <SheetTrigger onClick={() => setOpen(true)}>
          <Box as="span" className={proposeButton}>
            Propose
          </Box>
        </SheetTrigger>
        <FormProvider {...methods}>
          <form>
            <SheetContent onClose={() => setOpen(false)} position={position} size={size}>
              <SheetHeader>
                <SheetTitle>🥂 Propose</SheetTitle>
                <SheetDescription>Create a signal or tx request for your community wallet to sign.</SheetDescription>
                <Divider />
              </SheetHeader>
              <ProposeForm />
              <SheetFooter>
                <SendProposal />
              </SheetFooter>
            </SheetContent>
          </form>
        </FormProvider>
      </Sheet>
    )
  }

  return null
}
