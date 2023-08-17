import {FC, PropsWithChildren} from "react";

export const TerminalWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='absolute-center bg-ubuntuGray w-[720px] rounded-t-md overflow-hidden'>
      {children}
    </div>
  );
};

