'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import Avatar from '@/app/components/avatar';
import { Modal } from '@/app/components/modal';
import useRoutes, { Routes } from '@/app/hooks/useRoutes';

type DesktopItemProps = Routes;

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
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
      <div className='fixed inset-y-0 left-0 flex w-20 flex-col justify-between overflow-y-auto border-r bg-white py-4 max-lg:hidden'>
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
          <div
            className='flex items-center justify-center cursor-pointer hover:opacity-75'
            onClick={() => setIsOpen(true)}
          >
            <Avatar active />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopBar;
