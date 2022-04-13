import { atom } from 'recoil'
import { PlaylistResponse } from 'types/spotifyApi'

export const playlistAtom = atom<PlaylistResponse>({
  key: 'playlistState',
  default: null
})

export const playlistIdAtom = atom({
  key: 'playlistIdState',
  default: '3LFIBdP7eZXJKqf3guepZ1'
})

export const playlistUriAtom = atom<string>({
  key: 'playlistUriState',
  default: null
})
