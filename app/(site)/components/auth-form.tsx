'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

import Form from '@/app/components/form';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import SocialButton from './social-button';
import { registerRequest } from '@/app/services';

type FieldValues = {
  email: string;
  name: string;
  password: string;
};
type SignInProps = {
  type: 'github' | 'google' | 'credentials';
  data?: Partial<FieldValues>;
};

const AuthForm = () => {
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const router = useRouter();

  const toggle = () => setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');

  const signInMutaion = useMutation({
    mutationFn: ({ type, data = {} }: SignInProps) => {
      return signIn(type, { ...data, redirect: false });
    },
    onSuccess(callback) {
      callback?.error && toast.error('Invalid credentials!');
      callback?.ok && router.push('/conversations');
    }
  });

  const registerMutaion = useMutation({
    mutationFn: (data: FieldValues) => registerRequest(data),
    onSuccess(_, data) {
      signInMutaion.mutate({ type: 'credentials', data });
    }
  });

  return (
    <div className='space-y-6'>
      <Form<FieldValues>
        onSubmit={(data) => {
          variant === 'LOGIN'
            ? signInMutaion.mutate({ type: 'credentials', data })
            : registerMutaion.mutate(data);
        }}
      >
        <Form.Item label='Name' name='name' hidden={variant === 'LOGIN'}>
          <Input />
        </Form.Item>
        <Form.Item label='Emial' name='email'>
          <Input defaultValue='dou1@qq.com' />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input type='password' defaultValue='dou123' />
        </Form.Item>
        <Button
          type='primary'
          block
          disabled={signInMutaion.isPending || registerMutaion.isPending}
        >
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-sm text-gray-500'>Or continue with</span>
        </div>
      </div>
      <div className='flex gap-2'>
        <SocialButton
          icon={BsGithub}
          onClick={() => signInMutaion.mutate({ type: 'github' })}
        />
        <SocialButton
          icon={BsGoogle}
          onClick={() => signInMutaion.mutate({ type: 'google' })}
        />
      </div>
      <div className='flex justify-center gap-2 px-2 text-sm text-gray-500'>
        <div>
          {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
        </div>
        <div onClick={toggle} className='cursor-pointer underline'>
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
