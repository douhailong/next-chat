import type { User } from '@prisma/client';

interface UserItemProps {
  user?: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return <div>UserItem UserItem</div>;
};

export default UserItem;
