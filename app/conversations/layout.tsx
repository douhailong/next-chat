import getConversations from '@/app/_utils/getConversations';
import getUsers from '@/app/_utils/getUsers';
import Sidebar from '@/app/components/side-bar';
import ConversationList from './components/conversation-list';

type ConversationsLayoutProps = {
  children: React.ReactNode;
};

const ConversationsLayout: React.FC<ConversationsLayoutProps> = async ({ children }) => {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <Sidebar>
      <ConversationList users={users} conversations={conversations} />
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default ConversationsLayout;
