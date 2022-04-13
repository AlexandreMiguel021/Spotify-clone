import 'next-auth/jwt'
import 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpire: number
    accessToken?: string
    refreshToken?: string
    username: string
  }
}

declare module 'next-auth' {
  interface Session {
    user?: {
      accessToken?: string
      email?: string
      image?: string
      refreshToken?: string
      username?: string
      name?: string
    }
  }
}
