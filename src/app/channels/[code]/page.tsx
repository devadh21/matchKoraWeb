import { getChannels, getChannelMatches } from '@/lib/api'
import { MatchCard } from '@/components/MatchCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ code: string }>
}

export default async function ChannelDetailPage({ params }: Props) {
  const { code } = await params
  const [channels, matches] = await Promise.all([
    getChannels(),
    getChannelMatches(code),
  ])
  const channel = channels.find((c) => c.channels_code === code)

  if (!channel) notFound()

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 py-6">

        <div className="flex justify-between items-center bg-darklyLight rounded-xl p-4 mb-4">
          <div>
            <h1 className="text-white text-2xl font-bold">
              {channel.channels_name}
            </h1>
            <span className="text-whitely/60 text-sm">{code}</span>
          </div>
          {channel.logo && (
            <img
              src={channel.logo}
              alt={`${channel.channels_name} logo`}
              className="rounded-lg object-contain"
              style={{ width: 140, height: 60, borderRadius: 12 }}
            />
          )}
        </div>

        <h2 className="text-white font-bold text-lg mb-2">Matches</h2>
        <div className="flex flex-col gap-0">
          {matches.length > 0 ? (
            matches.map((m) => <MatchCard key={m.id} match={m} />)
          ) : (
            <p className="text-whitely/60 text-center mt-8">
              No matches found for this channel
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
