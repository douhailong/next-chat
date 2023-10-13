import { User } from '@prisma/client';
import UserItem from './user-item';

interface UserListProps {
  users: User[] | null;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside className='overfloe-y-auto fixed inset-y-0 left-0 w-full border-r border-gray-200 pb-20 lg:left-20 lg:w-80 lg:pb-0'>
      <div className='px-5'>
        <h3 className='py-4 text-2xl font-bold text-neutral-800'>People</h3>
        {users?.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    </aside>
  );
};

export default UserList;
