import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from 'lib/spotify'

const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // if refresh access token attemp fails, direct user to login...
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
