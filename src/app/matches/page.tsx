import { getMatches } from '@/lib/api'
import { MatchCard } from '@/components/MatchCard'
import { Trophy } from 'lucide-react'
import type { Match } from '@/types'

export const revalidate = 60

function groupByDate(matches: Match[]) {
  const map = new Map<string, Match[]>()
  for (const match of matches) {
    const existing = map.get(match.match_date) || []
    existing.push(match)
    map.set(match.match_date, existing)
  }
  return Array.from(map.entries()).map(([date, data]) => ({
    title: date,
    data,
  }))
}

export default async function MatchesPage() {
  const matches = await getMatches()
  const sections = groupByDate(matches)

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-white text-2xl font-bold">Matches</h1>
          <p className="text-whitely/60 text-sm mt-1 flex items-center gap-1">
            FIFA World Cup 2026 <Trophy size={16} />
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <div className="px-4 py-2">
              <span className="text-whitely/80 text-sm font-semibold uppercase">
                {section.title}
              </span>
            </div>
            {section.data.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
