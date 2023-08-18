import { ActionButtons, CommandLine, Header, Wrapper } from '@/components'
import { useFileSystemContext } from 'context/hooks'
import { useEffect } from 'react'

export const HomePage = () => {
  const { createInitialFileSystem, getDirectories } = useFileSystemContext()

  useEffect(() => {
    createInitialFileSystem()
    getDirectories()
  }, [])

  return (
    <div className="bg-[url(./assets/images/ubuntu-desktop.png)] w-screen h-screen relative">
      <Wrapper>
        <Header />
        <ActionButtons />

        <CommandLine />
      </Wrapper>
    </div>
  )
}
