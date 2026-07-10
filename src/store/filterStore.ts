import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  groupFilter: string | null
  selectedDate: string | null
  setSearchQuery: (query: string) => void
  setGroupFilter: (group: string | null) => void
  setSelectedDate: (date: string | null) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  groupFilter: null,
  selectedDate: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setGroupFilter: (group) => set({ groupFilter: group }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  resetFilters: () => set({ searchQuery: '', groupFilter: null, selectedDate: null }),
}))
