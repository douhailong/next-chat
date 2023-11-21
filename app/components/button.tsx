'use client';

import clsx from 'clsx';

export type ButtonProps = {
  type?: 'default' | 'danger' | 'primary' | 'text';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children?: React.ReactNode;
  block?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  htmlType,
  disabled,
  block,
  onClick,
  children
}) => {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        type === 'danger' &&
          'bg-rose-500 hover:bg-red-600 focus-visible:outline-rose-600',
        type === 'primary' && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600',
        type === 'default' && 'text-black',
        disabled && 'cursor-default opacity-50',
        block && 'w-full'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
