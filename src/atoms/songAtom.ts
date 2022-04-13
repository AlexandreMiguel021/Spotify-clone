import { atom } from 'recoil'

export const currentTrackIdAtom = atom<string>({
  key: 'currentTrackIdAtom',
  default: null
})

export const isPlayingAtom = atom<boolean>({
  key: 'isPlayingAtom',
  default: false
})
