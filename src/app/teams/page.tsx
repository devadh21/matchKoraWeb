import { getTeams } from '@/lib/api'
import { TeamsList } from './TeamsList'

export const revalidate = 1800

export default async function TeamsPage() {
  const teams = await getTeams()

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-white text-2xl font-bold">Teams</h1>
        </div>
        <TeamsList teams={teams} />
      </div>
    </div>
  )
}
