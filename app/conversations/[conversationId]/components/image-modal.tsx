import Image from 'next/image';
import Modal from '@/app/components/modal';

type ImageModalProps = {
  src: string;
  open?: boolean;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ src, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='h-80 w-80'>
        <Image className='object-cover' fill alt='Image' src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
