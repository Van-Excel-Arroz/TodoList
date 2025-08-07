import { create } from 'zustand';

interface UserIdContextState {
	userId: number | null;
	setUserId: (id: number) => void;
}

const useUserIdStore = create<UserIdContextState>()((set: any) => ({
	userId: null,
	setUserId: (id: number) => set({ userId: id }),
}));

export default useUserIdStore;
