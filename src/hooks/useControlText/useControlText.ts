import { useCallback, useEffect, useRef, useState } from 'react'
import { IGNORED_KEYS } from '@/constants'
import { generateId } from '@/utils'
import { Params } from './useControlText.types.ts'

export const useControlText = ({ handleReadAndExecuteCommand }: Params) => {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const inputValueRef = useRef(inputValue)
  const cursorPositionRef = useRef(cursorPosition)

  const handleBackspace = () => {
    if (cursorPositionRef.current > 0) {
      setInputValue((prevState) => {
        const value =
          prevState.slice(0, cursorPositionRef.current) +
          prevState.slice(cursorPositionRef.current + 1)
        inputValueRef.current = value
        return value
      })

      if (cursorPositionRef.current > 0) {
        setCursorPosition((prevState) => {
          const value = prevState - 1
          cursorPositionRef.current = value
          return value
        })
      }
    }
  }

  const resetAllValues = () => {
    setInputValue('')
    setCursorPosition(0)
    cursorPositionRef.current = 0
    inputValueRef.current = ''
  }

  const handleEnterKeyPress = () => {
    const historyLine = {
      id: generateId(),
      value: inputValueRef.current,
    }

    handleReadAndExecuteCommand(historyLine)
    resetAllValues()
  }

  const handleArrowLeft = () => {
    if (cursorPositionRef.current > 0) {
      setCursorPosition((prevState) => {
        const value = prevState - 1
        cursorPositionRef.current = value
        return value
      })
    }
  }

  const handleArrowRight = () => {
    if (cursorPositionRef.current < inputValueRef.current.length) {
      setCursorPosition((prevState) => {
        const value = prevState + 1
        cursorPositionRef.current = value
        return value
      })
    }
  }

  const handleCommandEnter = (key: string) => {
    setInputValue((prevState) => {
      const value =
        prevState.slice(0, cursorPositionRef.current) +
        key +
        prevState.slice(cursorPositionRef.current)
      inputValueRef.current = value
      return value
    })
    setCursorPosition((prevState) => {
      const value = prevState + 1
      cursorPositionRef.current = value
      return value
    })
  }

  const handleEnterText = useCallback((e: KeyboardEvent) => {
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
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleEnterText)
    }
  }, [handleEnterText])

  const handleFocus = () => {
    setIsFocused(true)
    document.addEventListener('keydown', handleEnterText)
  }

  const handleFocusBlur = () => {
    setIsFocused(false)
    document.removeEventListener('keydown', handleEnterText)
  }

  return {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
  }
}
