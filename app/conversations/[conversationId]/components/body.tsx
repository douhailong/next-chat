'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import MessageBox from './message-box';
import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import type { MessageType } from '@/app/types';

interface BodyProps {
  messages: MessageType[];
}

const Body: React.FC<BodyProps> = ({ messages: initMessages }) => {
  const [messages, setMessages] = useState(initMessages);

  const [, conversationId] = useConversation();

  // useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`);
  // }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    function createCallback(message: MessageType) {
      setMessages([...messages, message]);
    }
    function updateCallback(message: MessageType) {
      setMessages([
        ...messages.map((item) => (item.id === message.id ? message : item))
      ]);
    }

    pusherClient.bind('messages:create', createCallback);
    pusherClient.bind('messages:update', updateCallback);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:create');
      pusherClient.unbind('messages:update');
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Body;
