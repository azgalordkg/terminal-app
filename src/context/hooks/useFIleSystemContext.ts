import { useContext } from 'react'
import { FileSystemContext } from '@/context'

export const useFileSystemContext = () => {
  const { createInitialFileSystem, getDirectories } =
    useContext(FileSystemContext)

  return {
    createInitialFileSystem,
    getDirectories,
  }
}
