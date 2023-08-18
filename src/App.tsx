import { FileSystemContextProvider } from '@/context'
import { HomePage } from '@/pages'

function App() {
  return (
    <FileSystemContextProvider>
      <HomePage />
    </FileSystemContextProvider>
  )
}

export default App
