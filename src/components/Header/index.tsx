import { ExternalLinkIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

const Header = () => {
  const [isDropDown, setIsDropDown] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="header">
      <div className="user-profile" onClick={() => setIsDropDown(!isDropDown)}>
        {session?.user.image ? (
          <Image
            className="rounded-full"
            src={session?.user.image}
            alt="Imagem de usuário"
            width={32}
            height={32}
            loading="lazy"
          />
        ) : (
          <UserIcon className="w-9 p-1" />
        )}

        {session?.user.name && <p>{session?.user.name}</p>}
        <ChevronDownIcon className={`h-5 w-5 ${isDropDown && 'rotate-180'}`} />
      </div>
      {isDropDown && (
        <div className="absolute top-14 right-3 w-52 rounded-md bg-black py-3 px-1 text-white">
          <ul className="first:texre text-sm">
            <li className="flex cursor-pointer justify-between py-1 pl-3 hover:bg-zinc-900">
              Conta
              <ExternalLinkIcon className="mr-5 w-5" />
            </li>
            <li className="cursor-pointer  py-1 pl-3 hover:bg-zinc-900">
              Perfil
            </li>
            <li
              className="cursor-pointer py-1 pl-3 hover:bg-zinc-900"
              onClick={() => signOut()}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
