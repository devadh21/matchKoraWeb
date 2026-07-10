import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4">
      <h1 className="text-white text-4xl font-bold">404</h1>
      <p className="text-whitely/60">Page not found</p>
      <Link
        href="/"
        className="bg-greenly text-darkly px-4 py-2 rounded-md font-semibold hover:bg-greenly/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
