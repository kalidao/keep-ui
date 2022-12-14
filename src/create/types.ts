import React from 'react'

export type Store = {
  // 0 for multisig, 1 for multisig + dao
  type: number
  name: string
  bio: string
  avatar?: File
  twitter?: string
  discord?: string
  website?: string
  threshold: number
  signers: {
    address: string
  }[]
}

export type CreateProps = {
  setView: React.Dispatch<React.SetStateAction<number>>
  store: Store
  setStore: React.Dispatch<React.SetStateAction<Store>>
}
