import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
} from '@heroicons/react/outline'
import { playlistIdAtom } from 'atoms/playlistAtom'
import useSpotify from 'hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { Playlist } from 'types/spotifyApi'
import ButtonIcon from './ButtonIcon'
import LogoSidebar from './LogoSidebar'

const Sidebar: React.FC = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const setPlaylistIdState = useSetRecoilState(playlistIdAtom)

  const handlePlayListSelect = useCallback(
    (id: string) => {
      setPlaylistIdState(id)
    },
    [setPlaylistIdState]
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylists(data.body.items)
        })
        .catch((err) => console.log(err))
    }
  }, [session, spotifyApi])

  return (
    <aside className="aside">
      <h1>
        <LogoSidebar />
      </h1>
      <div className="space-y-4">
        <ButtonIcon text="Início">
          <HomeIcon />
        </ButtonIcon>
        <ButtonIcon text="Buscar">
          <SearchIcon />
        </ButtonIcon>
        <ButtonIcon text="Sua Biblioteca">
          <LibraryIcon />
        </ButtonIcon>
        <hr className="opacity-0" />
        <ButtonIcon text="Criar playlist">
          <PlusCircleIcon />
        </ButtonIcon>
        <ButtonIcon text="Múscias Curtidas">
          <HeartIcon />
        </ButtonIcon>
        <ButtonIcon text="Seus episódios">
          <RssIcon />
        </ButtonIcon>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <p
            className="w-52 cursor-pointer truncate text-sm hover:text-white"
            onClick={() => handlePlayListSelect(playlist.id)}
            key={playlist.id}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
