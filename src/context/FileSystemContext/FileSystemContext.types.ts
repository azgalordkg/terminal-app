import { Directory } from '@/types/file-system.ts'

export interface FileSystemContextType {
  createInitialFileSystem: () => void
  getDirectories: () => Directory[]
}
