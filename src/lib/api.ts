import { createBrowserClient, createServerClient, isConfigured } from './supabase'
import type { Match, Team, Channel, MatchWithChannels } from '@/types'
import type { Team as WorldCupTeam } from '@/types/worldCupTypes'

async function enrichWithTeams(matches: Match[]): Promise<Match[]> {
  if (matches.length === 0) return []

  const supabase = createServerClient()
  const codes = new Set<string>()
  for (const m of matches) {
    codes.add(m.team_a_code)
    codes.add(m.team_b_code)
  }

  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .in('team_code', [...codes])

  const teamMap = new Map((teams as Team[] | null)?.map((t) => [t.team_code, t]))

  return matches.map((m) => ({
    ...m,
    team_a: teamMap.get(m.team_a_code),
    team_b: teamMap.get(m.team_b_code),
  }))
}

export async function getMatches(): Promise<Match[]> {
  if (!isConfigured()) return []
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true })

  if (error) throw error
  return enrichWithTeams(data as Match[])
}

export async function getMatchById(id: number): Promise<MatchWithChannels> {
  if (!isConfigured()) throw new Error('Supabase not configured')
  const supabase = createServerClient()
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('*')
    .eq('id', id)
    .single()

  if (matchError) throw matchError

  const [matchWithTeams] = await enrichWithTeams([match as Match])

  const { data: matchChannels } = await supabase
    .from('match_channels')
    .select('channel_code')
    .eq('match_id', id)

  let channels: Channel[] = []
  if (matchChannels && matchChannels.length > 0) {
    const codes = matchChannels.map((c) => c.channel_code)
    const { data: chs } = await supabase
      .from('channels')
      .select('*')
      .in('channels_code', codes)
    channels = (chs as Channel[]) || []
  }

  return { ...(matchWithTeams as Match), channels }
}

export async function getTeams(): Promise<Team[]> {
  if (!isConfigured()) return []
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('team_name', { ascending: true })

  if (error) throw error
  return data as Team[]
}

export async function getTeamMatches(teamCode: string): Promise<Match[]> {
  if (!isConfigured()) return []
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .or(`team_a_code.eq.${teamCode},team_b_code.eq.${teamCode}`)
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true })

  if (error) throw error
  return enrichWithTeams(data as Match[])
}

export async function getChannels(): Promise<Channel[]> {
  if (!isConfigured()) return []
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .order('channels_name', { ascending: true })

  if (error) throw error
  return data as Channel[]
}

export async function getChannelMatches(channelCode: string): Promise<Match[]> {
  if (!isConfigured()) return []
  const supabase = createServerClient()
  const { data: matchIds, error: mcError } = await supabase
    .from('match_channels')
    .select('match_id')
    .eq('channel_code', channelCode)

  if (mcError) throw mcError
  if (!matchIds || matchIds.length === 0) return []

  const ids = matchIds.map((m) => m.match_id)
  const { data: matches, error: mError } = await supabase
    .from('matches')
    .select('*')
    .in('id', ids)
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true })

  if (mError) throw mError
  return enrichWithTeams(matches as Match[])
}

export type MatchType = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final'

export interface Game {
  _id: string
  id: string
  home_team_id: string
  away_team_id: string
  home_score: string
  away_score: string
  home_scorers: string
  away_scorers: string
  group: string
  matchday: string
  local_date: string
  persian_date: string
  stadium_id: string
  finished: 'TRUE' | 'FALSE'
  time_elapsed: string
  type: MatchType
  home_team_name_en?: string
  home_team_name_fa?: string
  away_team_name_en?: string
  away_team_name_fa?: string
  home_team_label?: string
  away_team_label?: string
}

export async function getworldCupGames() {
  try {
    const response = await fetch('https://worldcup26.ir/get/games', {
      headers: { Accept: 'application/json' },
    })
    const data = await response.json()
    const games: Game[] = Array.isArray(data) ? data : data?.games ?? []
    if (!Array.isArray(games)) return
    return games.filter((g: Game) => g.finished === 'TRUE') as Game[]
  } catch (error) {
    console.error('API error:', error)
  }
}

function parseScorers(scorers: string): string[] {
  if (!scorers || scorers === 'null' || scorers === '{}') return []
  return scorers
    .replace(/^\{|\}$/g, '')
    .split(',')
    .map(s => s.replace(/^"|"$/g, '').trim())
    .filter(Boolean)
}

export async function syncWorldCupScores(): Promise<{ updated: number }> {
  const supabase = createServerClient()
  try {
    const { data: localMatches, error } = await supabase
      .from('matches')
      .select('*')
      .is('team_a_score', null)
      .is('team_b_score', null)

    if (error) throw error
    if (!localMatches || localMatches.length === 0) return { updated: 0 }

    const teamsRes = await fetch('https://worldcup26.ir/get/teams', {
      headers: { Accept: 'application/json' },
    })
    const teamsData = await teamsRes.json()
    const apiTeams: WorldCupTeam[] = Array.isArray(teamsData)
      ? teamsData
      : (teamsData as any)?.teams ?? []

    const teamIdToFifa = new Map<string, string>()
    for (const t of apiTeams) {
      teamIdToFifa.set(t.id, t.fifa_code)
    }

    const games = await getworldCupGames()
    if (!games || !Array.isArray(games)) return { updated: 0 }

    let updated = 0
    for (const game of games) {
      const homeFifa = teamIdToFifa.get(game.home_team_id)
      const awayFifa = teamIdToFifa.get(game.away_team_id)
      if (!homeFifa || !awayFifa) continue

      const match = (localMatches as any[]).find(
        (m: any) => m.team_a_code === homeFifa && m.team_b_code === awayFifa,
      )
      if (!match) continue

      const { error: updateError } = await supabase
        .from('matches')
        .update({
          team_a_score: parseInt(game.home_score, 10),
          team_b_score: parseInt(game.away_score, 10),
          team_a_scorers: parseScorers(game.home_scorers),
          team_b_scorers: parseScorers(game.away_scorers),
          status: 'finished',
        })
        .eq('id', match.id)

      if (updateError) {
        console.error('Failed to update match', match.id, updateError)
      } else {
        updated++
      }
    }

    return { updated }
  } catch (error) {
    console.error('syncWorldCupScores error:', error)
    return { updated: 0 }
  }
} 


