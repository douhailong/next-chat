'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface FormItemProps {
  children: React.ReactElement;
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  name,
  errors,
  register,
  required
}) => {
  return (
    <div className='space-y-1.5'>
      <label
        htmlFor={name}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div>
        {React.cloneElement(children, {
          id: name,
          autoComplete: name,
          error: errors[name],
          ...register(name, { required })
        })}
      </div>
    </div>
  );
};

export default FormItem;
