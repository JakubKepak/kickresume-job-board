import type { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-coral text-white border border-coral hover:bg-coral-dark hover:border-coral-dark',
  secondary:
    'bg-transparent text-coral border border-coral hover:bg-coral-light',
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-8 py-2.5 text-sm font-medium rounded-xl transition-colors shrink-0 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
