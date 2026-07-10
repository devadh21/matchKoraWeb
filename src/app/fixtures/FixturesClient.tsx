'use client'

import { useFilterStore } from '@/store/filterStore'
import { GroupFilter } from '@/components/GroupFilter'
import { MatchCard } from '@/components/MatchCard'
import type { Match } from '@/types'

interface FixturesClientProps {
  matches: Match[]
}

export function FixturesClient({ matches }: FixturesClientProps) {
  const groupFilter = useFilterStore((s) => s.groupFilter)

  const filtered = groupFilter
    ? matches.filter((m) => m.group_code === groupFilter)
    : matches

  return (
    <>
      <div className="px-4 pb-3">
        <GroupFilter />
      </div>
      <div className="flex flex-col gap-0">
        {filtered.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  )
}
