'use client';

import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import clsx from 'clsx';

import Avatar from '@/app/components/avatar';
import useRestMembers from '@/app/hooks/useRestMembers';
import type { ConversationType } from '@/app/types';

interface ConversationItemProps {
  conversation: ConversationType;
  selected: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selected
}) => {
  const router = useRouter();
  const params = useParams();
  const restMembers = useRestMembers(conversation);

  const onClick = () => {
    if (params?.conversationId === conversation.id) return;

    router.push(`/conversations/${conversation.id}`);
  };

  const lastMessage = conversation.messages?.[conversation.messages.length - 1];

  const lastMessageText = lastMessage?.image
    ? 'Sent an image'
    : lastMessage?.body
    ? lastMessage?.body
    : 'Started a conversation';

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100',
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
      onClick={onClick}
    >
      <Avatar avatar={restMembers.image} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='mb-1 flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-900'>
              {conversation.name || restMembers.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs font-light text-gray-400'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx('truncate text-sm text-gray-400')}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
