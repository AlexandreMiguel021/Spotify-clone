import { PlaylistTrack } from 'types/spotifyApi'
import Song from 'components/Song'
import React from 'react'

interface SongProps {
  songs: PlaylistTrack[]
}

const Songs: React.FC<SongProps> = ({ songs }) => (
  <div className="flex flex-col px-8 text-white">
    {songs.map((song, i) => (
      <Song key={song.track.id} song={song} order={i} />
    ))}
  </div>
)

export default Songs
