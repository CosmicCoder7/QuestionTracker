import { create } from 'zustand';

type FilterType = {
  type: 'all' | 'status' | 'bookmarked';
  value?: string;
};

interface FilterStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: { type: 'all' },
  setFilter: (filter) => set({ filter }),
}));