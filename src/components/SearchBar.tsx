'use client'

import { useFilterStore } from '@/store/filterStore'

export function SearchBar() {
  const searchQuery = useFilterStore((s) => s.searchQuery)
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery)

  return (
    <input
      className="bg-darklyLight rounded-xl px-4 py-3 text-white w-full placeholder:text-whitely/60 focus:outline-none focus:ring-2 focus:ring-greenly"
      placeholder="Search teams..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}
