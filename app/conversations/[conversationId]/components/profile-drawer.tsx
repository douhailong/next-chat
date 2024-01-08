import Avatar from '@/app/components/avatar';
import { ConfirmModal } from '@/app/components/modal';
import useRestMembers from '@/app/hooks/useRestMembers';
import { Dialog, Transition } from '@headlessui/react';
import { Conversation, User } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';

type ProfileDrawerProps = {
  onClose: () => void;
  open: boolean;
  conversation: Conversation & { users: User[] };
};

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, conversation, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const resetMembers = useRestMembers(conversation);

  const isGroup = conversation.isGroup;

  function onDelete() {
    console.log(conversation.id, ',,,,,,,,');
    axios
      .delete(`/api/conversations/${conversation.id}`)
      .then((res) => {
        console.log(res, '000000000000');
        router.push('/conversations');
      })
      .catch((err) => {});
  }

  return (
    <>
      <ConfirmModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOk={() => onDelete()}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black opacity-40' />
          </Transition.Child>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-auto bg-white shadow-md'>
                    <div className='p-6 max-sm:px-4'>
                      <div className='flex justify-end'>
                        <button
                          className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                          onClick={onClose}
                        >
                          <IoClose size={24} />
                        </button>
                      </div>
                    </div>
                    <div className='flex-1 px-6 pb-6 max-sm:px-4'>
                      <div className='flex flex-col items-center'>
                        <div className='mb-2'>
                          {isGroup ? (
                            <Avatar.Group
                              avatars={conversation.users
                                .map((user) => user.image || '')
                                .slice(0, 3)}
                            />
                          ) : (
                            <Avatar avatar={resetMembers.image} />
                          )}
                        </div>
                        <div>{isGroup ? conversation.name : resetMembers.name}</div>
                        <div className='text-sm text-gray-500'>{'Active'}</div>
                        <div
                          className='my-8 flex cursor-pointer flex-col items-center justify-center gap-3 hover:opacity-75'
                          onClick={() => setIsOpen(true)}
                        >
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600'>
                            <IoTrash size={20} />
                          </div>
                          <div className='text-sm text-neutral-600'>Delete</div>
                        </div>
                        <div className='w-full'>
                          <div className='text-sm font-medium text-gray-500'>
                            {isGroup ? 'Emails' : 'Email'}
                          </div>
                          <div className='text-sm text-gray-600'>
                            {isGroup
                              ? conversation.users.map((user) => user.email).join(', ')
                              : resetMembers.email}
                          </div>
                          <hr className='my-4' />
                          <div className='text-sm font-medium text-gray-500'>
                            Joined on
                          </div>
                          <div className='text-sm text-gray-600'>
                            {format(
                              new Date(
                                isGroup ? conversation.createdAt : resetMembers.createdAt
                              ),
                              'PP'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
