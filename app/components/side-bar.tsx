import DesktopBar from '@/app/components/desktop-bar';
import MobileBar from '@/app/components/mobile-bar';

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
