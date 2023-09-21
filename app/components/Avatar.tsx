import Image from 'next/image';

interface AvatarProps {
  avatar?: string;
  active?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ avatar, active }) => {
  return (
    <div className='relative'>
      <div className='relative inline-block h-9 w-9 overflow-hidden rounded-full'>
        <Image fill alt='Avatar' src={avatar || '/images/placeholder.png'} />
      </div>
      {active && (
        <span className='absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500' />
      )}
    </div>
  );
};

export default Avatar;
