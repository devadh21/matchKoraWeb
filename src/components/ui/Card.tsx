import type { ReactNode } from 'react'

interface CardProps {
  className?: string
  children?: ReactNode
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-lg bg-darklyLight p-3 m-1 ${className ?? ''}`}>
      {children}
    </div>
  )
}
