import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default:  'bg-[var(--surface-high)] text-[var(--text-muted)] border border-[var(--border-mid)]',
        accent:   'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)]',
        green:    'bg-[var(--green-subtle)] text-[var(--green)]',
        red:      'bg-[var(--red-subtle)] text-[var(--red)]',
        yellow:   'bg-[var(--yellow-subtle)] text-[var(--yellow)]',
        purple:   'bg-[var(--purple-subtle)] text-[var(--purple)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
