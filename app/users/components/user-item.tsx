'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Avatar from '@/app/components/avatar';
import Loading from '@/app/components/loading';
import useActiveMembers from '@/app/hooks/useMembers';
import { conversationsRequest } from '@/app/services';
import type { User } from '@prisma/client';

type UserItemProps = {
  user: User;
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const router = useRouter();
  const { members } = useActiveMembers();

  const isActive = members.includes(user.id);

  const selectMutation = useMutation({
    mutationFn: (data: { userId: string }) => conversationsRequest(data),
    onSuccess(response) {
      router.push(`/conversations/${response.data.id}`);
    }
  });

  return (
    <>
      {selectMutation.isPending && <Loading />}
      <div
        className='flex cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 hover:bg-neutral-100'
        onClick={() => selectMutation.mutate({ userId: user.id })}
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
    </>
  );
};

export default UserItem;
