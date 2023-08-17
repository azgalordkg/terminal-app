import {TERMINAL_ACTION_BUTTONS} from "../../constants";

export const TerminalActionButtons = () => {
  return (
    <div className='p-[6px]'>
      <div className={`flex`}>
        {TERMINAL_ACTION_BUTTONS.map(({id, label}) => (
          <button key={id} className='mr-3 text-stone-300'>{label}</button>
        ))}
      </div>
    </div>
  );
};
