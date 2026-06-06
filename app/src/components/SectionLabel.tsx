import { cn } from '@/lib/utils'

interface SectionLabelProps {
  text: string
  color?: 'orange' | 'teal'
  className?: string
}

export default function SectionLabel({ text, color = 'orange', className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'font-inter text-xs font-medium uppercase tracking-[1.2px]',
        color === 'orange' ? 'text-orange' : 'text-teal',
        className
      )}
    >
      {text}
    </p>
  )
}
