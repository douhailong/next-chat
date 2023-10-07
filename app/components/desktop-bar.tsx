'use client';

import clsx from 'clsx';
import Link from 'next/link';

import Avatar from '@/app/components/avatar';
import useRoutes from '@/app/hooks/useRoutes';
import type { Routes } from '@/app/hooks/useRoutes';

interface DesktopItemProps extends Routes {}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active
}) => {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={clsx(
          'flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-gray-900',
          active && 'bg-gray-100 text-gray-900'
        )}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

const DesktopBar = () => {
  const routes = useRoutes();

  return (
    <div className='fixed inset-y-0 left-0 flex w-20 flex-col justify-between overflow-y-auto border-r-[1px] bg-white py-4 max-lg:hidden'>
      <nav>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              label={item.label}
              href={item.href}
              onClick={item?.onClick}
              active={item?.active}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
      <nav>
        <div className='flex items-center justify-center'>
          <Avatar active />
        </div>
      </nav>
    </div>
  );
};

export default DesktopBar;
