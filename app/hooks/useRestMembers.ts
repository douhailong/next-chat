import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { ConversationType } from '@/app/types';
import type { User } from '@prisma/client';

const useRestMembers = (conversation: ConversationType | { users: User[] }) => {
  const session = useSession();
  const restMembers = useMemo(() => {
    const currentUser = session?.data?.user;

    return conversation.users?.filter((user) => user.email !== currentUser?.email);
  }, [session?.data?.user?.email, conversation.users]);

  return restMembers?.[0];
};

export default useRestMembers;
