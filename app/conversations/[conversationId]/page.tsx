import getConversationById from '@/app/_utils/getConverstionById';
import getMessages from '@/app/_utils/getMessages';
import Empty from '@/app/components/empty';
import Body from './components/body';
import Footer from './components/footer';
import Header from './components/header';

type Params = {
  conversationId: string;
};

const ConversationsId = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='h-full lg:pl-80'>
        <div className='flex h-full flex-col'>
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col lg:pl-80'>
      <Header conversation={conversation} />
      <Body messages={messages} />
      <Footer />
    </div>
  );
};

export default ConversationsId;
