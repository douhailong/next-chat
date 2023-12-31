'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import Input from '@/app/components/input';
import Button from '@/app/components/button';
import FormItem from './form-item';
import SocialButton from './social-button';

const AuthForm = () => {
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { email: 'dou1@qq.com', password: 'dou123' }
  });

  const toggle = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    function onSuccess(callback: SignInResponse | undefined) {
      callback?.error && toast.error('Invalid credentials!');
      callback?.ok && router.push('/conversations');
    }

    setIsLoading(true);
    variant === 'LOGIN'
      ? signIn('credentials', { ...values, redirect: false })
          .then(onSuccess)
          .finally(() => setIsLoading(false))
      : axios
          .post('/api/register', values)
          .then(() => {
            signIn('credentials', { ...values, redirect: false }).then(
              onSuccess
            );
          })
          .catch(() => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false));
  };

  const onSocialClick = (social: 'github' | 'google') => {
    setIsLoading(true);
    signIn(social, { redirect: false })
      .then((callback) => {
        callback?.error && toast.error('Invalid credentials!');
        callback?.ok && router.push('/conversations');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='space-y-6'>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {variant === 'REGISTER' && (
          <FormItem
            label='Name'
            name='name'
            register={register}
            errors={errors}
          >
            <Input />
          </FormItem>
        )}
        <FormItem
          label='Emial'
          name='email'
          register={register}
          errors={errors}
        >
          <Input />
        </FormItem>
        <FormItem
          label='Password'
          name='password'
          register={register}
          errors={errors}
        >
          <Input type='password' />
        </FormItem>
        <Button type='primary' block disabled={isLoading}>
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-sm text-gray-500'>
            Or continue with
          </span>
        </div>
      </div>
      <div className='flex gap-2'>
        <SocialButton icon={BsGithub} onClick={() => onSocialClick('github')} />
        <SocialButton icon={BsGoogle} onClick={() => onSocialClick('google')} />
      </div>
      <div className='flex justify-center gap-2 px-2 text-sm text-gray-500'>
        <div>
          {variant === 'LOGIN'
            ? 'New to Messenger?'
            : 'Already have an account?'}
        </div>
        <div onClick={toggle} className='cursor-pointer underline'>
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
