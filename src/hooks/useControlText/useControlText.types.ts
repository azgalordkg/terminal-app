import { CommandLineHistoryObject } from 'types/command-line.ts'

export interface Params {
  handleReadAndExecuteCommand: (historyLine: CommandLineHistoryObject) => void
}
