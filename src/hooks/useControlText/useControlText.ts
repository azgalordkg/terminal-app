import React from 'react'
import { IGNORED_KEYS } from '@/constants'
import { generateId } from '@/utils'
import { Params } from './useControlText.types.ts'
import { useInputValueContext } from 'context/hooks'

export const useControlText = ({
  handleReadAndExecuteCommand,
  handleTabPress,
}: Params) => {
  const {
    cursorPosition,
    isFocused,
    inputValue,
    handleSetInputValue,
    handleSetCursorPosition,
  } = useInputValueContext()

  const handleBackspace = () => {
    if (cursorPosition > 0) {
      const nextValue =
        inputValue.slice(0, cursorPosition - 1) +
        inputValue.slice(cursorPosition)
      handleSetInputValue(nextValue)

      if (cursorPosition > 0) {
        handleSetCursorPosition(cursorPosition - 1)
      }
    }
  }

  const resetAllValues = () => {
    handleSetInputValue('')
    handleSetCursorPosition(0)
  }

  const handleEnterKeyPress = () => {
    const historyLine = {
      id: generateId(),
      value: inputValue,
    }

    handleReadAndExecuteCommand(historyLine)
    resetAllValues()
  }

  const handleArrowLeft = () => {
    if (cursorPosition > 0) {
      handleSetCursorPosition(cursorPosition - 1)
    }
  }

  const handleArrowRight = () => {
    if (cursorPosition < inputValue.length) {
      handleSetCursorPosition(cursorPosition + 1)
    }
  }

  const handleCommandEnter = (key: string) => {
    const nextValue =
      inputValue.slice(0, cursorPosition) +
      key +
      inputValue.slice(cursorPosition)

    handleSetInputValue(nextValue)
    handleSetCursorPosition(cursorPosition + 1)
  }

  const handleTabKeyPress = () => {
    if (inputValue.length > 0) {
      const historyLine = {
        id: generateId(),
        value: inputValue,
      }

      handleTabPress(historyLine)
    }
  }

  const handleEnterText = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!IGNORED_KEYS.includes(e.key)) {
      handleCommandEnter(e.key)
    }

    switch (e.key) {
      case 'ArrowLeft':
        handleArrowLeft()
        break
      case 'ArrowRight':
        handleArrowRight()
        break
      case 'Backspace':
        handleBackspace()
        break
      case 'Space':
        handleCommandEnter('\u00A0')
        break
      case 'Enter':
        handleEnterKeyPress()
        break
      case 'Tab':
        e.preventDefault()
        handleTabKeyPress()
        break
      default:
        break
    }
  }

  return {
    cursorPosition,
    inputValue,
    isFocused,
    handleEnterText,
  }
}
