import spotifyApi, { LOGIN_URL } from 'lib/spotify'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('refreshed token is', refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: refreshedToken.expires_in * 1000,
      refreshedToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refleshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account?.expires_at || 1) * 1000
          // expiry times in ms hence * 1000
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpire) {
        return token
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token)
    },

    async session({ session, token }): Promise<Session> {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }
  }
})
