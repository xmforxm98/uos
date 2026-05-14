'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]',
        secondary:   'bg-[var(--surface-mid)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-high)]',
        ghost:       'text-[var(--text-muted)] hover:bg-[var(--surface-mid)] hover:text-[var(--text)]',
        destructive: 'bg-[var(--red-subtle)] text-[var(--red)] border border-[var(--border)] hover:bg-[var(--red)] hover:text-white',
        outline:     'border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--surface-mid)]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm:      'h-7 rounded-md px-3 text-xs',
        lg:      'h-11 rounded-xl px-6',
        icon:    'h-8 w-8 rounded-md',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
