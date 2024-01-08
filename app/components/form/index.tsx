'use client';

import clsx from 'clsx';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Item, { TYPE_NAME } from './item';

type FormProps<T = {}> = {
  children: React.ReactNode;
  onSubmit?: (values: T) => void;
  className?: string;
};

/**
 * @description Form传递泛型作为onSumbit参数的类型
 * @example <Form<{email: string}> label='Email'></Form>
 */

const Form = <
  T extends {
    [key: string]: string | number | undefined | null | boolean;
  }
>({
  children,
  onSubmit,
  className
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<T>();

  const _onSubmit: SubmitHandler<T> = (values) => onSubmit?.(values);

  const clone = (child: React.ReactElement) => {
    if (typeof child.type === 'function' && child.type.name === TYPE_NAME) {
      const { props } = child;
      const { name } = props;

      return React.cloneElement(child, {
        key: name,
        // Form.Item的children注入props
        children: React.cloneElement(props.children, {
          id: name,
          autoComplete: name,
          error: errors[name],
          ...register(name, { required: props.required })
        })
      });
    }

    return child;
  };

  const enhanceChildren = (_children: FormProps['children']) => {
    return Array.isArray(_children)
      ? _children.map((child) => clone(child as React.ReactElement))
      : clone(_children as React.ReactElement);
  };

  return (
    <form className={clsx('space-y-6', className)} onSubmit={handleSubmit(_onSubmit)}>
      {enhanceChildren(children)}
    </form>
  );
};

Form.Item = Item;

export default Form;
