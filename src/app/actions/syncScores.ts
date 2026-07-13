'use server'

import { syncWorldCupScores } from '@/lib/api'

export async function syncScoresAction() {
  return await syncWorldCupScores()
}