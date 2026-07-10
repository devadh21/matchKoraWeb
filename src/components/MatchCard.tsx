'use client'

import Link from 'next/link'
import type { Match } from '@/types'

interface MatchCardProps {
  match: Match
}

const statusConfig = {
  live: { label: 'LIVE', color: 'bg-greenly', text: 'text-whitely' },
  scheduled: { label: 'Scheduled', color: 'bg-bluely', text: 'text-whitely' },
  finished: { label: 'Finished', color: 'bg-red-300', text: 'text-black' },
}

export function MatchCard({ match }: MatchCardProps) {
  const badge = statusConfig[match.status]

  return (
    <Link href={`/matches/${match.id}`}>
      <div className="bg-darklyLight rounded-xl p-4 mx-2 mb-3 hover:bg-darklyLight/80 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <div className={`${badge.color} px-3 py-1 rounded-full`}>
            <span className={`${badge.text} text-xs font-bold`}>{badge.label}</span>
          </div>
          <span className="text-whitely/60 text-xs font-medium">
            Group {match.group_code}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center"> 
            {match.team_a?.flag ? (
              <img src={match.team_a.flag} alt={`${match.team_a_code} flag`} className="w-10 h-10" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-darkly flex items-center justify-center">
                <span className="text-white font-bold text-xs">{match.team_a_code.slice(0, 2)}</span>
              </div>
            )}
            <span className="text-white font-bold text-base mt-1">
              {match.team_a_code}
            </span>
          </div>

          <div className="flex flex-col items-center mx-4">
            {match.team_a_score !== null ? (
              <span className="text-white text-2xl font-bold">
                {match.team_a_score} - {match.team_b_score}
              </span>
            ) : (
              <span className="text-whitely/50 text-lg font-bold">vs</span>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center">
            {match.team_b?.flag ? (
              <img src={match.team_b.flag} alt={`${match.team_b_code} flag`} className="w-10 h-10" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-darkly flex items-center justify-center">
                <span className="text-white font-bold text-xs">{match.team_b_code.slice(0, 2)}</span>
              </div>
            )}
            <span className="text-white font-bold text-base mt-1">
              {match.team_b_code}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-3 pt-3 border-t border-whitely/10">
          <span className="text-whitely/60 text-xs">{match.match_time.slice(0, 5)}</span>
          <span className="text-sageGreen text-xs font-bold">{match.match_date}</span>
          <span className="text-whitely/60 text-xs">{match.city}</span>
        </div>
      </div>
    </Link>
  )
}
