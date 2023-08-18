import { useCallback, useEffect, useRef, useState } from 'react'
import { IGNORED_KEYS } from '@/constants'

export const useControlText = () => {
  const x = 1
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
    if (e.key === 'ArrowLeft') {
      handleArrowLeft()
    }
    if (e.key === 'ArrowRight') {
      handleArrowRight()
    }
    if (e.key === 'Backspace') {
      handleBackspace()
    }
    if (e.key === 'Space') {
      handleCommandEnter('\u00A0\u00A0\u00A0')
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

  const cutFirstPartOfText = (text: string) => {
    return text.slice(0, cursorPosition)
  }

  const cutSecondPartOfText = (text: string) => {
    return text.slice(cursorPosition + 1)
  }

  return {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
    cutFirstPartOfText,
    cutSecondPartOfText,
  }
}
