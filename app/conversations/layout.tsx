import Sidebar from '@/app/components/side-bar';

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
