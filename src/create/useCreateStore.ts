import create from 'zustand'
import { vars } from '@kalidao/reality'

type CreateStore = {
  type: number
  setType: (type: number) => void
  name: string
  setName: (name: string) => void
  bio: string
  setBio: (bio: string) => void
  avatar?: string // url of uploaded avatar image
  setAvatar: (avatar: string) => void
  twitter?: string
  setTwitter: (twitter: string) => void
  discord?: string
  setDiscord: (discord: string) => void
  website?: string
  setWebsite: (website: string) => void
  threshold: number
  setThreshold: (threshold: number) => void
  signers: {
    address: string
  }[]
  setSigners: (signers: { address: string }[]) => void

  // nft
  bgColor: string
  setBgColor: (bgColor: string) => void
  textColor: string
  setTextColor: (textColor: string) => void
  accentColor: string
  setAccentColor: (accentColor: string) => void
}

export const useCreateStore = create<CreateStore>((set) => ({
  type: 0,
  setType: (type) => set({ type }),
  name: '',
  setName: (name) => set({ name }),
  bio: '',
  setBio: (bio) => set({ bio }),
  avatar: 'https://pbs.twimg.com/profile_images/1582658266630606848/QQ8I_mLG_400x400.jpg',
  setAvatar: (avatar) => set({ avatar }),
  twitter: '',
  setTwitter: (twitter) => set({ twitter }),
  discord: '',
  setDiscord: (discord) => set({ discord }),
  website: '',
  setWebsite: (website) => set({ website }),
  threshold: 0,
  setThreshold: (threshold) => set({ threshold }),
  signers: [],
  setSigners: (signers) => set({ signers }),

  // nft
  bgColor: '#000000',
  setBgColor: (bgColor) => set({ bgColor }),
  textColor: '#ffffff',
  setTextColor: (textColor) => set({ textColor }),
  accentColor: vars.colors.indigo, // kali purple
  setAccentColor: (accentColor) => set({ accentColor }),
}))
