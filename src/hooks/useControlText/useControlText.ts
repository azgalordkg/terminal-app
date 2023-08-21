import React, { useState } from 'react'
import { IGNORED_KEYS } from '@/constants'
import { generateId } from '@/utils'
import { Params } from './useControlText.types.ts'

export const useControlText = ({ handleReadAndExecuteCommand }: Params) => {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleBackspace = () => {
    if (cursorPosition > 0) {
      const nextValue =
        inputValue.slice(0, cursorPosition - 1) +
        inputValue.slice(cursorPosition)
      setInputValue(nextValue)

      if (cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1)
      }
    }
  }

  const resetAllValues = () => {
    setInputValue('')
    setCursorPosition(0)
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
      setCursorPosition(cursorPosition - 1)
    }
  }

  const handleArrowRight = () => {
    if (cursorPosition < inputValue.length) {
      setCursorPosition(cursorPosition + 1)
    }
  }

  const handleCommandEnter = (key: string) => {
    const nextValue =
      inputValue.slice(0, cursorPosition) +
      key +
      inputValue.slice(cursorPosition)

    setInputValue(nextValue)
    setCursorPosition(cursorPosition + 1)
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
        break
      default:
        break
    }
  }

  const handleFocus = () => setIsFocused(true)

  const handleFocusBlur = () => setIsFocused(false)

  return {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
    handleEnterText,
  }
}
