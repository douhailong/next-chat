import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';

interface Params {
  conversationId: string;
}

const ConversationsId = ({ params }: { params: Params }) => {
  return (
    <div className='flex h-full flex-col lg:pl-80'>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default ConversationsId;
