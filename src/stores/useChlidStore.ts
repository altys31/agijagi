import { create } from 'zustand';

interface State {
  childId: number;
}

interface Action {
  updateChildId: (childId: State['childId']) => void;
}

const useChildStore = create<State & Action>((set) => ({
  childId: 0,
  updateChildId: (childId) => set(() => ({ childId })),
}));

export default useChildStore;
