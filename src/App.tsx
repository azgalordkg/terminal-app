import { FileSystemContextProvider, InputValueContextProvider } from '@/context'
import { HomePage } from '@/pages'

function App() {
  return (
    <FileSystemContextProvider>
      <InputValueContextProvider>
        <HomePage />
      </InputValueContextProvider>
    </FileSystemContextProvider>
  )
}

export default App
