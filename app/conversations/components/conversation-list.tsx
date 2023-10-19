'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';

import ConversationItem from './conversation-item';
import useConversation from '@/app/hooks/useConversation';
import type { Conversation, User } from '@prisma/client';
import type { ConversationType } from '@/app/types';

interface ConversationListProps {
  conversations: ConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations: initialConversations,
  users
}) => {
  const [conversations, setConversations] = useState(initialConversations);

  const [isOpen, conversationId] = useConversation();

  return (
    <aside
      className={clsx(
        'overfloe-y-auto fixed inset-y-0 left-0 w-full border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0',
        isOpen && 'hidden'
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between py-4'>
          <h3 className='text-2xl font-bold text-neutral-800'>Message</h3>
          <div className='cursor-pointer rounded-xl bg-gray-100 p-2 text-gray-600 hover:opacity-75'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {conversations?.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            selected={conversation.id === conversationId}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
