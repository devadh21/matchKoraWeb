import cron from 'node-cron'
import { syncWorldCupScores } from '@/lib/api' 


// Schedule the cron job to run every hour (refresh scores evry hour)
// '0 * * * *' means run at minute 0 of every hour

cron.schedule("0 * * * *", async () => {
  console.log("Running score sync...");

  try {
    const result = await syncWorldCupScores();
    console.log(`Updated scores  matches`);
  } catch (error) {
    console.error("Cron job failed:", error);
  }
});