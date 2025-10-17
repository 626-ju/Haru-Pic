import { createStore } from 'zustand/vanilla'; //아오 리액트가 필요하네 바닐라 빼려면

export const useKebabStore = createStore((set) => ({
  store: {}, //store:{[id]:{isOpen}}

  open: (id) =>
    set((state) => ({
      store: {
        ...state.store,
        [id]: { isOpen: true },
      },
    })),

  close: (id) =>
    set((state) => ({
      store: {
        ...state.store,
        [id]: { isOpen: false },
      },
    })),

  allClose: () => {
    set((state) => {
      const newStore = {}; //주스탄드 불변성 때문에 새로운 배열 리턴해야 함
      Object.keys(state.store).forEach((id) => {
        newStore[id] = { isOpen: false };
      });
      return { store: newStore };
    });
  },
}));
