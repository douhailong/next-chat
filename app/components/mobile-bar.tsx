'use client';

import Link from 'next/link';
import clsx from 'clsx';

import useRoutes from '@/app/hooks/useRoutes';
import type { Routes } from '@/app/hooks/useRoutes';
import useConversation from '@/app/hooks/useConversation';

type MobileItemProps = Routes 

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active
}) => {
  const [isOpen] = useConversation();

  if (isOpen) return null;

  return (
    <li
      onClick={onClick}
      className={clsx(
        'flex-1 text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900',
        active && 'bg-gray-100 text-gray-900'
      )}
    >
      <Link href={href} className='block p-4'>
        <Icon className='mx-auto h-6 w-6' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

const MobileBar = () => {
  const routes = useRoutes();

  return (
    <div className='fixed bottom-0 z-40 w-full border-t bg-white lg:hidden'>
      <ul role='list' className='flex'>
        {routes.map((item) => (
          <MobileItem
            key={item.label}
            label={item.label}
            href={item.href}
            onClick={item?.onClick}
            active={item?.active}
            icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default MobileBar;
