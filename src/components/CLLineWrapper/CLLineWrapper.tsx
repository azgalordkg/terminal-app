import { FC, PropsWithChildren } from 'react'

export const CLLineWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="px-[6px] py-[1px]">
      <div className="flex items-center">{children}</div>
    </div>
  )
}
