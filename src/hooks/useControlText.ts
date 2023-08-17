import {useCallback, useEffect, useRef, useState} from "react";
import {IGNORED_KEYS} from "../constants";

export const useControlText = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputValueRef = useRef(inputValue);

  const handleBackspace = () => {
    setInputValue((prevState) => {
      const value = prevState.slice(0, -1)
      inputValueRef.current = value;
      return value;
    });
    setCursorPosition((prevState) => prevState - 1);
  }

  const handleArrowLeft = () => {
    setCursorPosition((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  }

  const handleArrowRight = () => {
    setCursorPosition((prevState) => {
      if (prevState < inputValueRef.current.length) {
        return prevState + 1;
      }
      return prevState;
    });
  }

  const handleCommandEnter = (key: string) => {
    setInputValue((prevState) => {
      const value = prevState + key
      inputValueRef.current = value;
      return value;
    });
    setCursorPosition((prevState) => prevState + 1);
  }

  const handleEnterText = useCallback((e: KeyboardEvent) => {
    if (!IGNORED_KEYS.includes(e.key)) {
      handleCommandEnter(e.key);
    }
    if (e.key === 'ArrowLeft') {
      handleArrowLeft();
    }
    if (e.key === 'ArrowRight') {
      handleArrowRight();
    }
    if (e.key === 'Backspace') {
      handleBackspace();
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
