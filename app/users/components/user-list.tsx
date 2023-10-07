import UserItem from "./user-item";

const UserList = () => {
  return (
    <aside className='fixed inset-y-0 left-0 w-full pb-20 lg:left-20 lg:w-80 lg:pb-0'>
      <div className='px-5'>
        <div className='py-4 text-2xl font-bold text-neutral-800'>People</div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <UserItem />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
