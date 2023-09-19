'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import FormItem from './FormItem';

const AuthForm = () => {
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' }
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {};

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {/* <FormItem label='Name' name='name'>
        <Input />
      </FormItem>
      <FormItem label='Emial' name='email'>
        <Input />
      </FormItem> */}
      <FormItem label='Password' name='password'>
        <Input onChange={(e) => console.log(e.target.value)} />
      </FormItem>
      <Button type='danger' block>
        Sign in
      </Button>
    </form>
  );
};

export default AuthForm;
