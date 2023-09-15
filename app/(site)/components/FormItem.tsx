'use client';

import React from 'react';
import clsx from 'clsx';

interface FormItemProps {
  children: React.ReactElement;
  label: string;
  name: string;
}

const FormItem: React.FC<FormItemProps> = ({ children, label, name }) => {
  return (
    <div className='space-y-1.5'>
      <label htmlFor={name} className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div>{React.cloneElement(children, { id: name })}</div>
    </div>
  );
};

export default FormItem;
