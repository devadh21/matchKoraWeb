import { getMatchById } from '@/lib/api'
import { ScoreBoard } from '@/components/ScoreBoard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params
  const match = await getMatchById(Number(id))
  if (!match) notFound()

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 py-6"> 

        <div className="p-6">
          <ScoreBoard
            teamACode={match.team_a_code}
            teamAFlag={match.team_a?.flag}
            teamBCode={match.team_b_code}
            teamBFlag={match.team_b?.flag}
            teamAScore={match.team_a_score}
            teamAScorers={match.team_a_scorers}
            teamBScore={match.team_b_score}
            teamBScorers={match.team_b_scorers}
            status={match.status}
          />

          <div className="mt-8 bg-darklyLight rounded-xl p-4">
            <DetailRow label="Stadium" value={match.stadium || 'TBD'} />
            <DetailRow label="City" value={match.city} />
            <DetailRow label="Group" value={`Group ${match.group_code}`} />
            <DetailRow label="Date" value={match.match_date} />
            <DetailRow label="Time" value={match.match_time.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-whitely/60 text-sm">{label}</span>
      <span className="text-white text-sm font-semibold">{value}</span>
    </div>
  )
}
