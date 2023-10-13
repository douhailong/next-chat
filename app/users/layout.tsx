import Sidebar from '@/app/components/side-bar';
import UserList from './components/user-list';
import getUsers from '@/app/_utils/getUsers';

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList users={users} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
}
