import { createContext, FC, PropsWithChildren, useState } from 'react'
import { FileSystemContextType } from './FileSystemContext.types.ts'
import { LocalStorage } from '@/utils'
import { DIRECTORIES, INITIAL_DIRECTORY } from '@/constants'
import { Directory } from 'types/file-system.ts'

export const FileSystemContext = createContext<FileSystemContextType>({
  directoryTree: {} as Directory,
  createInitialFileSystem: () => {},
  getDirectories: () => {},
} as FileSystemContextType)

export const FileSystemContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [directoryTree, setDirectoryTree] = useState<Directory>({} as Directory)
  const createInitialFileSystem = () => {
    const directories = LocalStorage.getStorage(DIRECTORIES)
    if (!directories) {
      LocalStorage.setStorage(DIRECTORIES, INITIAL_DIRECTORY)
    }
  }

  const getDirectories = () => {
    setDirectoryTree(LocalStorage.getStorage(DIRECTORIES) || {})
  }

  return (
    <FileSystemContext.Provider
      value={{ directoryTree, createInitialFileSystem, getDirectories }}
    >
      {children}
    </FileSystemContext.Provider>
  )
}
