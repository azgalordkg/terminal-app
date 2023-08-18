import { useContext } from 'react'
import { FileSystemContext } from '@/context'

export const useFileSystemContext = () => {
  const { directoryTree, createInitialFileSystem, getDirectories } =
    useContext(FileSystemContext)

  return {
    directoryTree,
    createInitialFileSystem,
    getDirectories,
  }
}
