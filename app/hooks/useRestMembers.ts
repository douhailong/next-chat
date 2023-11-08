import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

import { ConversationType } from '@/app/types';

export default function useRestMembers(
  conversation: ConversationType | { users: User[] }
) {
  const session = useSession();
  const restMembers = useMemo(() => {
    const currentUser = session?.data?.user;

    return conversation.users?.filter(
      (user) => user.email !== currentUser?.email
    );
  }, [session?.data?.user?.email, conversation.users]);

  return restMembers?.[0];
}
