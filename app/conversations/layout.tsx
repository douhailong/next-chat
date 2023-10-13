import Sidebar from '@/app/components/side-bar';
import ConversationList from './components/conversation-list';
import getUsers from '@/app/_utils/getUsers';
import getConversations from '@/app/_utils/getConversations';

const ConversationsLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
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
