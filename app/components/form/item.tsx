'use client';

import clsx from 'clsx';

type FormItemProps = {
  children: React.ReactElement;
  label?: string;
  name: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  noStyle?: boolean;
  className?: string;
};

const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  name,
  hidden,
  noStyle,
  className
}) => {
  if (hidden) return null;

  return (
    <div className={clsx(!noStyle && 'space-y-1.5', className)}>
      <label
        htmlFor={name}
        className={clsx(
          'block text-sm font-medium leading-6 text-gray-900',
          noStyle && 'hidden'
        )}
      >
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
};

export const TYPE_NAME = FormItem.name;
export default FormItem;
