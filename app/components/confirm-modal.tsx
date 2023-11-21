import { Dialog } from '@headlessui/react';
import Modal from './modal';
import Button from './button';
import { FiAlertTriangle } from 'react-icons/fi';

type ConfirmModalProps = {
  open?: boolean;
  onClose: () => void;
  onOk?: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onOk }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className='h-6 w-6 text-red-600' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete this conversation? This action cannot be
              undone.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 flex justify-end gap-x-1 sm:mt-4'>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='danger' onClick={onOk}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
