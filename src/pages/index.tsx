import Center from 'components/Center'
import Player from 'components/Player'
import Sidebar from 'components/Sidebar'
import Layout from 'components/_Layout'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session
    }
  }
}

export default Home
