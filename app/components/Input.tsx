'use client';

import clsx from 'clsx';
import second from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type: string;
  requied?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id }) => {
  return (
    <div>
      <label htmlFor={id} className='text-grey-900 block text-sm font-medium leading-6'>
        {label}
      </label>
    </div>
  );
};

export default Input;
