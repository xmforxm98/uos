import type { ComponentDef } from '@/types'

export const componentDefs: ComponentDef[] = [
  // ── BUTTON ──────────────────────────────────────────────────────
  {
    id: 'button',
    name: 'Button',
    category: 'Actions',
    description: 'Triggers an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.',
    variants: ['primary', 'secondary', 'ghost', 'destructive', 'link'],
    previewType: 'button',
    states: [
      { name: 'default', description: 'Resting state' },
      { name: 'hover', description: 'Mouse over — slight background shift' },
      { name: 'active', description: 'Mouse down — compressed feel' },
      { name: 'focus', description: 'Keyboard navigation — visible ring' },
      { name: 'disabled', description: 'Non-interactive — reduced opacity' },
      { name: 'loading', description: 'Async in-progress — spinner inside' },
    ],
    tokenDeps: [
      {
        tokenId: 'btn/bg/primary',
        label: 'Background',
        semanticRef: 'bg/brand',
        primitiveRef: 'blue-600',
        currentValue: '#2563eb',
      },
      {
        tokenId: 'btn/bg/primary-hover',
        label: 'Background Hover',
        semanticRef: 'interactive/hover',
        primitiveRef: 'blue-700',
        currentValue: '#1d4ed8',
      },
      {
        tokenId: 'btn/text/primary',
        label: 'Label Color',
        semanticRef: 'text/on-emphasis',
        primitiveRef: 'white',
        currentValue: '#ffffff',
      },
      {
        tokenId: 'btn/border/primary',
        label: 'Border',
        semanticRef: 'transparent',
        primitiveRef: 'transparent',
        currentValue: 'transparent',
      },
      {
        tokenId: 'btn/radius',
        label: 'Border Radius',
        semanticRef: 'radius/sm',
        primitiveRef: 'radius-md',
        currentValue: '6px',
      },
      {
        tokenId: 'btn/padding-x',
        label: 'Horizontal Padding',
        semanticRef: 'spacing/component-x',
        primitiveRef: 'space-4',
        currentValue: '16px',
      },
      {
        tokenId: 'btn/font-size',
        label: 'Font Size',
        semanticRef: 'text/component',
        primitiveRef: 'text-sm',
        currentValue: '13px',
      },
    ],
    accessibility: [
      { rule: 'Color contrast ratio ≥ 4.5:1', wcag: '1.4.3', level: 'AA', passes: true, detail: 'White on blue-600: 4.54:1' },
      { rule: 'Touch target minimum 44×44px', wcag: '2.5.5', level: 'AAA', passes: true, detail: 'Default height 40px, target area 44px' },
      { rule: 'Keyboard accessible via Tab + Enter', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Focus indicator visible', wcag: '2.4.7', level: 'AA', passes: true, detail: '2px ring + 2px offset in brand color' },
      { rule: 'Disabled state communicates role="button" aria-disabled', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Loading state announces to screen readers via aria-live', wcag: '4.1.3', level: 'AA', passes: true },
    ],
    contrast: {
      ratio: 4.54,
      level: 'AA',
      foreground: '#ffffff',
      background: '#2563eb',
    },
    aiRules: {
      semanticIntent: 'Confirms, submits, or initiates a primary user action.',
      useWhen: [
        'Form submission (sign up, save, confirm)',
        'Primary call-to-action on landing pages',
        'Completing onboarding steps',
        'Opening important dialogs (e.g., payment)',
      ],
      avoidWhen: [
        'Destructive actions without explicit destructive variant',
        'Navigation between pages (use Link instead)',
        'More than one primary button per viewport section',
        'Secondary or tertiary actions (use secondary/ghost)',
      ],
      maxPerScreen: { primary: 1, secondary: 3, ghost: 6 },
      preferredPlacements: ['bottom-right of form', 'end of onboarding step', 'header CTA'],
      promptHints: [
        'Always pair with secondary for cancel/back',
        'Use loading state for async operations >300ms',
        'Destructive button should require confirmation dialog',
      ],
    },
    codeExample: `import { Button } from '@/components/ui/button'

// Primary
<Button variant="primary" size="md">
  Get Started
</Button>

// With loading state
<Button variant="primary" loading={isSubmitting}>
  Save Changes
</Button>

// Destructive with confirmation
<Button
  variant="destructive"
  onClick={() => setConfirmOpen(true)}
>
  Delete Account
</Button>`,
    semanticRole: 'action trigger — initiates an operation with immediate user feedback',
    interactionTokenRefs: ['motion/press', 'motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'playful', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Form submission', 'Primary call-to-action', 'Completing onboarding steps', 'Opening important dialogs'],
      avoidWhen: ['Navigation between pages', 'More than one primary per section', 'Secondary or tertiary actions'],
    },
  },

  // ── INPUT ────────────────────────────────────────────────────────
  {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Allows users to enter text data. Foundation of all form interactions.',
    variants: ['default', 'filled', 'ghost', 'error', 'success'],
    previewType: 'input',
    states: [
      { name: 'empty', description: 'Placeholder visible' },
      { name: 'focused', description: 'Active input — border emphasizes' },
      { name: 'filled', description: 'Has value — ready to submit' },
      { name: 'error', description: 'Validation failed — red border + message' },
      { name: 'success', description: 'Validated — green indicator' },
      { name: 'disabled', description: 'Read-only appearance' },
    ],
    tokenDeps: [
      {
        tokenId: 'input/bg',
        label: 'Background',
        semanticRef: 'surface/sunken',
        primitiveRef: 'gray-50',
        currentValue: '#f9fafb',
      },
      {
        tokenId: 'input/border',
        label: 'Border Default',
        semanticRef: 'border/default',
        primitiveRef: 'gray-200',
        currentValue: '#e5e7eb',
      },
      {
        tokenId: 'input/border-focus',
        label: 'Border Focus',
        semanticRef: 'border/brand',
        primitiveRef: 'blue-600',
        currentValue: '#2563eb',
      },
      {
        tokenId: 'input/border-error',
        label: 'Border Error',
        semanticRef: 'border/danger',
        primitiveRef: 'red-300',
        currentValue: '#fca5a5',
      },
      {
        tokenId: 'input/text',
        label: 'Text Color',
        semanticRef: 'text/default',
        primitiveRef: 'gray-950',
        currentValue: '#030712',
      },
      {
        tokenId: 'input/placeholder',
        label: 'Placeholder Color',
        semanticRef: 'text/subtle',
        primitiveRef: 'gray-400',
        currentValue: '#9ca3af',
      },
      {
        tokenId: 'input/radius',
        label: 'Border Radius',
        semanticRef: 'radius/sm',
        primitiveRef: 'radius-md',
        currentValue: '6px',
      },
    ],
    accessibility: [
      { rule: 'Always has associated <label>', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Error messages linked via aria-describedby', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Required fields use aria-required', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Focus ring clearly visible', wcag: '2.4.7', level: 'AA', passes: true },
      { rule: 'Autocomplete attribute on common fields', wcag: '1.3.5', level: 'AA', passes: true },
    ],
    contrast: {
      ratio: 7.45,
      level: 'AAA',
      foreground: '#030712',
      background: '#f9fafb',
    },
    aiRules: {
      semanticIntent: 'Captures structured user data input.',
      useWhen: [
        'Single-line text data (email, name, search)',
        'Short structured values (zip code, phone)',
        'Form fields that need validation',
      ],
      avoidWhen: [
        'Multi-line content (use Textarea)',
        'Selection from a known list (use Select or Combobox)',
        'Binary choices (use Toggle or Checkbox)',
      ],
      maxPerScreen: { default: 8 },
      promptHints: [
        'Always pair with a visible label — never placeholder-only',
        'Group related inputs in a fieldset',
        'Show inline validation on blur, not on every keystroke',
      ],
    },
    codeExample: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
  />
  {error && (
    <p className="text-sm text-danger">{error}</p>
  )}
</div>`,
    semanticRole: 'data entry field — captures user text for processing or persistence',
    interactionTokenRefs: ['motion/quick', 'motion/fade-in'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Collecting user text data', 'Search interfaces', 'Authentication forms', 'Settings fields'],
      avoidWhen: ['Binary choices (use Toggle)', 'Multiple selections (use Select)', 'Date ranges (use DatePicker)'],
    },
  },

  // ── CARD ─────────────────────────────────────────────────────────
  {
    id: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'Groups related content and actions into a contained surface. The foundational layout primitive for dashboard and content UIs.',
    variants: ['default', 'raised', 'interactive', 'featured'],
    previewType: 'card',
    states: [
      { name: 'static', description: 'Non-interactive content container' },
      { name: 'hover', description: 'Interactive card — subtle lift + border' },
      { name: 'selected', description: 'Chosen state — brand border' },
      { name: 'loading', description: 'Skeleton state while fetching' },
    ],
    tokenDeps: [
      {
        tokenId: 'card/bg',
        label: 'Background',
        semanticRef: 'surface/default',
        primitiveRef: 'white',
        currentValue: '#ffffff',
      },
      {
        tokenId: 'card/border',
        label: 'Border',
        semanticRef: 'border/default',
        primitiveRef: 'gray-200',
        currentValue: '#e5e7eb',
      },
      {
        tokenId: 'card/shadow',
        label: 'Shadow',
        semanticRef: 'shadow/sm',
        primitiveRef: 'shadow-sm',
        currentValue: '0 1px 2px rgba(0,0,0,0.05)',
      },
      {
        tokenId: 'card/radius',
        label: 'Radius',
        semanticRef: 'radius/md',
        primitiveRef: 'radius-xl',
        currentValue: '12px',
      },
      {
        tokenId: 'card/padding',
        label: 'Padding',
        semanticRef: 'spacing/container',
        primitiveRef: 'space-6',
        currentValue: '24px',
      },
    ],
    accessibility: [
      { rule: 'Interactive cards have role="button" or are <a>', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Decorative images inside have alt=""', wcag: '1.1.1', level: 'A', passes: true },
      { rule: 'Card heading hierarchy is correct', wcag: '1.3.1', level: 'A', passes: true },
    ],
    contrast: {
      ratio: 4.54,
      level: 'AA',
      foreground: '#030712',
      background: '#ffffff',
    },
    aiRules: {
      semanticIntent: 'Groups and presents related content as a single visual unit.',
      useWhen: [
        'Dashboard data widgets',
        'Product/item listing grids',
        'Profile or entity summary',
        'Settings section containers',
      ],
      avoidWhen: [
        'Deeply nested cards more than 2 levels',
        'As the only layout primitive (combine with sections)',
        'For inline text callouts (use callout/blockquote)',
      ],
      maxPerScreen: { default: 12 },
      preferredPlacements: ['main content area', 'grid layout', 'dashboard panels'],
      promptHints: [
        'Use card/interactive variant for clickable items',
        'Group metrics in cards of equal visual weight',
        'Featured cards should be used sparingly — max 1–2 per section',
      ],
    },
    codeExample: `import { Card, CardHeader, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <h3>Monthly Revenue</h3>
    <Badge variant="success">+12.5%</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$48,295</p>
    <p className="text-sm text-muted">vs $42,912 last month</p>
  </CardContent>
</Card>`,
    semanticRole: 'content container — groups related information into a scannable, interactive unit',
    interactionTokenRefs: ['motion/hover-lift', 'motion/smooth', 'motion/fade-in'],
    compatibleProfileIds: ['enterprise', 'premium', 'playful', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Grouping related content', 'Presenting scannable summaries', 'Navigation to detail views'],
      avoidWhen: ['Simple key-value data (use table)', 'High-density lists (use list items)', 'Single isolated values'],
    },
  },

  // ── BADGE ─────────────────────────────────────────────────────────
  {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display',
    description: 'Compact status indicator for labeling and categorization. Communicates state, category, or count at a glance.',
    variants: ['default', 'brand', 'success', 'warning', 'danger', 'neutral'],
    previewType: 'badge',
    states: [
      { name: 'static', description: 'Non-interactive label' },
      { name: 'removable', description: 'Has × to dismiss' },
      { name: 'clickable', description: 'Acts as a filter chip' },
    ],
    tokenDeps: [
      {
        tokenId: 'badge/bg/default',
        label: 'Background',
        semanticRef: 'bg/muted',
        primitiveRef: 'gray-100',
        currentValue: '#f3f4f6',
      },
      {
        tokenId: 'badge/text/default',
        label: 'Text',
        semanticRef: 'text/default',
        primitiveRef: 'gray-950',
        currentValue: '#030712',
      },
      {
        tokenId: 'badge/radius',
        label: 'Radius',
        semanticRef: 'radius/full',
        primitiveRef: 'radius-full',
        currentValue: '9999px',
      },
    ],
    accessibility: [
      { rule: 'Uses semantic span or meaningful role', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Color is not the only conveyor of meaning', wcag: '1.4.1', level: 'A', passes: true, detail: 'Badges include text labels alongside color' },
    ],
    contrast: {
      ratio: 13.5,
      level: 'AAA',
      foreground: '#030712',
      background: '#f3f4f6',
    },
    aiRules: {
      semanticIntent: 'Labels items with categorical status or metadata.',
      useWhen: [
        'Status labels (Active, Pending, Archived)',
        'Category tags on content items',
        'Count indicators on navigation',
        'Feature flags or environment indicators',
      ],
      avoidWhen: [
        'Critical status that needs more than a glance (use Alert)',
        'More than 3 badges on a single entity',
        'Using color alone to convey meaning',
      ],
      maxPerScreen: { default: 20 },
      promptHints: [
        'Use semantic variants: success=complete, warning=pending, danger=failed',
        'Keep badge text under 15 characters',
      ],
    },
    codeExample: `import { Badge } from '@/components/ui/badge'

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending Review</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="brand">New</Badge>`,
    semanticRole: 'status indicator — communicates state, category, count, or classification at a glance',
    interactionTokenRefs: ['motion/instant', 'motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'playful', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Showing status (active/pending/failed)', 'Categorizing content', 'Displaying unread counts', 'Feature labels'],
      avoidWhen: ['Long text (use Chip)', 'Interactive actions (use Button)', 'More than 3 per list item'],
    },
  },

  // ── AVATAR ────────────────────────────────────────────────────────
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display',
    description: 'Visual representation of a user or entity. Supports image, initials fallback, and icon fallback.',
    variants: ['sm', 'md', 'lg', 'xl', 'group'],
    previewType: 'avatar',
    states: [
      { name: 'with-image', description: 'Profile photo loaded' },
      { name: 'initials', description: 'Image failed or absent — shows initials' },
      { name: 'fallback-icon', description: 'Anonymous user icon' },
      { name: 'online', description: 'Presence indicator overlay' },
      { name: 'loading', description: 'Skeleton placeholder' },
    ],
    tokenDeps: [
      {
        tokenId: 'avatar/bg',
        label: 'Fallback Background',
        semanticRef: 'bg/brand-subtle',
        primitiveRef: 'blue-50',
        currentValue: '#eff6ff',
      },
      {
        tokenId: 'avatar/text',
        label: 'Initials Color',
        semanticRef: 'text/brand',
        primitiveRef: 'blue-600',
        currentValue: '#2563eb',
      },
      {
        tokenId: 'avatar/border',
        label: 'Ring Border',
        semanticRef: 'border/default',
        primitiveRef: 'gray-200',
        currentValue: '#e5e7eb',
      },
      {
        tokenId: 'avatar/radius',
        label: 'Border Radius',
        semanticRef: 'radius/full',
        primitiveRef: 'radius-full',
        currentValue: '9999px',
      },
    ],
    accessibility: [
      { rule: 'Image alt text describes the person', wcag: '1.1.1', level: 'A', passes: true },
      { rule: 'Presence indicator has aria-label', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Avatar group announces "N users"', wcag: '1.3.1', level: 'A', passes: true },
    ],
    contrast: { ratio: 4.55, level: 'AA', foreground: '#2563eb', background: '#eff6ff' },
    aiRules: {
      semanticIntent: 'Represents a person, team, or entity visually.',
      useWhen: [
        'User profiles and account indicators',
        'Comment/activity attribution',
        'Team member lists',
        'Assignee fields in task management',
      ],
      avoidWhen: [
        'Representing non-person entities (use icons/logos)',
        'More than 5 avatars in a row without grouping',
      ],
      maxPerScreen: { group: 8 },
      promptHints: [
        'Always provide initials fallback for image avatars',
        'Use avatar groups with +N overflow for large teams',
      ],
    },
    codeExample: `import { Avatar } from '@/components/ui/avatar'

<Avatar
  src="/users/alex.jpg"
  fallback="AK"
  alt="Alex Kim"
  size="md"
  status="online"
/>

// Avatar group
<AvatarGroup max={4}>
  {members.map(m => (
    <Avatar key={m.id} src={m.avatar} fallback={m.initials} />
  ))}
</AvatarGroup>`,
    semanticRole: 'identity representation — visualizes a user, entity, or persona with fallback hierarchy',
    interactionTokenRefs: ['motion/quick', 'motion/hover-lift'],
    compatibleProfileIds: ['enterprise', 'premium', 'playful', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Representing users in comments/feeds', 'Author attribution', 'Team member lists', 'Chat participants'],
      avoidWhen: ['Non-person entities without clear identity', 'Decorative imagery (use Image)', 'More than 8 in a stack without AvatarGroup'],
    },
  },

  // ── TOGGLE ────────────────────────────────────────────────────────
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Forms',
    description: 'Binary on/off control for settings and preferences. Immediate effect — no confirmation needed.',
    variants: ['default', 'sm', 'lg'],
    previewType: 'toggle',
    states: [
      { name: 'off', description: 'Inactive — gray track' },
      { name: 'on', description: 'Active — brand track' },
      { name: 'disabled-off', description: 'Non-interactive off' },
      { name: 'disabled-on', description: 'Non-interactive on' },
      { name: 'loading', description: 'Async change in progress' },
    ],
    tokenDeps: [
      {
        tokenId: 'toggle/track-off',
        label: 'Track (Off)',
        semanticRef: 'bg/muted',
        primitiveRef: 'gray-200',
        currentValue: '#e5e7eb',
      },
      {
        tokenId: 'toggle/track-on',
        label: 'Track (On)',
        semanticRef: 'bg/brand',
        primitiveRef: 'blue-600',
        currentValue: '#2563eb',
      },
      {
        tokenId: 'toggle/thumb',
        label: 'Thumb',
        semanticRef: 'bg/default',
        primitiveRef: 'white',
        currentValue: '#ffffff',
      },
    ],
    accessibility: [
      { rule: 'role="switch" with aria-checked', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Label describes the setting being toggled', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Keyboard: Space to toggle', wcag: '2.1.1', level: 'A', passes: true },
    ],
    contrast: { ratio: 4.54, level: 'AA', foreground: '#ffffff', background: '#2563eb' },
    aiRules: {
      semanticIntent: 'Controls a binary persistent setting with immediate effect.',
      useWhen: [
        'Feature flags (notifications, dark mode, etc.)',
        'Permission toggles in settings pages',
        'Show/hide preferences',
      ],
      avoidWhen: [
        'Actions that require confirmation (use Button + Dialog)',
        'Multi-option choices (use RadioGroup)',
        'Temporary state changes (use Checkbox for forms)',
      ],
      maxPerScreen: { default: 10 },
      promptHints: [
        'Always label the setting, not the toggle state',
        'Pair with description text for less obvious settings',
        'Use loading state for async toggles',
      ],
    },
    codeExample: `import { Toggle } from '@/components/ui/toggle'

<div className="flex items-center justify-between">
  <div>
    <Label>Email notifications</Label>
    <p className="text-sm text-muted">
      Receive weekly digest emails
    </p>
  </div>
  <Toggle
    checked={emailEnabled}
    onCheckedChange={setEmailEnabled}
    aria-label="Toggle email notifications"
  />
</div>`,
    semanticRole: 'binary state controller — represents a persistent on/off preference or setting',
    interactionTokenRefs: ['motion/spring', 'motion/quick', 'motion/press'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'playful', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Persistent settings that take effect immediately', 'On/off feature flags', 'Preference toggles in settings panels'],
      avoidWhen: ['Temporary state changes (use Checkbox for forms)', 'Multi-option selection (use Radio/Select)', 'Actions (use Button)'],
    },
  },
]

export function getComponent(id: string) {
  return componentDefs.find(c => c.id === id)
}

export function getComponentsByCategory(category: string) {
  return componentDefs.filter(c => c.category === category)
}

export const componentCategories = [...new Set(componentDefs.map(c => c.category))]
