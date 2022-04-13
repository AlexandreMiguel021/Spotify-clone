import React, { ReactNode } from 'react'

type Props = {
  text: string
  children: ReactNode
}

const ButtonIcon: React.FC<Props> = ({ text, children }: Props) => (
  <button className="flex items-center space-x-2 hover:text-white">
    <div className="h-7 w-7">{children}</div>
    <p className="text-sm font-medium">{text}</p>
  </button>
)

export default ButtonIcon
