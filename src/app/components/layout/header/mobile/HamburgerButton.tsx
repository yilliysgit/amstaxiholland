import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // accepteert waarde óf functie
  className?: string;
  label?: string;
  controlsId?: string; // id van het menu-element (optioneel)
}



const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  setIsOpen,
  className = '',
  label = 'Menu',
  controlsId,
}) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(v => !v)}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      className={`w-10 h-10 inline-flex flex-col justify-center items-center ${className}`}
    >
      <span
        aria-hidden
        className={`block w-6 h-[3px] bg-current transition-transform duration-300 origin-center ${
          isOpen ? 'translate-y-[6px] rotate-45' : ''
        }`}
      />
      <span
        aria-hidden
        className={`block w-6 h-[3px] bg-current transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        aria-hidden
        className={`block w-6 h-[3px] bg-current transition-transform duration-300 origin-center ${
          isOpen ? '-translate-y-[6px] -rotate-45' : ''
        }`}
      />
    </button>
  );
};

export default HamburgerButton;
