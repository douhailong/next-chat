'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import MessageBox from './message-box';
import useConversation from '@/app/hooks/useConversation';
import type { MessageType } from '@/app/types';

interface BodyProps {
  messages: MessageType[];
}

const Body: React.FC<BodyProps> = ({ messages: initMessages }) => {
  const [messages, setMessage] = useState(initMessages);

  const [, conversationId] = useConversation();

  useEffect(() => {
    // axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Body;
