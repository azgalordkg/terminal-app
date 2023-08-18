import { FC, PropsWithChildren } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useControlText } from '@/hooks'

export const CommandLine: FC<PropsWithChildren> = ({ children }) => {
  const {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
    cutFirstPartOfText,
    cutSecondPartOfText,
  } = useControlText()

  return (
    <OutsideClickHandler onOutsideClick={handleFocusBlur}>
      <div onClick={handleFocus} className="bg-ubuntuPurple h-[400px]">
        <div className="p-[6px]">
          <div className="flex items-center">
            {children}
            <pre className="flex items-center">
              <span className="text-white">
                {cutFirstPartOfText(inputValue)}
              </span>
              <div className="relative">
                <span
                  className={`${
                    isFocused ? 'cursor-text' : 'cursor-text_disabled'
                  }`}
                >
                  {inputValue[cursorPosition]}
                </span>
                <span
                  className={`${isFocused ? 'cursor' : 'cursor_disabled'} ${
                    inputValue[cursorPosition] ? 'cursor-absolute' : ''
                  }`}
                />
              </div>
              {cursorPosition !== inputValue.length && (
                <span className="text-white">
                  {cutSecondPartOfText(inputValue)}
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  )
}
