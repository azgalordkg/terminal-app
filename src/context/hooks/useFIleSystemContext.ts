import {useContext} from "react";
import {FileSystemContext} from "../FileSystemContext";

export const useFileSystemContext = () => {
  const {createInitialFileSystem, getDirectories} = useContext(FileSystemContext);

  return {
    createInitialFileSystem,
    getDirectories
  }
}
