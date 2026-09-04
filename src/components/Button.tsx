import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'

type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark',

  secondary:
    'bg-surface-muted text-foreground hover:bg-border',

  outline:
    'border border-brand bg-transparent text-brand hover:bg-brand hover:text-white',

  ghost:
    'text-brand hover:bg-surface-muted',

  danger:
    'bg-danger text-white hover:bg-red-700',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-6 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full',
        'font-semibold tracking-[-0.01em]',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-2 focus-visible:outline-offset-3',
        'focus-visible:outline-brand',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:-translate-y-0.5 active:translate-y-0',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {loading ? 'Loading...' : children}
    </button>
  )
}
