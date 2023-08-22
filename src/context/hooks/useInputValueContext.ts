import { useContext } from 'react'
import { InputValueContext } from '@/context'

export const useInputValueContext = () => {
  const {
    cursorPosition,
    isFocused,
    inputValue,
    handleSetInputValue,
    handleSetCursorPosition,
    handleFocus,
    handleFocusBlur,
  } = useContext(InputValueContext)

  return {
    cursorPosition,
    isFocused,
    inputValue,
    handleSetInputValue,
    handleSetCursorPosition,
    handleFocus,
    handleFocusBlur,
  }
}
