import { FC, PropsWithChildren } from 'react'

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute-center bg-ubuntuGray w-[720px] rounded-t-md shadow-md shadow-stone-900">
      {children}
    </div>
  )
}
