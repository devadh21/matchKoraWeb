'use client'

import Link from 'next/link'
import { useFilterStore } from '@/store/filterStore'
import { SearchBar } from '@/components/SearchBar'
import type { Team } from '@/types'

interface TeamsListProps {
  teams: Team[]
}

export function TeamsList({ teams }: TeamsListProps) {
  const searchQuery = useFilterStore((s) => s.searchQuery)

  const filtered = teams.filter(
    (t) =>
      t.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.team_code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <div className="px-4 pb-3">
        <SearchBar />
      </div>
      <div className="flex flex-col gap-0">
        {filtered.map((team) => (
          <Link key={team.team_code} href={`/teams/${team.team_code}`}>
            <div className="bg-darklyLight rounded-xl p-4 mx-2 mb-3 flex justify-between items-center hover:bg-darklyLight/80 transition-colors">
              <div>
                <span className="text-white font-bold text-lg block">
                  {team.team_name}
                </span>
                <span className="text-whitely/60 text-sm">{team.team_code}</span>
              </div>
              {team.flag ? (
                <img
                  src={team.flag}
                  alt={`${team.team_name} flag`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-darkly flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {team.team_code.slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
