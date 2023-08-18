import {createContext, FC, PropsWithChildren} from "react";
import {FileSystemContextType} from "./FileSystemContext.types.ts";
import {LocalStorage} from "../../utils";
import {DIRECTORIES, INITIAL_DIRECTORY} from "../../constants";

export const FileSystemContext = createContext<FileSystemContextType>({
  createInitialFileSystem: () => {
  },
  getDirectories: () => {
  }
} as FileSystemContextType);

export const FileSystemContextProvider: FC<PropsWithChildren> = ({children}) => {
  const createInitialFileSystem = () => {
    const directories = LocalStorage.getStorage(DIRECTORIES)
    if (!directories) {
      LocalStorage.setStorage(DIRECTORIES, INITIAL_DIRECTORY)
    }
  }

  const getDirectories = () => {
    return LocalStorage.getStorage(DIRECTORIES)
  }

  return (
    <FileSystemContext.Provider value={{createInitialFileSystem, getDirectories}}>
      {children}
    </FileSystemContext.Provider>
  )
};
