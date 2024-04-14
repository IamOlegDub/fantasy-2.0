import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserState {
    isSignedIn: boolean;
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    isSignedIn: false,
    user: null,
    setUser: (user: User) => set({ isSignedIn: true, user }),
    removeUser: () => set({ isSignedIn: false, user: null }),
}));

export default useUserStore;
