import { FC } from 'react'
import { EditableProps, Props } from 'components/CLInput/ClInput.types.ts'

export const ClInput: FC<Props> = (props) => {
  if ('isReadOnly' in props && props.isReadOnly) {
    return (
      <pre className="flex items-center">
        <span className="text-white">{props.inputValue}</span>
      </pre>
    )
  } else {
    const { cursorPosition, inputValue, isFocused } = props as EditableProps

    const cutFirstPartOfText = (text: string) => {
      return text.slice(0, cursorPosition)
    }

    const cutSecondPartOfText = (text: string) => {
      return text.slice(cursorPosition + 1)
    }

    return (
      <pre className="flex items-center">
        <span className="text-white">{cutFirstPartOfText(inputValue)}</span>
        <div className="relative">
          <span
            className={`${isFocused ? 'cursor-text' : 'cursor-text_disabled'}`}
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
          <span className="text-white">{cutSecondPartOfText(inputValue)}</span>
        )}
      </pre>
    )
  }
}
