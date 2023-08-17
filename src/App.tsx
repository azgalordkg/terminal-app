import {TerminalWrapper, TerminalActionButtons, TerminalHeader} from "./components";

function App() {
  return (
    <div className='bg-[url(./assets/images/ubuntu-desktop.png)] w-screen h-screen relative'>
      <TerminalWrapper>
        <TerminalHeader/>
        <TerminalActionButtons/>
      </TerminalWrapper>
    </div>
  )
}

export default App
