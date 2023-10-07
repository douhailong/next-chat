import type { User } from '@prisma/client';

import Avatar from '@/app/components/avatar';

interface UserItemProps {
  user?: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className='flex cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 hover:bg-neutral-100'>
      <Avatar active />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <span className='absolute inset-0' aria-hidden='true' />
          <div className='mb-1 flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-900'>{'data.name'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
