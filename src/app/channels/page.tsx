import { getChannels } from '@/lib/api'
import { ChannelCard } from '@/components/ChannelCard'

export const revalidate = 1800

export default async function ChannelsPage() {
  const channels = await getChannels()

  return (
    <div className="min-h-screen bg-darkly">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-8">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-white text-2xl font-bold">Channels</h1>
        </div>
        <div className="flex flex-col gap-0">
          {channels.map((channel) => (
            <ChannelCard key={channel.channels_code} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  )
}
