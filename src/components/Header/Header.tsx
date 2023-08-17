import {MinusSmallIcon, StopIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <div className='relative flex justify-end p-[6px]'>
      <h2 className='absolute-center whitespace-nowrap text-stone-300 font-medium'>Azgalord@linux-desktop: ~</h2>
      <div className='grid grid-cols-3 gap-1'>
        <button className='window-button'>
          <MinusSmallIcon className='button-icon'/>
        </button>
        <button className='window-button'>
          <StopIcon className='button-icon'/>
        </button>
        <button className='window-button_red'>
          <XMarkIcon className='button-icon'/>
        </button>
      </div>
    </div>
  );
};
