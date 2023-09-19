'use client';

import clsx from 'clsx';

export type InputHTMLType = React.InputHTMLAttributes<HTMLInputElement>['type'];

export interface InputProps {
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  value?: string;
  type?: InputHTMLType;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = ({ disabled, error, ...restProps }) => {
  return (
    <input
      className={clsx(
        'placeholder:gray-300 form-input block w-full rounded-md border-0 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600',
        error && 'ring-rose-500 focus:ring-red-500',
        disabled && 'cursor-default opacity-50'
      )}
      {...restProps}
    />
  );
};

export default Input;
