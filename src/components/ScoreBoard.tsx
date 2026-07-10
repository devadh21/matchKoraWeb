import { Volleyball } from 'lucide-react'

interface ScoreBoardProps {
  teamACode: string
  teamAFlag?: string | null
  teamBCode: string
  teamBFlag?: string | null
  teamAScore?: number | null
  teamBScore?: number | null
  teamAScorers?: string[] | null
  teamBScorers?: string[] | null
  status: string
}

export function ScoreBoard({
  teamACode,
  teamAFlag,
  teamBCode,
  teamBFlag,
  teamAScore,
  teamBScore,
  teamAScorers,
  teamBScorers,
  status,
}: ScoreBoardProps) {
  const isLive = status === 'live'
  const hasScore = teamAScore !== null && teamBScore !== null
  const hasScorers = teamAScorers !== null && teamBScorers !== null

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          {teamAFlag && <img src={teamAFlag} alt={`${teamACode} flag`} className="w-12 h-12" />}
          <span className="text-white text-lg font-bold">{teamACode}</span>
        </div>

        <div className="flex flex-col items-center">
          {hasScore ? (
            <span className="text-white text-5xl font-bold">
              {teamAScore} - {teamBScore}
            </span>
          ) : (
            <span className="text-whitely/50 text-2xl font-bold">VS</span>
          )}
          {isLive && (
            <div className="bg-greenly px-4 py-1 rounded-full mt-2">
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          {teamBFlag && <img src={teamBFlag} alt={`${teamBCode} flag`} className="w-12 h-12" />}
          <span className="text-white text-lg font-bold">{teamBCode}</span>
        </div>
      </div>

      {hasScorers && (
        <div className="flex items-start justify-center gap-6 mt-4">
          <div className="flex-1 flex flex-col items-center gap-1">
            {teamAScorers?.map((scorer, i) => (
              <span key={i} className="text-white text-sm flex items-center gap-1">
                <Volleyball size={14} /> {scorer}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center flex-1">
            {isLive && (
              <div className="bg-greenly px-4 py-1 rounded-full mt-2">
                <span className="text-white text-xs font-bold">LIVE</span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            {teamBScorers?.map((scorer, i) => (
              <span key={i} className="text-white text-sm flex items-center gap-1">
                <Volleyball size={14} /> {scorer}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
