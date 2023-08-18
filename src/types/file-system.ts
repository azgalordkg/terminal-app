export type DirectoryType = 'directory' | 'file';
export type FileType = 'text';

export interface Directory {
  name: string;
  type: DirectoryType;
  fileType?: FileType;
  children?: Directory[];
}
