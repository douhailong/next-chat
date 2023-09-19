import Avatar from '@/app/components/Avatar';

const DesktopBar = () => {
  return (
    <div className='fixed inset-y-0 left-0 flex w-20 flex-col justify-between overflow-y-auto border-r-[1px] bg-white pb-4 max-lg:hidden'>
      <span>Desktop</span>
      <Avatar active />
    </div>
  );
};

export default DesktopBar;
