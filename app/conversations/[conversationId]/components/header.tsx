'use client';

import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import Avatar from '@/app/components/avatar';
import useRestMembers from '@/app/hooks/useRestMembers';
import type { Conversation, User } from '@prisma/client';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const restMembers = useRestMembers(conversation);

  return (
    <div className='flex items-center justify-between border-b px-4 py-3 shadow-sm lg:px-6'>
      <div className='flex items-center gap-3'>
        <Link
          href='/conversations'
          className='block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden'
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar active />
        <div className='flex flex-col'>
          <div>{conversation.name || restMembers.name}</div>
          <div>active</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className='cursor-pointer text-sky-500 transition hover:text-sky-600'
      />
    </div>
  );
};

export default Header;
