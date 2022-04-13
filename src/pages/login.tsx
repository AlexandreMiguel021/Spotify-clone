import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import { NextPage } from 'next/types'
import Image from 'next/image'
import spotifyLogo from '/public/images/spotify.png'

type Props = {
  providers: ClientSafeProvider[]
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}

const login: NextPage<Props> = ({ providers }: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <Image src={spotifyLogo} width={900} height={450} alt="Spotify Logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className=" m-5 rounded-full bg-gradient-to-l from-blue-800 via-purple-600 to-pink-700 p-3 text-white duration-150 hover:-translate-y-1"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default login
