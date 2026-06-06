import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'teal'
  size?: 'default' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-inter font-medium rounded-pill transition-all duration-300 cursor-pointer'

  const sizeStyles = {
    default: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-4 text-lg',
  }

  const variantStyles = {
    primary: 'bg-gradient-to-br from-orange to-orange-dark text-white hover:from-orange-dark hover:to-orange-darker hover:-translate-y-0.5 hover:shadow-btn-primary-hover active:translate-y-0 active:shadow-none',
    secondary: 'bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
    ghost: 'bg-transparent text-charcoal hover:text-orange',
    teal: 'bg-teal text-white hover:bg-teal-dark hover:-translate-y-0.5',
  }

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      {...props}
    >
      {children}
    </button>
  )
}
