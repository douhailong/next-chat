'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '@/app/components/Input';
import { toast } from 'react-hot-toast';

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

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    // console.log(values, 'values');
    // setIsLoading(true);
  };

  return (
    <div>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {/* <Input label='Email' /> */}
          <button
            onClick={() => {
              toast.error('hhhh');
              // axios.post('/api/register', {
              //   email: '111@qq.comqwq',
              //   name: 'kkkaaqk',
              //   password: '123456hgftdes'
              // });
            }}
          >
            button
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
