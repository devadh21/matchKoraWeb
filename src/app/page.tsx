import { VideoPresetation } from "@/components/ui/VideoPresetation";

import cron from 'node-cron'
import { syncWorldCupScores } from '@/lib/api' 


// Schedule the cron job to run every hour (refresh scores evry hour)
// '0 * * * *' means run at minute 0 of every hour
cron.schedule('*/1 * * * *', async () => {
  console.log('Running hourly World Cup score sync...')
  const result = await syncWorldCupScores()
  console.log(`Sync complete. Updated ${result.updated} matches.`)
})


export default function HomePage() {

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-darkly flex items-center justify-center py-10">
      <div className="flex flex-col items-center px-4 max-w-lg">
        <div className="relative basis-1/2 flex  justify-center p-4 ">
          <VideoPresetation></VideoPresetation>
        </div>
        <div className="w-full h-80 flex justify-center items-center relative">
          <span className="text-[200px] font-black text-greenly/80 tracking-[-10px] absolute select-none">
            26
          </span>
          <img
            src="/images/cup.png"
            alt="World Cup trophy"
            className="z-10 w-full h-full object-contain absolute"
          />
        </div>

        <div className="flex flex-col items-center px-8 text-center">
          <h1 className="text-white/80 text-[32px] font-bold text-center tracking-wide mb-5 leading-tight">
            FIFA WORLD CUP<br />2026
          </h1>
          <p className="text-sageGreen text-sm text-center leading-6 px-2">
            The 104 matches of the FIFA World Cup 2026 tournament will be
            organized in 16 football stadiums in United States, Canada, Mexico.
          </p>
        </div>
      </div>
    </div>
  )
}
