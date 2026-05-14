import type { PatternDef } from '@/types'

export const patterns: PatternDef[] = [
  {
    id: 'authentication',
    name: 'Authentication',
    category: 'Core Flows',
    description: 'Login, signup, and password recovery flows. The gateway to the product.',
    components: ['input', 'button', 'card'],
    semanticPurpose: 'Identity verification and access control',
    aiConstraints: [
      'Always include OAuth/SSO option alongside email+password',
      'Password field must never be visible by default',
      'Submit button must be primary variant',
      'Error messages must be non-specific for security (no "email not found")',
      'Loading state required on all async auth actions',
      'Legal links (Terms, Privacy) must be visible before submission',
    ],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    category: 'Core Flows',
    description: 'Overview of key metrics, recent activity, and quick actions. The home base of the product.',
    components: ['card', 'badge', 'avatar', 'button'],
    semanticPurpose: 'Situational awareness and quick navigation',
    aiConstraints: [
      'Group metrics in card grid — max 4 per row',
      'Primary action must be in top-right or sticky header',
      'Use badge for status, never just color',
      'Recent activity is chronological, newest first',
      'Empty state must include a clear call to action',
      'No more than 2 different chart types per dashboard',
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    category: 'Core Flows',
    description: 'User preferences, account management, and configuration.',
    components: ['toggle', 'input', 'button', 'card'],
    semanticPurpose: 'User control over application behavior and data',
    aiConstraints: [
      'Group related settings in cards with clear headings',
      'Destructive settings in a separate Danger Zone section',
      'Toggles for binary preferences — no submit button needed',
      'Forms for multi-field changes — require explicit save',
      'Confirmation dialogs for irreversible actions',
      'Current values always visible before editing',
    ],
  },
  {
    id: 'billing',
    name: 'Billing',
    category: 'Conversion',
    description: 'Pricing, plan selection, payment capture, and invoice management.',
    components: ['card', 'button', 'badge', 'input'],
    semanticPurpose: 'Revenue capture with trust and clarity',
    aiConstraints: [
      'Pricing must be prominent — never hidden in small text',
      'Current plan highlighted with brand/selected variant',
      'CTA for paid plans is primary button — one per plan',
      'Payment form must use browser autocomplete attributes',
      'Security indicators (SSL, trust badges) near payment button',
      'Trial expiry communicated with warning badge, not danger',
      'Downgrade is allowed but surfaces consequence first',
    ],
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    category: 'Conversion',
    description: 'Step-by-step setup flow to guide users to first value.',
    components: ['button', 'input', 'card', 'badge'],
    semanticPurpose: 'Reduce time-to-value for new users',
    aiConstraints: [
      'Progress indicator shows current step / total',
      'Back navigation always available except step 1',
      'Next/Continue is primary button — always bottom-right',
      'Skip options for non-essential steps',
      'Completion state celebrates with success visual',
      'Maximum 5 steps — merge if more needed',
      'Each step has a single clear objective',
    ],
  },
]

export function getPattern(id: string) {
  return patterns.find(p => p.id === id)
}
