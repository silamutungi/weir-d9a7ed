import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-white',
        secondary: 'text-[var(--color-text)]',
        destructive: 'bg-[var(--color-error)] text-white',
        outline: 'border text-[var(--color-text)]'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} style={variant === 'secondary' ? { backgroundColor: 'rgba(30,64,175,0.10)', color: 'var(--color-primary)' } : variant === 'outline' ? { borderColor: 'var(--color-border)' } : {}} {...props} />
}

export { Badge, badgeVariants }