import Sidebar from '@/app/components/side-bar';
import UserList from './components/user-list';

export default function UsersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <UserList />
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
}
