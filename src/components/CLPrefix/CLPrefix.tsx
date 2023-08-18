import { USER } from '@/constants'
import { FC } from 'react'
import { Props } from './CLPrefix.types.ts'

export const CLPrefix: FC<Props> = ({ directory = 'root' }) => {
  return (
    <span className="text-stone-300 mr-2">
      <span className="text-ubuntuGreen font-medium">{USER}</span>:{' '}
      <span className="text-ubuntuBlue">
        {directory === 'root' ? '~' : directory}
      </span>
      $
    </span>
  )
}
