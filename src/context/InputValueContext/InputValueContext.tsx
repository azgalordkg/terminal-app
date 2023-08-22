import { createContext, FC, PropsWithChildren, useState } from 'react'
import { FileSystemContextType } from 'context/InputValueContext/InputValueContext.types.ts'

export const InputValueContext = createContext<FileSystemContextType>({
  cursorPosition: 0,
  isFocused: false,
  inputValue: '',
  handleSetInputValue: () => {},
  handleSetCursorPosition: () => {},
  handleFocus: () => {},
  handleFocusBlur: () => {},
})

export const InputValueContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleSetInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleSetCursorPosition = (position: number) => {
    setCursorPosition(position)
  }
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleFocusBlur = () => {
    setIsFocused(false)
  }

  return (
    <InputValueContext.Provider
      value={{
        cursorPosition,
        isFocused,
        inputValue,
        handleSetInputValue,
        handleSetCursorPosition,
        handleFocus,
        handleFocusBlur,
      }}
    >
      {children}
    </InputValueContext.Provider>
  )
}
