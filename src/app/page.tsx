import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-darkly flex items-center justify-center py-10">
      <div className="flex flex-col items-center px-4 max-w-lg">
        <img
          src="/logo-3.png"
          alt="matchKora logo"
          className="w-40 h-40 object-contain"
        />

        <div className="w-full h-[320px] flex justify-center items-center relative">
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

        <div className="mt-8 mb-5 flex justify-center">
          <Link
            href="/matches"
            className="w-[84px] h-[84px] rounded-full border-2 border-sageGreen flex items-center justify-center group"
          >
            <div className="w-full h-full rounded-full bg-greenly flex items-center justify-center group-hover:bg-greenly/80 transition-colors">
              <ArrowRight size={28} color="#0D1B12" strokeWidth={2.5} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
