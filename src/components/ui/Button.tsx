type Variant = 'primary' | 'secondary' | 'inverted' | 'outline'

interface ButtonProps {
  title: string
  variant?: Variant
  onClick?: () => void
}

const variants: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'px-3 py-2 m-1 rounded-md bg-greenly hover:bg-greenly/90 transition-colors',
    text: 'text-darkly font-semibold',
  },
  secondary: {
    container: 'px-3 py-2 m-1 rounded-md bg-darklyLight hover:bg-darklyLight/80 transition-colors',
    text: 'text-sageGreen font-semibold',
  },
  inverted: {
    container: 'px-3 py-2 m-1 rounded-md bg-whitely hover:bg-whitely/90 transition-colors',
    text: 'text-darkly font-semibold',
  },
  outline: {
    container: 'px-3 py-2 m-1 rounded-md border-2 border-sageGreen bg-darkly hover:bg-darklyLight transition-colors',
    text: 'text-sageGreen font-semibold',
  },
}

export function Button({ title, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={variants[variant].container}>
      <span className={variants[variant].text}>{title}</span>
    </button>
  )
}
