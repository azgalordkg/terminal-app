export interface EditableProps {
  cursorPosition: number
  inputValue: string
  isFocused: boolean
}

export interface ReadOnlyProps {
  inputValue: string
  isReadOnly: boolean
}

export type Props = EditableProps | ReadOnlyProps
