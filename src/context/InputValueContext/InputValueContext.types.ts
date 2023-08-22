export interface FileSystemContextType {
  cursorPosition: number
  isFocused: boolean
  inputValue: string
  handleSetInputValue: (value: string) => void
  handleSetCursorPosition: (position: number) => void
  handleFocus: () => void
  handleFocusBlur: () => void
}
