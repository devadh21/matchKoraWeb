import type { Team } from '@/types'

interface TeamBadgeProps {
  team: Team
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { flag: 'w-6 h-6', text: 'text-xs' },
  md: { flag: 'w-8 h-8', text: 'text-sm' },
  lg: { flag: 'w-12 h-12', text: 'text-lg' },
}

export function TeamBadge({ team, size = 'md' }: TeamBadgeProps) {
  const s = sizeMap[size]

  return (
    <div className="flex items-center gap-2">
      {team.flag ? (
        <img
          src={team.flag}
          alt={`${team.team_name} flag`}
          className={`${s.flag} rounded-full object-cover`}
        />
      ) : (
        <div className={`${s.flag} rounded-full bg-darkly flex items-center justify-center`}>
          <span className="text-white font-bold text-xs">
            {team.team_code.slice(0, 2)}
          </span>
        </div>
      )}
      <span className={`text-white font-semibold ${s.text}`}>
        {team.team_name}
      </span>
    </div>
  )
}
