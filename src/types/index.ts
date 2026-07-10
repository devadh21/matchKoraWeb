export interface Team {
  id: number
  team_code: string
  team_name: string
  flag: string | null
}

export interface Match {
  id: number
  match_date: string
  match_time: string
  group_code: string
  city: string
  team_a_code: string
  team_b_code: string
  team_a_score: number | null
  team_b_score: number | null
  team_a_scorers: string[] | null
  team_b_scorers: string[] | null
  stadium: string | null
  status: 'scheduled' | 'live' | 'finished'
  team_a?: Team
  team_b?: Team
}

export interface Channel {
  id: number
  channels_code: string
  channels_name: string
  logo: string | null
  frequency: string | null
  satellite: string | null
}

export interface MatchChannel {
  id: number
  match_id: number
  channel_code: string
}

export interface MatchWithChannels extends Match {
  channels: Channel[]
}
