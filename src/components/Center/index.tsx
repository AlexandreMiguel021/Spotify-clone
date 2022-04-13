import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { playlistAtom, playlistIdAtom } from 'atoms/playlistAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSpotify from 'hooks/useSpotify'
import Songs from 'components/Songs'
import Header from 'components/Header'
import Image from 'next/image'

const Center: React.FC = () => {
  const spotifyApi = useSpotify()
  const playlistIdState = useRecoilValue(playlistIdAtom)
  const [playlist, setPlaylist] = useRecoilState(playlistAtom)

  useEffect(() => {
    if (playlistIdState) {
      spotifyApi
        .getPlaylist(playlistIdState)
        .then((data) => {
          setPlaylist(data.body)
        })
        .catch((err) => {
          console.log(err)
          signOut()
        })
    }
  }, [spotifyApi, playlistIdState])

  return (
    <div className="relative h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <Header />
      <section className="gradient-purple flex h-80 w-full items-end space-x-7 p-8 text-white">
        {playlist?.images?.[0]?.url && (
          <Image
            src={playlist?.images?.[0]?.url}
            className="shadow-2xl"
            alt="Capa do Album"
            width={192}
            height={192}
            loading="lazy"
          />
        )}
        <div>
          <p className="font-semibold uppercase">Playlist</p>
          <h2 className="font-bold sm:text-lg md:text-3xl lg:text-4xl">
            {playlist?.name}
          </h2>
          <div className="pt-3 text-xs text-slate-300 md:text-sm lg:text-base"></div>
        </div>
      </section>
      <div>
        {playlist?.tracks.items && <Songs songs={playlist.tracks.items} />}
      </div>
    </div>
  )
}

export default Center
