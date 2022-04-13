import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Spotify-Clone</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="icons/apple-icon-180x180.png"
          ></link>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="favicon.ico" />
          <meta
            name="description"
            content="Clone da interface do Spotify utlizando Typescript, nextJS e Tailwind CSS!"
          />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
