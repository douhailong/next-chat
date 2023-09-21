import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import { IconType } from 'react-icons';

export interface Routes {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

export default function useRoutes(): Routes[] {
  const pathname = usePathname();

  const routes: Routes[] = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: true
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: false
      },
      {
        label: 'Logout',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut()
      }
    ],
    [pathname]
  );

  return routes;
}
