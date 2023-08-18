import {Wrapper, ActionButtons, Header, CommandLine, CommandLinePrefix} from "@/components";

function App() {
  return (
    <div className='bg-[url(./assets/images/ubuntu-desktop.png)] w-screen h-screen relative'>
      <Wrapper>
        <Header/>
        <ActionButtons/>

        <CommandLine>
          <CommandLinePrefix/>
        </CommandLine>
      </Wrapper>
    </div>
  )
}

export default App
