import { Directory } from '@/types/file-system.ts'

export const DIRECTORIES = 'directories'

export const USER = 'azgalord@linux-desktop'

export const INITIAL_DIRECTORY_HISTORY = ['root']

export const INITIAL_DIRECTORY: Directory = {
  name: 'root',
  type: 'directory',
  children: [
    {
      name: 'home',
      type: 'directory',
    },
    {
      name: 'bin',
      type: 'directory',
    },
    {
      name: 'usr',
      type: 'directory',
      children: [
        {
          name: 'local',
          type: 'directory',
        },
        {
          name: 'bin',
          type: 'directory',
        },
      ],
    },
    {
      name: 'etc',
      type: 'directory',
    },
    {
      name: 'var',
      type: 'directory',
    },
  ],
}
