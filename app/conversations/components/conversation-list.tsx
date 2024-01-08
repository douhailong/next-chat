'use client';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

import { Modal } from '@/app/components/modal';
import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import type { ConversationType } from '@/app/types';
import type { User } from '@prisma/client';
import ConversationItem from './conversation-item';

type ConversationListProps = {
  conversations: ConversationType[];
  users: User[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations: initialConversations,
  users
}) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const session = useSession();
  const [open, conversationId] = useConversation();

  const pusherKey = session.data?.user?.email;

  useEffect(() => {
    if (!pusherKey) return;

    function createCallback(conversation: ConversationType) {
      setConversations([conversation, ...conversations]);
    }

    function removeCallback(conversation: ConversationType) {
      setConversations([
        ...conversations.filter((item) => item.id !== conversation.id)
      ]);
    }

    function updateCallback(conversation: ConversationType) {
      setConversations([
        ...conversations.map((item) =>
          item.id === conversation.id ? conversation : item
        )
      ]);
    }

    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:create', createCallback);
    pusherClient.bind('conversation:update', updateCallback);
    pusherClient.bind('conversation:remove', removeCallback);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:create');
      pusherClient.unbind('conversation:update');
      pusherClient.unbind('conversation:remove');
    };
  }, [pusherKey, router]);

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
      <aside
        className={clsx(
          'overfloe-y-auto fixed inset-y-0 left-0 w-full border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0',
          open && 'hidden'
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between py-4'>
            <h3 className='text-2xl font-bold text-neutral-800'>Message</h3>
            <div
              className='cursor-pointer rounded-xl bg-gray-100 p-2 text-gray-600 hover:opacity-75'
              onClick={() => setIsOpen(true)}
            >
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
    </>
  );
};

export default ConversationList;
