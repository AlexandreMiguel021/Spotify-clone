import { ExclamationIcon } from '@heroicons/react/outline'
import Layout from 'components/_Layout'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Layout>
      <main>
        <section className="bg-zinc-900">
          <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
            <div className="flex w-44 justify-center text-4xl text-green-500">
              <ExclamationIcon className="m-0 mr-2 w-10" /> 404
            </div>
            <h1 className="mt-8 text-4xl text-white md:text-6xl">
              Página não encontrada :(
            </h1>
            <Link href={'/'}>
              <a className="mt-4 rounded-md bg-green-500 p-3 md:text-lg">
                Voltar para página inicial
              </a>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  )
}
