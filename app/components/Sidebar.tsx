import DesktopBar from '@/app/components/DesktopBar';
import MobileBar from '@/app/components/MobileBar';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <DesktopBar />
      <MobileBar />
      <main className='h-full lg:pl-20'>{children}</main>
    </div>
  );
};

export default Sidebar;
