import { getMatches } from '@/lib/api'
import { MatchCard } from '@/components/MatchCard'
import { FixturesClient } from './FixturesClient'

export const revalidate = 60

export default async function FixturesPage() {
  const matches = await getMatches()

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-white text-2xl font-bold">Fixtures</h1>
        </div>
        <FixturesClient matches={matches} />
      </div>
    </div>
  )
}
