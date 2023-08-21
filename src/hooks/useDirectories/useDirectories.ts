import { useEffect, useMemo, useState } from 'react'
import { CommandLineHistoryObject } from 'types/command-line.ts'
import { useFileSystemContext } from 'context/hooks'
import { Directory } from 'types/file-system.ts'
import { generateId } from '@/utils'
import { INITIAL_DIRECTORY_HISTORY } from '@/constants'
import { Params } from './useDirectories.types.ts'

export const useDirectories = ({ scrollRef }: Params) => {
  const { directoryTree } = useFileSystemContext()

  const [directoriesHistory, setDirectoriesHistory] = useState<string[]>(
    INITIAL_DIRECTORY_HISTORY,
  )
  const [currentDirectory, setCurrentDirectory] = useState<string>('root')
  const [currentDirectoryTree, setCurrentDirectoryTree] =
    useState<Directory | null>(directoryTree)
  const [historyLines, setHistoryLines] = useState<CommandLineHistoryObject[]>(
    [],
  )

  const handleAddHistoryLine = (historyLine: CommandLineHistoryObject) => {
    setHistoryLines((prevState) => [...prevState, historyLine])
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, [historyLines])

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

    setCurrentDirectoryTree(currentDirectory)
  }, [directoriesHistory, directoryTree])

  const returnLsValue = () => {
    if (currentDirectoryTree?.children) {
      return currentDirectoryTree?.children
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

  const checkExistsDirectory = (directoryName: string) => {
    return currentDirectoryTree?.children?.some(
      (child) => child.name === directoryName,
    )
  }

  const generateErrorHistoryLine = (directoryName: string) => {
    const historyLine = {
      value: `cd: ${directoryName}: No such file or directory`,
      id: generateId(),
    }

    handleAddHistoryLine(historyLine)
  }

  const handleCd = (command: string[]) => {
    const value = command[1]
    const isExistsDirectory = checkExistsDirectory(value)
    const prevHistory = directoriesHistory.slice(
      0,
      directoriesHistory.length - 1,
    )
    const prevHistoryItem = prevHistory[prevHistory.length - 1]

    switch (value) {
      case '.':
        break
      case '..':
        if (currentDirectory !== 'root') {
          setDirectoriesHistory(prevHistory)
          setCurrentDirectory(prevHistoryItem)
        }

        break
      case undefined:
      case '':
        setDirectoriesHistory(INITIAL_DIRECTORY_HISTORY)
        setCurrentDirectory('root')
        break
      default:
        if (isExistsDirectory) {
          setCurrentDirectory(value)
          setDirectoriesHistory((prevState) => [...prevState, value])
        } else {
          generateErrorHistoryLine(value)
        }
    }
  }

  const handleReadAndExecuteCommand = (
    historyLine: CommandLineHistoryObject,
  ) => {
    const command = historyLine.value.split(' ')
    const firstCommand = command[0]
    handleAddHistoryLine({ ...historyLine, name: currentDirectory })

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
