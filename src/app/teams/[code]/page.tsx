import { getTeams, getTeamMatches } from '@/lib/api'
import { MatchCard } from '@/components/MatchCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Match } from '@/types'

interface Props {
  params: Promise<{ code: string }>
}

export default async function TeamDetailPage({ params }: Props) {
  const { code } = await params
  const [teams, matches] = await Promise.all([getTeams(), getTeamMatches(code)])
  const team = teams.find((t) => t.team_code === code)

  if (!team) notFound()

  const now = new Date()
  const upcoming: Match[] = []
  const past: Match[] = []
  for (const m of matches) {
    const matchDate = new Date(`${m.match_date}T${m.match_time}`)
    if (matchDate >= now && m.status !== 'finished') {
      upcoming.push(m)
    } else {
      past.push(m)
    }
  }

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link
          href="/teams"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-whitely/80 transition-colors mb-4"
        >
          <ArrowLeft size={22} color="black" />
        </Link>

        <div className="bg-darklyLight rounded-xl p-4 mb-4 flex flex-col items-center justify-center">
          {team.flag && (
            <img
              src={team.flag}
              alt={`${team.team_name} flag`}
              className="w-10 h-10 object-contain"
            />
          )}
          <h1 className="text-white text-2xl font-bold">{team.team_name}</h1>
          <span className="text-whitely/60 text-sm">{code}</span>
        </div>

        {upcoming.length > 0 && (
          <h2 className="text-white font-bold text-lg mb-2">Upcoming Matches</h2>
        )}
        <div className="flex flex-col gap-0">
          {upcoming.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>

        {past.length > 0 && (
          <h2 className="text-white font-bold text-lg mb-2 mt-4">Past Matches</h2>
        )}
        <div className="flex flex-col gap-0">
          {past.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
