import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon
} from '@heroicons/react/solid'
import { currentTrackIdAtom, isPlayingAtom } from 'atoms/songAtom'
import useSongInfo from 'hooks/useSongInfo'
import useSpotify from 'hooks/useSpotify'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const Player: React.FC = () => {
  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdAtom)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom)
  const [volume, setVolume] = useState(50)

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      try {
        const all = await Promise.all([
          spotifyApi.getMyCurrentPlayingTrack(),
          spotifyApi.getMyCurrentPlaybackState()
        ])
        if (all[0].body && all[1].body.item) {
          setCurrentTrackId(all[0].body.item?.id)
        }
        all[1].body && setIsPlaying(all[1].body.is_playing)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handlePlayPause = useCallback(async () => {
    try {
      const res = await spotifyApi.getMyCurrentPlaybackState()
      if (res.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        await spotifyApi.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.log(err)
    }
  }, [spotifyApi])

  const handleRewind = useCallback(async () => {
    try {
      await spotifyApi.skipToPrevious()
      const res = await spotifyApi.getMyCurrentPlaybackState()
      if (res?.body?.item) {
        setCurrentTrackId(res.body.item?.id)
      }
    } catch (err) {
      console.log(err)
    }
  }, [spotifyApi])

  const handleFastForward = useCallback(async () => {
    try {
      await spotifyApi.skipToNext()
      const res = await spotifyApi.getMyCurrentPlaybackState()
      if (res.body) {
        setCurrentTrackId(res.body.item?.id)
      }
    } catch (err) {
      console.log(err)
    }
  }, [spotifyApi, currentTrackId])

  const debouncedAdjustVolume = useCallback(
    debounce(async (volume: number) => {
      try {
        await spotifyApi.setVolume(volume)
      } catch (err) {
        console.log(err)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className="player">
      <div className="flex items-center space-x-4">
        {songInfo?.album.images?.[0].url && (
          <img
            className="w-12"
            src={songInfo?.album.images?.[0].url}
            alt={`Capa do álbum ${songInfo?.album?.name}`}
          />
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="player-btn " />
        <RewindIcon className="player-btn" onClick={handleRewind} />

        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="player-btn h-10 w-10"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="player-btn h-10 w-10"
          />
        )}
        <FastForwardIcon className="player-btn" onClick={handleFastForward} />
        <ReplyIcon className="player-btn" />
      </div>
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeOffIcon
          className="player-btn "
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <label className="sr-only" htmlFor="range">
          aumentar e dimunuir volume
        </label>
        <input
          id="range"
          className="w-14 md:w-28"
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="player-btn"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
