import Sidebar from '@/app/components/side-bar';
import UserList from './components/user-list';
import getUsers from '@/app/_utils/getUsers';

interface UsersLayout {
  children: React.ReactNode;
}

const UsersLayout: React.FC<UsersLayout> = async ({ children }) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList users={users} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
