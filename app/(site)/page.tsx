import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className='flex min-h-full flex-col justify-center bg-gray-100 pt-12 sm:px-6 lg:px-8'>
      <div className='w-full space-y-6 sm:m-auto sm:max-w-md'>
        {/* <Image alt='app-logo' width='48' height='48' src='/images/logo.png' className='m-auto' />
        <h2 className='text-center text-3xl font-bold tracking-tighter text-gray-900'>
          Sign in to your account
        </h2> */}
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
