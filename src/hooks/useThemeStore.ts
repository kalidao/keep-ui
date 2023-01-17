import create from 'zustand'
import { getThemeMode } from '~/utils/cookies'
import { Mode } from '@kalidao/reality/dist/types/tokens'

type ThemeStore = {
  mode: Mode
  setMode: (mode: Mode) => void
  toggleMode: () => void
}
export const useThemeStore = create<ThemeStore>((set) => ({
  mode: getThemeMode() || 'light',
  setMode: (mode: Mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
}))
