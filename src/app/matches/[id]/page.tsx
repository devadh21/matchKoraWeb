import { getMatchById } from '@/lib/api'
import { ScoreBoard } from '@/components/ScoreBoard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
        <Link
          href="/matches"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-whitely/80 transition-colors mb-4"
        >
          <ArrowLeft size={22} color="black" />
        </Link>

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

          {match.channels.length > 0 && (
            <div className="mt-4">
              <h2 className="text-white font-bold text-lg mb-3">
                Broadcast Channels
              </h2>
              <div className="bg-darklyLight rounded-xl p-4">
                {match.channels.map((ch) => (
                  <div key={ch.channels_code} className="pb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold py-2">
                        {ch.channels_name}
                      </span>
                      {ch.logo && (
                        <img
                          src={ch.logo}
                          alt={`${ch.channels_name} logo`}
                          className="rounded-lg object-contain"
                          style={{ width: 140, height: 60, borderRadius: 12 }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/50 font-semibold">
                        frequency:
                      </span>
                      <span className="text-white font-semibold">
                        {ch.frequency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/50 font-semibold">
                        satellite:
                      </span>
                      <span className="text-white font-semibold">
                        {ch.satellite}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
