import { Box } from '@kalidao/reality'
import { useState } from 'react'
import { container } from './create.css'
import { Type } from './Type'
import { Name } from './Name'
import { Signers } from './Signers'
import { Confirm } from './Confirm'

import type { Store } from './types'

const Create = () => {
  const [store, setStore] = useState<Store>({
    type: 0,
    name: '',
    bio: '',
    signers: [
      {
        address: '',
      },
    ],
    threshold: 1,
  })
  const [view, setView] = useState<number>(0)

  const views = [
    <Type key="type" store={store} setStore={setStore} setView={setView} />,
    <Name key="name" store={store} setStore={setStore} setView={setView} />,
    <Signers key="signers" store={store} setStore={setStore} setView={setView} />,
    <Confirm key="confirm" store={store} setStore={setStore} setView={setView} />,
  ]

  return <Box className={container}>{views[view]}</Box>
}

export default Create
