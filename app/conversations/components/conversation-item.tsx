'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import Avatar from '@/app/components/avatar';
import useActiveMembers from '@/app/hooks/useMembers';
import useRestMembers from '@/app/hooks/useRestMembers';
import type { ConversationType } from '@/app/types';

type ConversationItemProps = {
  conversation: ConversationType;
  selected: boolean;
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selected
}) => {
  const router = useRouter();
  const params = useParams();
  const restMembers = useRestMembers(conversation);
  const { members } = useActiveMembers();

  const onClick = () => {
    if (params?.conversationId === conversation.id) return;
    router.push(`/conversations/${conversation.id}`);
  };

  const avatars: string[] = useMemo(() => {
    return conversation.users?.map?.((user) => user.image || '').slice(0, 3);
  }, [conversation.users]);

  const isActive = members.includes(restMembers?.id);
  const lastMessage = conversation.messages?.[conversation.messages.length - 1];
  const lastMessageText = lastMessage?.image
    ? 'Sent an image'
    : lastMessage?.body || 'Started a conversation';

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100',
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
      onClick={onClick}
    >
      {conversation.isGroup ? (
        <Avatar.Group avatars={avatars} />
      ) : (
        <Avatar avatar={restMembers?.image} active={isActive} />
      )}

      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='mb-1 flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-900'>
              {conversation?.name || restMembers?.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs font-light text-gray-400'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx('truncate text-sm text-gray-400')}>{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
