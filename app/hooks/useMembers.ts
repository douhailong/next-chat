import { create } from 'zustand';

type ActiveMembers = {
  members: string[];
  add: (memberId: string) => void;
  remove: (memberId: string) => void;
  set: (memberIds: string[]) => void;
};

const useActiveMembers = create<ActiveMembers>((set) => ({
  members: [],
  add: (memberId) => set((store) => ({ members: [...store.members, memberId] })),
  remove: (memberId) =>
    set((store) => ({
      members: store.members.filter((id) => id !== memberId)
    })),
  set: (memberIds) => set(() => ({ members: memberIds }))
}));

export default useActiveMembers;
