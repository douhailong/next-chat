import Image from 'next/image';
import { User } from 'prisma/prisma-client';

type AvatarProps = {
  avatar?: string | null;
  active?: boolean;
};

type GroupProps = {
  avatars: string[];
};

const Avatar = ({ avatar, active }: AvatarProps) => {
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

const Group: React.FC<GroupProps> = ({ avatars }) => {
  const position = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  };

  return (
    <div className='relative h-11 w-11'>
      {avatars.map((avatar, index) => (
        <div
          key={avatar}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ${
            position[index as keyof typeof position]
          }`}
        >
          <Image fill src={avatar || '/images/placeholder.jpg'} alt='Avatar' />
        </div>
      ))}
    </div>
  );
};

Avatar.Group = Group;

export default Avatar;
