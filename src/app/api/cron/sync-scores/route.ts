import { NextRequest, NextResponse } from 'next/server'
import { syncWorldCupScores } from '@/lib/api'
import { syncScoresAction } from '@/app/actions/syncScores'

export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get('authorization')
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  

  // const result = await syncWorldCupScores() 
  const result = await syncScoresAction() 

  return NextResponse.json({ success: true, ...result })
} 
 