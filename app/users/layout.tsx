import Sidebar from '@/app/components/Sidebar';

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
}
