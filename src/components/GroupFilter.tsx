'use client'

import { useFilterStore } from '@/store/filterStore'

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', '32 Round', '16 Round', '8 Round', '1/2 Final', '3 place', 'Final']

export function GroupFilter() {
  const groupFilter = useFilterStore((s) => s.groupFilter)
  const setGroupFilter = useFilterStore((s) => s.setGroupFilter)

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {GROUPS.map((group) => {
        const active = groupFilter === group
        return (
          <button
            key={group}
            onClick={() => setGroupFilter(active ? null : group)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              active ? 'bg-greenly text-darkly' : 'bg-darklyLight text-whitely'
            }`}
          >
            <span className="text-sm font-semibold">Group {group}</span>
          </button>
        )
      })}
    </div>
  )
}
