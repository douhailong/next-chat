import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import { IconType } from 'react-icons';
import useConversation from './useConversation';

export interface Routes {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

export default function useRoutes(): Routes[] {
  const pathname = usePathname();
  const [isOpen, conversationId] = useConversation();

  const routes: Routes[] = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || Boolean(conversationId)
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users'
      },
      {
        label: 'SignOut',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut()
      }
    ],
    [pathname]
  );

  return routes;
}
