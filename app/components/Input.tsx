'use client';

import clsx from 'clsx';

export type InputHTMLType = React.InputHTMLAttributes<HTMLInputElement>['type'];

interface InputProps {
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  value?: string;
  type?: InputHTMLType;
}

const Input: React.FC<InputProps> = ({ disabled, error, ...restProps }) => {
  return (
    <input
      className={clsx(
        'form-input placeholder:gray-300 block w-full rounded-md border-0 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600',
        error && 'ring-rose-500 focus:ring-red-500',
        disabled && 'cursor-default opacity-50'
      )}
      {...restProps}
    />
  );
};

export default Input;
