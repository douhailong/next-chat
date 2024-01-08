'use client';

import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';

import useConversation from '@/app/hooks/useConversation';

const Body = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FieldValues>({ defaultValues: { message: '' } });
  const [_, conversationId] = useConversation();

  const inputId = 'message';

  const onUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setValue(inputId, '', { shouldValidate: true });
    axios.post('/api/messages', { message: values.message, conversationId });
  };

  return (
    <div className='flex items-center gap-2 border-t bg-white p-4 lg:gap-4'>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={onUpload}
        uploadPreset='dmz5aqf7'
      >
        <HiPhoto size={30} className='text-sky-500' />
      </CldUploadButton>
      <form
        className='flex w-full items-center gap-2 lg:gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full'>
          <input
            id={inputId}
            autoComplete={inputId}
            type='text'
            {...register(inputId, { required: true })}
            placeholder='Write a message'
            className='w-full rounded-md bg-neutral-100 px-4 py-2 font-medium text-gray-800 placeholder:font-medium placeholder:text-gray-400 focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600'
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Body;
