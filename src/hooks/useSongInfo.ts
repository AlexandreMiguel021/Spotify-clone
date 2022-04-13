import { SingleTrack } from './../types/spotifyApi.d'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentTrackIdAtom } from './../atoms/songAtom'
import useSpotify from './useSpotify'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const currentTrackId = useRecoilValue(currentTrackIdAtom)
  const [songInfo, setSongInfo] = useState<SingleTrack>(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        try {
          const res = await spotifyApi.getTrack(currentTrackId)
          if (res.body) {
            setSongInfo(res.body)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
