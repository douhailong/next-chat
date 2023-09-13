import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className='flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8'>
      <div className='sm:m-auto sm:w-full sm:max-w-md'>
        <Image
          alt='logo'
          width='48'
          height='48'
          className='mx-auto w-auto'
          src='/images/logo.png'
        />
        <h2 className='my-6 text-center text-3xl font-bold tracking-tighter text-gray-900'>
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
