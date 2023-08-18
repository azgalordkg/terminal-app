import { useMemo, useRef, useState } from 'react'
import { CommandLineHistoryObject } from 'types/command-line.ts'
import { useFileSystemContext } from 'context/hooks'
import { Directory } from 'types/file-system.ts'
import { generateId } from '@/utils'
import { INITIAL_DIRECTORY_HISTORY } from '@/constants'

export const useDirectories = () => {
  const { directoryTree } = useFileSystemContext()

  const [directoriesHistory, setDirectoriesHistory] = useState<string[]>(
    INITIAL_DIRECTORY_HISTORY,
  )
  const [currentDirectory, setCurrentDirectory] = useState<string>('root')
  const [historyLines, setHistoryLines] = useState<CommandLineHistoryObject[]>(
    [],
  )
  const currentDirectoryRef = useRef(currentDirectory)

  const handleAddHistoryLine = (historyLine: CommandLineHistoryObject) => {
    setHistoryLines((prevState) => [...prevState, historyLine])
  }

  const currentDirectoryTreeRef = useRef({} as Directory)

  useMemo(() => {
    let currentDirectory: Directory | null = null

    for (const historyItem of directoriesHistory) {
      if (historyItem === 'root') {
        currentDirectory = directoryTree
      } else {
        currentDirectory = currentDirectory?.children?.find(
          (child) => child.name === historyItem,
        ) as Directory
      }
    }

    currentDirectoryTreeRef.current = currentDirectory as Directory
    return currentDirectory
  }, [directoriesHistory, directoryTree])

  const returnLsValue = () => {
    if (currentDirectoryTreeRef.current?.children) {
      return currentDirectoryTreeRef.current?.children
        ?.map((child) => child.name)
        .join(' ')
    }
    return ''
  }

  const handleLs = () => {
    const historyLine = {
      value: returnLsValue(),
      id: generateId(),
    }

    handleAddHistoryLine(historyLine)
  }

  const handleCd = (command: string[]) => {
    const value = command[1]

    switch (value) {
      case '.':
        break
      case '..':
        setDirectoriesHistory((prevState) => {
          const prevHistory = prevState.slice(0, prevState.length - 1)
          const prevHistoryItem = prevHistory[prevHistory.length - 1]

          currentDirectoryRef.current = prevHistoryItem
          setCurrentDirectory(prevHistoryItem)
          return prevHistory
        })
        break
      case undefined:
        setDirectoriesHistory(INITIAL_DIRECTORY_HISTORY)
        setCurrentDirectory('root')
        break
      default:
        setCurrentDirectory(value)
        currentDirectoryRef.current = value
        setDirectoriesHistory((prevState) => [...prevState, value])
    }
  }

  const handleReadAndExecuteCommand = (
    historyLine: CommandLineHistoryObject,
  ) => {
    const command = historyLine.value.split(' ')
    const firstCommand = command[0]
    handleAddHistoryLine({ ...historyLine, name: currentDirectoryRef.current })

    switch (firstCommand) {
      case 'ls':
        handleLs()
        break
      case 'cd':
        handleCd(command)
        break
      default:
        break
    }
  }

  return {
    currentDirectory,
    historyLines,
    handleAddHistoryLine,
    handleReadAndExecuteCommand,
  }
}
