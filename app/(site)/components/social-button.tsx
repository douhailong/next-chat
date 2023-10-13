'use client';

import { IconType } from 'react-icons';

interface SocialButtonProps {
  icon: IconType;
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='inline-flex w-full justify-center rounded-md px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
    >
      <Icon />
    </button>
  );
};

export default SocialButton;
