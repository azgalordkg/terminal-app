import React, { FC, useRef } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useControlText, useDirectories } from '@/hooks'
import { ClInput, CLPrefix, CLLineWrapper } from '@/components'

export const CommandLine: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { handleReadAndExecuteCommand, currentDirectory, historyLines } =
    useDirectories({ scrollRef })

  const {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
    handleEnterText,
  } = useControlText({ handleReadAndExecuteCommand })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isFocused) {
      handleEnterText(e)
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={handleFocusBlur}>
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleFocus}
        className="bg-ubuntuPurple h-[400px] pb-2 outline-0"
      >
        <div ref={scrollRef} className="overflow-auto max-h-[100%]">
          {historyLines.map(({ id, name, value }) => (
            <CLLineWrapper key={id}>
              {name && <CLPrefix directory={name} />}
              <ClInput inputValue={value} isReadOnly />
            </CLLineWrapper>
          ))}
          <CLLineWrapper>
            <CLPrefix directory={currentDirectory} />
            <ClInput
              cursorPosition={cursorPosition}
              inputValue={inputValue}
              isFocused={isFocused}
            />
          </CLLineWrapper>
        </div>
      </div>
    </OutsideClickHandler>
  )
}
