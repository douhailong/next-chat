'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Avatar from '@/app/components/avatar';
import useActiveMembers from '@/app/hooks/useMembers';
import type { User } from '@prisma/client';

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const { members } = useActiveMembers();

  const isActive = members.includes(user.id);

  const onClick = () => {
    setIsloading(true);
    axios
      .post('/api/conversations', { userId: user.id })
      .then((res) => router.push(`/conversations/${res.data.id}`))
      .finally(() => setIsloading(false));
  };

  return (
    <div
      className='flex cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 hover:bg-neutral-100'
      onClick={onClick}
    >
      <Avatar avatar={user.image} active={isActive} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='mb-1 flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-900'>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
