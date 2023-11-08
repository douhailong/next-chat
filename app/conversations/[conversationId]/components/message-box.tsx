'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import clsx from 'clsx';
import { format } from 'date-fns';

import Avatar from '@/app/components/avatar';
import type { MessageType } from '@/app/types';

interface MessageBoxProps {
  message: MessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  const [isOpen, setIsopen] = useState(false);

  const session = useSession();

  const isOwn = session.data?.user?.email === message.sender.email;

  return (
    <div className={clsx('flex gap-3 p-4', isOwn && 'justify-end')}>
      <div className={clsx(isOwn && 'order-2')}>
        <Avatar />
      </div>
      <div className={clsx('flex flex-col gap-2', isOwn && 'items-end')}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{message.sender.name}</div>
          <div className='text-xs text-gray-400'>
            {format(new Date(message.createdAt), 'p')}
          </div>
        </div>
        <div
          className={clsx(
            'w-fit overflow-hidden rounded-md text-sm text-gray-900',
            isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
            !message.image && 'px-3 py-2'
          )}
        >
          {message.image ? (
            <Image
              alt='image'
              src={message.image}
              width={288}
              height={288}
              unoptimized={true}
              className='translate cursor-pointer object-cover transition hover:scale-110'
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
