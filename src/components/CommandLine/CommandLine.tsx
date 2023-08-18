import { FC } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useControlText, useDirectories } from '@/hooks'
import { ClInput, CLPrefix, CLLineWrapper } from '@/components'

export const CommandLine: FC = () => {
  const { handleReadAndExecuteCommand, currentDirectory, historyLines } =
    useDirectories()

  const {
    cursorPosition,
    inputValue,
    isFocused,
    handleFocus,
    handleFocusBlur,
  } = useControlText({ handleReadAndExecuteCommand })

  return (
    <OutsideClickHandler onOutsideClick={handleFocusBlur}>
      <div onClick={handleFocus} className="bg-ubuntuPurple h-[400px] pb-2">
        <div className="overflow-auto max-h-[100%]">
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
