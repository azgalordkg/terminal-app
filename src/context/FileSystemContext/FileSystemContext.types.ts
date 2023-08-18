import { Directory } from '@/types/file-system.ts'

export interface FileSystemContextType {
  directoryTree: Directory
  createInitialFileSystem: () => void
  getDirectories: () => void
}
