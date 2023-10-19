import DesktopBar from '@/app/components/desktop-bar';
import MobileBar from '@/app/components/mobile-bar';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className='h-full'>
      <DesktopBar />
      <MobileBar />
      <main className='h-full lg:pl-20'>{children}</main>
    </div>
  );
};

export default Sidebar;
