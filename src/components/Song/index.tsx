import { MusicNoteIcon } from '@heroicons/react/outline'
import { currentTrackIdAtom, isPlayingAtom } from 'atoms/songAtom'
import spotifyApi from 'lib/spotify'
import { msToMinutesAndSeconds } from 'lib/time'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { PlaylistTrack } from 'types/spotifyApi'

interface SongProps {
  song: PlaylistTrack
  order: number
}

const Song: React.FC<SongProps> = ({ order, song: { track } }) => {
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdAtom)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom)
  const [isCurrentTrackPlaying, setIsCurrentTrackPlaying] = useState(false)

  const playSong = useCallback(() => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    spotifyApi
      .play({
        uris: [track.uri]
      })
      .catch((err) => console.log(err))
  }, [track, spotifyApi])

  useEffect(() => {
    setIsCurrentTrackPlaying(currentTrackId === track?.id && isPlaying)
  }, [isPlaying, currentTrackId])

  return (
    <div className="song" onClick={playSong}>
      <div className="col-span-2 flex items-center space-x-5 md:col-span-1">
        {isCurrentTrackPlaying ? (
          <MusicNoteIcon className="w-10 pr-2 text-green-500" />
        ) : (
          <p className="w-10 p-4">{order + 1}</p>
        )}
        {track.album.images?.[0]?.url && (
          <Image
            className={
              isCurrentTrackPlaying ? 'animate-spin-slow rounded-full' : ''
            }
            src={track.album.images?.[0]?.url}
            alt="Capa da música"
            width={44}
            height={44}
            loading="lazy"
          />
        )}

        <div>
          <h3
            className={`w-36 truncate lg:w-64 ${
              isCurrentTrackPlaying ? 'text-green-600' : 'text-white'
            }`}
          >
            {track.name}
          </h3>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="col-span-1 ml-auto flex items-center justify-between text-neutral-400 md:ml-0">
        <p className="hidden w-40 md:block"> {track.album.name}</p>
        <p>{msToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
