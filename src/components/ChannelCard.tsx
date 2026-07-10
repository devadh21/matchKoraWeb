import Link from 'next/link'
import type { Channel } from '@/types'

interface ChannelCardProps {
  channel: Channel
}

export function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Link href={`/channels/${channel.channels_code}`}>
      <div className="bg-darklyLight rounded-xl p-4 mx-2 mb-3 flex items-center hover:bg-darklyLight/80 transition-colors">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={`${channel.channels_name} logo`}
            className="w-10 h-10 rounded-lg object-contain"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-darkly flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {channel.channels_name.charAt(0)}
            </span>
          </div>
        )}
        <div className="ml-3 flex-1">
          <span className="text-white font-semibold text-base">
            {channel.channels_name}
          </span>
          <span className="text-whitely/60 text-xs block">
            {channel.channels_code}
          </span>
        </div>
      </div>
    </Link>
  )
}
