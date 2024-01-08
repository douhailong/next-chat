import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  const conversation: [boolean, string] = useMemo(() => {
    const conversationId = (params?.conversationId || '') as string;
    const isOpen = Boolean(conversationId);

    return [isOpen, conversationId];
  }, [params?.conversationId]);

  return conversation;
};

export default useConversation;
