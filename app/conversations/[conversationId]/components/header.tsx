'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import Avatar from '@/app/components/avatar';
import ProfileDrawer from './profile-drawer';
import useRestMembers from '@/app/hooks/useRestMembers';
import type { Conversation, User } from '@prisma/client';
import useActiveMembers from '@/app/hooks/useMembers';

type HeaderProps = {
  conversation: Conversation & {
    users: User[];
  };
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { members } = useActiveMembers();
  const restMembers = useRestMembers(conversation);

  const isActive = members.includes(restMembers.id);

  const statusText = conversation.isGroup
    ? `${conversation.users.length} members`
    : isActive
    ? 'Active'
    : 'Offline';

  const avatars: string[] = useMemo(() => {
    return conversation.users?.map?.((user) => user.image || '').slice(0, 3);
  }, [conversation.users]);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className='flex items-center justify-between border-b px-4 py-3 shadow-sm lg:px-6'>
        <div className='flex items-center gap-3'>
          <Link
            href='/conversations'
            className='block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <Avatar.Group avatars={avatars} />
          ) : (
            <Avatar avatar={restMembers.image} />
          )}
          <div className='flex flex-col'>
            <div>{conversation.name || restMembers.name}</div>
            <div className='text-sm font-light text-neutral-500'>{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setIsOpen(true)}
          size={32}
          className='cursor-pointer text-sky-500 transition hover:text-sky-600'
        />
      </div>
    </>
  );
};

export default Header;
