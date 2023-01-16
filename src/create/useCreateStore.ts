import create from 'zustand'

export type CreateStore = {
  // general
  view: 'type' | 'identity' | 'signers' | 'nft' | 'confirm'
  setView: (view: 'type' | 'identity' | 'signers' | 'nft' | 'confirm') => void

  loading: 'review' | 'loading' | 'success' | 'error'
  setLoading: (loading: 'review' | 'loading' | 'success' | 'error') => void
  loadingMessage?: string
  setLoadingMessage: (loadingMessage: string) => void

  address: string
  setAddress: (address: string) => void

  // form
  type: number
  setType: (type: number) => void
  name: string
  setName: (name: string) => void
  bio: string
  setBio: (bio: string) => void
  avatar?: string // url of uploaded avatar image
  setAvatar: (avatar: string) => void
  avatarFile?: File // file of uploaded avatar image
  setAvatarFile: (avatarFile: File) => void

  twitter?: string
  setTwitter: (twitter: string) => void
  discord?: string
  setDiscord: (discord: string) => void
  website?: string
  setWebsite: (website: string) => void
  threshold: number
  setThreshold: (threshold: number) => void
  signers: {
    index?: number
    address: string
    ens?: string
  }[]
  setSigners: (signers: { address: string; ens?: string }[]) => void

  // nft
  borderColor: string
  setBorderColor: (bgColor: string) => void
  borderTextColor: string
  setBorderTextColor: (textColor: string) => void
  bgColor: string
  setBgColor: (accentColor: string) => void
  innerTextColor: string
  setInnerTextColor: (textColor: string) => void
}

export const useCreateStore = create<CreateStore>((set) => ({
  // general
  view: 'type',
  setView: (view) => set({ view }),

  loading: 'review',
  setLoading: (loading) => set({ loading }),
  loadingMessage: undefined,
  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),

  address: '',
  setAddress: (address) => set({ address }),

  // form
  type: 0,
  setType: (type) => set({ type }),
  name: '',
  setName: (name) => set({ name }),
  bio: '',
  setBio: (bio) => set({ bio }),
  avatar: 'https://pbs.twimg.com/profile_images/1582658266630606848/QQ8I_mLG_400x400.jpg',

  setAvatar: (avatar) => set({ avatar }),
  avatarFile: undefined,
  setAvatarFile: (avatarFile) => set({ avatarFile }),
  twitter: '',
  setTwitter: (twitter) => set({ twitter }),
  discord: '',
  setDiscord: (discord) => set({ discord }),
  website: '',
  setWebsite: (website) => set({ website }),
  threshold: 1,
  setThreshold: (threshold) => set({ threshold }),
  signers: [],
  setSigners: (signers) => set({ signers }),

  // nft
  borderColor: '#000000',
  setBorderColor: (borderColor) => set({ borderColor }),
  borderTextColor: '#ffffff',
  setBorderTextColor: (borderTextColor) => set({ borderTextColor }),
  bgColor: '#ffffff',
  setBgColor: (bgColor) => set({ bgColor }),
  innerTextColor: '#000000',
  setInnerTextColor: (innerTextColor) => set({ innerTextColor }),
}))
