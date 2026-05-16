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

  // ── DIALOG ──────────────────────────────────────────────────────
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlay',
    description: 'A modal window that interrupts the user to capture attention for critical actions or information.',
    variants: ['default', 'destructive', 'form'],
    previewType: 'dialog',
    states: [
      { name: 'closed', description: 'Hidden — not in DOM' },
      { name: 'open', description: 'Visible with backdrop overlay' },
      { name: 'loading', description: 'Action in progress inside dialog' },
    ],
    tokenDeps: [
      { tokenId: 'dialog/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'dialog/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'dialog/backdrop', label: 'Backdrop', semanticRef: 'overlay/scrim', primitiveRef: 'black/50', currentValue: 'rgba(0,0,0,0.5)' },
      { tokenId: 'dialog/radius', label: 'Border Radius', semanticRef: 'radius/lg', primitiveRef: 'radius-lg', currentValue: '8px' },
    ],
    accessibility: [
      { rule: 'Focus trapped inside dialog when open', wcag: '2.1.2', level: 'A', passes: true },
      { rule: 'ESC key closes dialog', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'role="dialog" with aria-modal="true"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Focus returns to trigger on close', wcag: '2.4.3', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Interrupts user flow to confirm, warn, or collect critical information.',
      useWhen: ['Destructive action confirmation', 'Critical data collection', 'Alert requiring acknowledgment'],
      avoidWhen: ['Non-critical information (use Toast)', 'Complex multi-step flows (use Sheet/Drawer)', 'Contextual help (use Popover)'],
      maxPerScreen: { default: 1 },
      promptHints: ['Always provide a clear dismiss action', 'Use destructive variant for delete confirmations'],
    },
    codeExample: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    semanticRole: 'modal interrupt — blocks background interaction to demand user attention',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Destructive confirmations', 'Required form collection', 'Critical warnings'],
      avoidWhen: ['Informational content', 'Navigation', 'Frequent triggers (causes fatigue)'],
    },
  },

  // ── ALERT DIALOG ────────────────────────────────────────────────
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlay',
    description: 'An accessible dialog for actions requiring explicit confirmation — stricter than Dialog with no accidental dismiss.',
    variants: ['default', 'destructive'],
    previewType: 'dialog',
    states: [
      { name: 'closed', description: 'Not rendered' },
      { name: 'open', description: 'Blocks all interaction — cannot dismiss via backdrop click' },
    ],
    tokenDeps: [
      { tokenId: 'alert-dialog/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'alert-dialog/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'role="alertdialog" — announces immediately to screen readers', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Cannot be dismissed accidentally (no backdrop close)', wcag: '2.1.2', level: 'A', passes: true },
      { rule: 'Focus trapped, returns on close', wcag: '2.4.3', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Forces explicit user decision — used exclusively for high-stakes irreversible actions.',
      useWhen: ['Permanent deletion', 'Account cancellation', 'Data overwrite warnings'],
      avoidWhen: ['Soft confirmations (use Dialog)', 'Informational alerts (use Alert component)', 'Anything reversible'],
      promptHints: ['Never use for non-destructive actions', 'Cancel must always be present'],
    },
    codeExample: `import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

<AlertDialog>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>All data will be permanently removed.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    semanticRole: 'forced confirmation — non-dismissible modal for irreversible destructive operations',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Permanent deletion', 'Irreversible actions', 'Legal/compliance confirmations'],
      avoidWhen: ['Anything reversible', 'Informational content', 'Soft warnings'],
    },
  },

  // ── SHEET ───────────────────────────────────────────────────────
  {
    id: 'sheet',
    name: 'Sheet',
    category: 'Overlay',
    description: 'A slide-in panel from any edge — ideal for secondary content, settings, or detail views without leaving context.',
    variants: ['top', 'bottom', 'left', 'right'],
    previewType: 'dialog',
    states: [
      { name: 'closed', description: 'Off-screen' },
      { name: 'open', description: 'Slides in from edge with backdrop' },
    ],
    tokenDeps: [
      { tokenId: 'sheet/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'sheet/border', label: 'Edge Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'sheet/width', label: 'Width (side)', semanticRef: 'layout/sidebar', primitiveRef: '384px', currentValue: '384px' },
    ],
    accessibility: [
      { rule: 'Focus trapped when open', wcag: '2.1.2', level: 'A', passes: true },
      { rule: 'ESC dismisses', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'role="dialog" with aria-modal', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Reveals secondary UI without full navigation — keeps user in primary context.',
      useWhen: ['Settings panels', 'Detail views', 'Multi-step forms on mobile', 'Filters/sort on data-heavy screens'],
      avoidWhen: ['Primary navigation (use Sidebar)', 'Short confirmations (use Dialog)', 'Tooltips/popovers'],
      promptHints: ['Right side for details, bottom for mobile actions', 'Include clear close control'],
    },
    codeExample: `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Make changes to your account here.</SheetDescription>
    </SheetHeader>
    {/* form fields */}
  </SheetContent>
</Sheet>`,
    semanticRole: 'contextual panel — extends the current view with related content without full navigation',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Settings, filters, details that complement current view', 'Mobile-first flows'],
      avoidWhen: ['Top-level navigation', 'Simple confirmations', 'Dense data tables'],
    },
  },

  // ── DRAWER ──────────────────────────────────────────────────────
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Overlay',
    description: 'A bottom sheet with native-feeling drag-to-dismiss gesture — mobile-first alternative to Dialog.',
    variants: ['default', 'nested'],
    previewType: 'dialog',
    states: [
      { name: 'closed', description: 'Off-screen below viewport' },
      { name: 'open', description: 'Snapped to height with handle indicator' },
      { name: 'dragging', description: 'User pulling to dismiss' },
    ],
    tokenDeps: [
      { tokenId: 'drawer/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'drawer/handle', label: 'Drag Handle', semanticRef: 'border/subtle', primitiveRef: 'gray-300', currentValue: '#d1d5db' },
    ],
    accessibility: [
      { rule: 'role="dialog" with aria-modal', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Keyboard navigable despite gesture interaction', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Mobile-native overlay for actions/content — feels like iOS/Android bottom sheet.',
      useWhen: ['Mobile share sheets', 'Action menus on touch devices', 'Partial-screen content on small screens'],
      avoidWhen: ['Desktop-primary experiences', 'Complex forms (use Sheet)', 'Navigation'],
      promptHints: ['Always include drag handle affordance', 'Support backdrop tap to dismiss'],
    },
    codeExample: `import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Share</DrawerTitle>
    </DrawerHeader>
    {/* content */}
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    semanticRole: 'mobile overlay — gesture-driven bottom sheet for touch-first interaction',
    compatibleProfileIds: ['native-mobile', 'playful', 'premium'],
    usageRules: {
      useWhen: ['Touch-primary screens', 'Action sheets', 'Quick content reveal on mobile'],
      avoidWhen: ['Desktop layouts', 'Complex multi-field forms', 'Navigation flows'],
    },
  },

  // ── POPOVER ─────────────────────────────────────────────────────
  {
    id: 'popover',
    name: 'Popover',
    category: 'Overlay',
    description: 'A floating panel anchored to a trigger — for secondary controls, filters, or rich content that overlays.',
    variants: ['default'],
    previewType: 'popover',
    states: [
      { name: 'closed', description: 'Hidden' },
      { name: 'open', description: 'Floating, positioned relative to trigger' },
    ],
    tokenDeps: [
      { tokenId: 'popover/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'popover/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'popover/shadow', label: 'Shadow', semanticRef: 'shadow/md', primitiveRef: 'shadow-md', currentValue: '0 4px 6px rgb(0,0,0,0.1)' },
    ],
    accessibility: [
      { rule: 'role="dialog" or region with label', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'ESC closes popover', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Focus management on open/close', wcag: '2.4.3', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Anchored floating content for non-modal secondary interactions.',
      useWhen: ['Date pickers', 'Color pickers', 'Rich filter controls', 'Contextual settings'],
      avoidWhen: ['Simple text hints (use Tooltip)', 'Blocking actions (use Dialog)', 'Navigation (use DropdownMenu)'],
    },
    codeExample: `import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open filter</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    {/* filter controls */}
  </PopoverContent>
</Popover>`,
    semanticRole: 'anchored overlay — floating panel tied to a trigger for contextual secondary UI',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'ai-native'],
    usageRules: {
      useWhen: ['Date/color pickers', 'Rich contextual controls', 'Inline editing panels'],
      avoidWhen: ['Navigation lists (use Dropdown)', 'Simple labels (use Tooltip)', 'Blocking confirmations (use Dialog)'],
    },
  },

  // ── TOOLTIP ─────────────────────────────────────────────────────
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlay',
    description: 'A short text label that appears on hover/focus — explains icon buttons or provides supplemental context.',
    variants: ['default', 'rich'],
    previewType: 'tooltip',
    states: [
      { name: 'hidden', description: 'Not visible' },
      { name: 'visible', description: 'Appears after delay on hover/focus' },
    ],
    tokenDeps: [
      { tokenId: 'tooltip/bg', label: 'Background', semanticRef: 'surface/inverse', primitiveRef: 'gray-900', currentValue: '#111827' },
      { tokenId: 'tooltip/text', label: 'Text', semanticRef: 'text/on-dark', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'tooltip/radius', label: 'Radius', semanticRef: 'radius/sm', primitiveRef: 'radius-sm', currentValue: '4px' },
    ],
    accessibility: [
      { rule: 'role="tooltip" on content element', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Accessible via keyboard focus (not just hover)', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Dismissible without moving focus (ESC)', wcag: '1.4.13', level: 'AA', passes: true },
      { rule: 'Content not truncated — full text available', wcag: '1.4.4', level: 'AA', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Provides label or context for icon-only controls or complex UI elements.',
      useWhen: ['Icon-only buttons needing labels', 'Abbreviations or jargon needing explanation', 'Supplemental hints'],
      avoidWhen: ['Essential information (must be always visible)', 'Interactive content inside tooltip (use Popover)', 'Long explanations'],
      promptHints: ['Keep under 60 characters', 'Never put interactive content inside a tooltip'],
    },
    codeExample: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Settings />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Settings</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    semanticRole: 'contextual hint — ephemeral label that appears on demand without interrupting flow',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Icon-only buttons', 'Truncated text with full value', 'Keyboard shortcut hints'],
      avoidWhen: ['Required information', 'Interactive content', 'Mobile-primary (hover not available)'],
    },
  },

  // ── HOVER CARD ──────────────────────────────────────────────────
  {
    id: 'hover-card',
    name: 'Hover Card',
    category: 'Overlay',
    description: 'A card that appears on hover over a link or element — shows rich preview content like user profiles or link previews.',
    variants: ['default'],
    previewType: 'hover-card',
    states: [
      { name: 'hidden', description: 'Not visible' },
      { name: 'visible', description: 'Shown after hover delay' },
    ],
    tokenDeps: [
      { tokenId: 'hover-card/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'hover-card/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'hover-card/shadow', label: 'Shadow', semanticRef: 'shadow/lg', primitiveRef: 'shadow-lg', currentValue: '0 10px 15px rgb(0,0,0,0.1)' },
    ],
    accessibility: [
      { rule: 'Also accessible via keyboard focus', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Hoverable — pointer can move into card without dismiss', wcag: '1.4.13', level: 'AA', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Provides rich contextual preview without navigation — peek before click.',
      useWhen: ['User mention previews', 'Link card previews', 'Glossary term definitions'],
      avoidWhen: ['Actions (use Popover)', 'Labels (use Tooltip)', 'Navigation (use DropdownMenu)'],
    },
    codeExample: `import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/user/jane">@jane</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar />
      <div>
        <p className="font-semibold">Jane Doe</p>
        <p className="text-sm text-muted-foreground">Product Designer</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    semanticRole: 'preview overlay — rich hover content for linked entities without page navigation',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'ai-native'],
    usageRules: {
      useWhen: ['User mentions, link previews, term definitions'],
      avoidWhen: ['Actions, navigation, essential content'],
    },
  },

  // ── DROPDOWN MENU ───────────────────────────────────────────────
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation',
    description: 'A context menu triggered by a button — shows a list of actions or navigation options.',
    variants: ['default', 'with-icons', 'with-shortcuts', 'checkable'],
    previewType: 'dropdown',
    states: [
      { name: 'closed', description: 'Button visible, menu hidden' },
      { name: 'open', description: 'Menu floating below/above trigger' },
      { name: 'item-hover', description: 'Item highlighted via mouse or arrow key' },
    ],
    tokenDeps: [
      { tokenId: 'dropdown/bg', label: 'Menu Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'dropdown/item-hover', label: 'Item Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
      { tokenId: 'dropdown/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'role="menu" with role="menuitem" children', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation between items', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'ESC closes and returns focus to trigger', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Exposes a set of related actions from a single trigger without consuming layout.',
      useWhen: ['Actions on a selected item (edit, delete, share)', 'User account menus', 'Overflow menus for many actions'],
      avoidWhen: ['3 or fewer visible actions (inline buttons are clearer)', 'Primary navigation (use NavigationMenu)', 'Single action (use Button)'],
      promptHints: ['Group related items with separators', 'Destructive items at bottom with red color'],
    },
    codeExample: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    semanticRole: 'action menu — reveals related operations on a single trigger to conserve layout space',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Row-level actions in tables', 'User account menu', 'Overflow menus (4+ actions)'],
      avoidWhen: ['Primary navigation', 'Few actions that fit inline', 'Selection from a list (use Select)'],
    },
  },

  // ── CONTEXT MENU ────────────────────────────────────────────────
  {
    id: 'context-menu',
    name: 'Context Menu',
    category: 'Navigation',
    description: 'A right-click / long-press menu — surfaces actions contextually on any target element.',
    variants: ['default', 'with-shortcuts'],
    previewType: 'dropdown',
    states: [
      { name: 'closed', description: 'No visible UI until triggered' },
      { name: 'open', description: 'Appears at cursor position' },
    ],
    tokenDeps: [
      { tokenId: 'context/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'context/item-hover', label: 'Item Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'Also accessible via keyboard (Shift+F10 or Menu key)', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'role="menu" structure', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Exposes actions relevant to the right-clicked element — a spatial shortcut layer.',
      useWhen: ['File managers', 'Canvas/whiteboard apps', 'Data grids needing row-level actions'],
      avoidWhen: ['Mobile-primary (right-click not available)', 'Discoverability-critical actions (hidden until right-click)', 'Simple lists'],
    },
    codeExample: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'

<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="border rounded p-4">Right click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    semanticRole: 'spatial action shortcut — context-aware menu at pointer position for power users',
    compatibleProfileIds: ['enterprise', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Desktop canvas apps', 'File/data managers', 'Power-user workflows'],
      avoidWhen: ['Mobile-primary apps', 'Discoverability-critical actions', 'Casual/consumer apps'],
    },
  },

  // ── NAVIGATION MENU ─────────────────────────────────────────────
  {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation',
    description: 'A top-level navigation component with support for dropdowns and rich content — built for site-wide navigation.',
    variants: ['horizontal', 'with-content'],
    previewType: 'navigation',
    states: [
      { name: 'default', description: 'All top-level items visible' },
      { name: 'item-active', description: 'Current page item indicated' },
      { name: 'dropdown-open', description: 'Sub-menu expanded' },
    ],
    tokenDeps: [
      { tokenId: 'nav/bg', label: 'Background', semanticRef: 'surface/default', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'nav/item-active', label: 'Active Item', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'nav/indicator', label: 'Active Indicator', semanticRef: 'border/brand', primitiveRef: 'blue-600', currentValue: '#2563eb' },
    ],
    accessibility: [
      { rule: 'role="navigation" landmark wrapping menu', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-current="page" on active item', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation in dropdowns', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Primary site navigation — wayfinding for top-level sections.',
      useWhen: ['App top bar navigation', 'Marketing site primary nav', 'Product section switching'],
      avoidWhen: ['Secondary/local navigation (use Tabs or Sidebar)', 'Action menus (use Dropdown)', 'Breadcrumbs (use Breadcrumb)'],
    },
    codeExample: `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/components">Components</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    semanticRole: 'primary wayfinding — site-level navigation for top-level sections and destinations',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber'],
    usageRules: {
      useWhen: ['Top-level page navigation', 'App header navigation', 'Marketing site nav'],
      avoidWhen: ['In-page section switching (use Tabs)', 'Settings panels', 'Action lists'],
    },
  },

  // ── MENUBAR ─────────────────────────────────────────────────────
  {
    id: 'menubar',
    name: 'Menubar',
    category: 'Navigation',
    description: 'A desktop application-style menu bar — File, Edit, View menus with keyboard shortcut support.',
    variants: ['default'],
    previewType: 'menubar',
    states: [
      { name: 'default', description: 'Menu items visible in bar' },
      { name: 'open', description: 'One menu expanded' },
    ],
    tokenDeps: [
      { tokenId: 'menubar/bg', label: 'Background', semanticRef: 'surface/default', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'menubar/border', label: 'Bottom Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'role="menubar" with role="menu" sub-menus', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Full keyboard navigation (arrow keys, F10)', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Desktop application command structure — familiar to power users of native apps.',
      useWhen: ['Code editors', 'Design tools', 'Desktop-class web apps'],
      avoidWhen: ['Consumer apps', 'Mobile-first products', 'Apps with fewer than 10 total actions'],
    },
    codeExample: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar'

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab <span className="ml-auto text-xs text-muted-foreground">⌘T</span></MenubarItem>
      <MenubarItem>Open...</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    semanticRole: 'application command hub — desktop-app-style persistent menu for command discovery',
    compatibleProfileIds: ['enterprise', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Desktop-class productivity apps', 'Code/design editors', 'Power-user tools'],
      avoidWhen: ['Mobile apps', 'Simple consumer web apps', 'Marketing sites'],
    },
  },

  // ── BREADCRUMB ──────────────────────────────────────────────────
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Shows hierarchical location within a site or app — helps users understand and navigate up the hierarchy.',
    variants: ['default', 'with-dropdown', 'collapsed'],
    previewType: 'breadcrumb',
    states: [
      { name: 'default', description: 'Full path visible' },
      { name: 'collapsed', description: 'Middle segments hidden with ellipsis' },
    ],
    tokenDeps: [
      { tokenId: 'breadcrumb/link', label: 'Link Color', semanticRef: 'text/default', primitiveRef: 'gray-700', currentValue: '#374151' },
      { tokenId: 'breadcrumb/current', label: 'Current Page', semanticRef: 'text/subtle', primitiveRef: 'gray-400', currentValue: '#9ca3af' },
      { tokenId: 'breadcrumb/separator', label: 'Separator', semanticRef: 'text/subtle', primitiveRef: 'gray-400', currentValue: '#9ca3af' },
    ],
    accessibility: [
      { rule: 'nav aria-label="breadcrumb" wrapping', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-current="page" on last item', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Spatial orientation — shows where the user is in the information hierarchy.',
      useWhen: ['Deep navigation hierarchies (3+ levels)', 'E-commerce category pages', 'Admin sections with nested settings'],
      avoidWhen: ['Flat single-level navigation', 'Modal/overlay context', 'Mobile where space is constrained'],
    },
    codeExample: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/settings">Settings</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Profile</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    semanticRole: 'location indicator — hierarchical path showing user position in nested structure',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium'],
    usageRules: {
      useWhen: ['Deep 3+ level hierarchies', 'E-commerce, admin, documentation'],
      avoidWhen: ['Flat navigation', 'Modals', 'Single-page apps with no hierarchy'],
    },
  },

  // ── PAGINATION ──────────────────────────────────────────────────
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Splits long lists or data sets into pages — lets users navigate between pages of content.',
    variants: ['default', 'compact', 'with-ellipsis'],
    previewType: 'pagination',
    states: [
      { name: 'default', description: 'Page numbers visible' },
      { name: 'current-page', description: 'Active page highlighted' },
      { name: 'first-page', description: 'Previous disabled' },
      { name: 'last-page', description: 'Next disabled' },
    ],
    tokenDeps: [
      { tokenId: 'pagination/active', label: 'Active Page', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'pagination/hover', label: 'Item Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'nav aria-label="pagination"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-current="page" on active item', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-disabled on prev/next at boundaries', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Breaks large data sets into scannable pages — controls load and comprehension.',
      useWhen: ['Search results', 'Data tables with many rows', 'Blog post archives'],
      avoidWhen: ['Infinite scroll is preferred (social feeds)', 'Short lists < 20 items', 'Single-page content'],
    },
    codeExample: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination'

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    semanticRole: 'data navigation — allows sequential access through paginated content sets',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber'],
    usageRules: {
      useWhen: ['Tables, search results, archives with 20+ items'],
      avoidWhen: ['Infinite scroll feeds', 'Short lists', 'Real-time streaming content'],
    },
  },

  // ── TABS ────────────────────────────────────────────────────────
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Organizes content into panels — only one panel visible at a time, reducing cognitive load.',
    variants: ['default', 'pills', 'underline'],
    previewType: 'tabs',
    states: [
      { name: 'default', description: 'First tab active' },
      { name: 'active', description: 'Selected tab visually distinct' },
      { name: 'hover', description: 'Tab focused by mouse' },
    ],
    tokenDeps: [
      { tokenId: 'tabs/trigger-active', label: 'Active Tab', semanticRef: 'surface/emphasis', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'tabs/indicator', label: 'Active Indicator', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'tabs/list-bg', label: 'Tab List BG', semanticRef: 'surface/sunken', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'role="tablist" with role="tab" and role="tabpanel"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation between tabs', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'aria-selected="true" on active tab', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Categorizes related content into distinct views within the same context.',
      useWhen: ['Switching between related views (Overview/Details/Settings)', 'Profile sections', 'Dashboard panels'],
      avoidWhen: ['Sequential steps (use Stepper)', 'Navigating to different pages (use NavigationMenu)', 'More than 7 tabs'],
    },
    codeExample: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="details">Details content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>`,
    semanticRole: 'content organizer — segments related views with mutual exclusivity and spatial locality',
    interactionTokenRefs: ['motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Switching related content in-place', '2–7 categories of same-level content'],
      avoidWhen: ['Sequential flows (Stepper)', 'Page-level navigation', 'More than 7 options'],
    },
  },

  // ── SELECT ──────────────────────────────────────────────────────
  {
    id: 'select',
    name: 'Select',
    category: 'Forms',
    description: 'A dropdown for selecting one option from a list — replaces native <select> with consistent styling.',
    variants: ['default', 'ghost'],
    previewType: 'select',
    states: [
      { name: 'closed', description: 'Shows selected value or placeholder' },
      { name: 'open', description: 'Dropdown visible with options' },
      { name: 'selected', description: 'Option chosen, value displayed' },
      { name: 'disabled', description: 'Non-interactive' },
    ],
    tokenDeps: [
      { tokenId: 'select/bg', label: 'Background', semanticRef: 'surface/default', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'select/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'select/option-hover', label: 'Option Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'role="combobox" with expanded state', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Keyboard open (Space/Enter) and navigate (arrows)', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Selected option announced via aria-selected', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Single selection from a predefined enumerated list — structured data input.',
      useWhen: ['Country, language, or timezone selection', '5+ mutually exclusive options', 'Form fields with defined option set'],
      avoidWhen: ['2-4 options (use RadioGroup)', 'Searchable large lists (use Command/Combobox)', 'Boolean (use Toggle/Switch)'],
    },
    codeExample: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="utc">UTC</SelectItem>
    <SelectItem value="pst">Pacific Time</SelectItem>
    <SelectItem value="est">Eastern Time</SelectItem>
  </SelectContent>
</Select>`,
    semanticRole: 'enumeration selector — single choice from a bounded predefined option set',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['5+ mutually exclusive options', 'Defined enum/option sets in forms'],
      avoidWhen: ['Fewer than 5 options (use RadioGroup)', 'Searchable lists (use Command)', 'Multiple selection (use Checkbox group)'],
    },
  },

  // ── CHECKBOX ────────────────────────────────────────────────────
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description: 'A binary form control — checked, unchecked, or indeterminate. Use in forms and multi-select lists.',
    variants: ['default', 'indeterminate'],
    previewType: 'checkbox',
    states: [
      { name: 'unchecked', description: 'Empty box — not selected' },
      { name: 'checked', description: 'Checkmark — selected' },
      { name: 'indeterminate', description: 'Partial selection of sub-items' },
      { name: 'disabled', description: 'Non-interactive — grayed out' },
      { name: 'focused', description: 'Keyboard focus ring visible' },
    ],
    tokenDeps: [
      { tokenId: 'checkbox/bg-checked', label: 'Checked BG', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'checkbox/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-300', currentValue: '#d1d5db' },
      { tokenId: 'checkbox/check-color', label: 'Check Icon', semanticRef: 'text/on-emphasis', primitiveRef: 'white', currentValue: '#ffffff' },
    ],
    accessibility: [
      { rule: 'role="checkbox" with aria-checked', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Space key toggles state', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Visible focus indicator', wcag: '2.4.7', level: 'AA', passes: true },
      { rule: 'Label associated via htmlFor or wrapping', wcag: '1.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Multi-select binary choice in a form — submission captures selected state.',
      useWhen: ['Multi-selection in forms (permissions, preferences)', 'Agreeing to terms', '"Select all" with indeterminate parent'],
      avoidWhen: ['Immediate effect (use Switch)', 'Single binary setting (use Switch)', 'Mutually exclusive options (use RadioGroup)'],
    },
    codeExample: `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="terms" onCheckedChange={setAccepted} />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Multi-select with select all
<div className="flex items-center gap-2">
  <Checkbox
    id="select-all"
    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
    onCheckedChange={handleSelectAll}
  />
  <Label htmlFor="select-all">Select all ({count})</Label>
</div>`,
    semanticRole: 'multi-select form control — captures discrete boolean choices for form submission',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Form multi-selection', 'Terms agreements', '"Select all" patterns'],
      avoidWhen: ['Immediate effects (use Switch)', 'Mutually exclusive choices (use Radio)'],
    },
  },

  // ── RADIO GROUP ─────────────────────────────────────────────────
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Forms',
    description: 'Mutually exclusive options — selecting one deselects all others. For choosing one from a small set.',
    variants: ['default', 'card-style'],
    previewType: 'checkbox',
    states: [
      { name: 'unselected', description: 'Empty circle' },
      { name: 'selected', description: 'Filled dot in circle' },
      { name: 'disabled', description: 'Non-interactive' },
      { name: 'focused', description: 'Keyboard focus ring' },
    ],
    tokenDeps: [
      { tokenId: 'radio/indicator', label: 'Selected Dot', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'radio/border', label: 'Ring Border', semanticRef: 'border/default', primitiveRef: 'gray-300', currentValue: '#d1d5db' },
    ],
    accessibility: [
      { rule: 'role="radiogroup" containing role="radio"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow keys navigate between options in group', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Only selected item in tab order', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'One-of-N selection — enforces mutual exclusivity in a form field.',
      useWhen: ['2-5 mutually exclusive options (plan selection, gender, preference)', 'All options should be visible simultaneously'],
      avoidWhen: ['More than 5 options (use Select)', 'Multi-select needed (use Checkbox)', 'Immediate effect (use SegmentedControl/Tabs)'],
    },
    codeExample: `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

<RadioGroup defaultValue="monthly" onValueChange={setBilling}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="monthly" id="monthly" />
    <Label htmlFor="monthly">Monthly — $12/mo</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="annual" id="annual" />
    <Label htmlFor="annual">Annual — $99/yr</Label>
  </div>
</RadioGroup>`,
    semanticRole: 'exclusive selector — enforces one-of-N constraint within a form field group',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['2-5 exclusive options all visible at once', 'Plan/preference selection'],
      avoidWhen: ['More than 5 (use Select)', 'Multi-select (use Checkbox)'],
    },
  },

  // ── SWITCH ──────────────────────────────────────────────────────
  {
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'An accessible toggle switch using Radix UI — semantic alternative to our custom Toggle for form contexts.',
    variants: ['default', 'sm'],
    previewType: 'toggle',
    states: [
      { name: 'off', description: 'Inactive state — gray track' },
      { name: 'on', description: 'Active state — brand color track' },
      { name: 'disabled', description: 'Non-interactive' },
      { name: 'focused', description: 'Focus ring visible' },
    ],
    tokenDeps: [
      { tokenId: 'switch/track-on', label: 'Track On', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'switch/track-off', label: 'Track Off', semanticRef: 'surface/subtle', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'switch/thumb', label: 'Thumb', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
    ],
    accessibility: [
      { rule: 'role="switch" with aria-checked', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Space key toggles', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Visible focus indicator', wcag: '2.4.7', level: 'AA', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Immediate-effect binary setting — flipping it applies change right away.',
      useWhen: ['Settings with immediate effect (dark mode, notifications)', 'Feature enable/disable'],
      avoidWhen: ['Form submission (use Checkbox)', 'Multi-option selection (use RadioGroup)'],
    },
    codeExample: `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-3">
  <Switch id="dark-mode" checked={isDark} onCheckedChange={setIsDark} />
  <Label htmlFor="dark-mode">Dark mode</Label>
</div>`,
    semanticRole: 'immediate-effect binary control — signals an on/off setting that applies instantly',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Settings with instant application', 'Feature flags'],
      avoidWhen: ['Form checkboxes that submit later', 'Multi-choice scenarios'],
    },
  },

  // ── SLIDER ──────────────────────────────────────────────────────
  {
    id: 'slider',
    name: 'Slider',
    category: 'Forms',
    description: 'A range input for selecting numeric values within a defined min/max range.',
    variants: ['default', 'range', 'step'],
    previewType: 'slider',
    states: [
      { name: 'default', description: 'At default value' },
      { name: 'dragging', description: 'Thumb being dragged' },
      { name: 'focused', description: 'Arrow keys adjust value' },
      { name: 'disabled', description: 'Non-interactive' },
    ],
    tokenDeps: [
      { tokenId: 'slider/track', label: 'Track BG', semanticRef: 'surface/subtle', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'slider/range', label: 'Filled Range', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'slider/thumb', label: 'Thumb', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
    ],
    accessibility: [
      { rule: 'role="slider" with aria-valuenow/min/max/valuetext', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow keys increment/decrement value', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Continuous or stepped numeric input where range and relative position matter.',
      useWhen: ['Volume/opacity/zoom controls', 'Price range filters', 'AI parameter tuning (temperature, creativity)'],
      avoidWhen: ['Precise numeric input (use number Input)', 'Discrete option selection (use RadioGroup)', 'Boolean (use Switch)'],
    },
    codeExample: `import { Slider } from '@/components/ui/slider'

// Single value
<Slider defaultValue={[50]} max={100} step={1} onValueChange={setValue} />

// Range
<Slider defaultValue={[20, 80]} max={100} step={5} onValueChange={setRange} />`,
    semanticRole: 'range selector — continuous or stepped numeric value within a bounded scale',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Continuous numeric ranges', 'Price/volume/intensity filters', 'AI parameter sliders'],
      avoidWhen: ['Precise exact values (use Input[type=number])', 'Discrete choices (use Radio/Select)'],
    },
  },

  // ── LABEL ───────────────────────────────────────────────────────
  {
    id: 'label',
    name: 'Label',
    category: 'Forms',
    description: 'An accessible label element that associates text with a form control.',
    variants: ['default', 'required', 'optional'],
    previewType: 'badge',
    states: [
      { name: 'default', description: 'Static label text' },
      { name: 'peer-disabled', description: 'Dims when associated input is disabled' },
    ],
    tokenDeps: [
      { tokenId: 'label/text', label: 'Text Color', semanticRef: 'text/default', primitiveRef: 'gray-700', currentValue: '#374151' },
      { tokenId: 'label/font-size', label: 'Font Size', semanticRef: 'text/sm', primitiveRef: 'text-sm', currentValue: '14px' },
    ],
    accessibility: [
      { rule: 'htmlFor links label to input id', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Click on label focuses associated control', wcag: '2.5.3', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Associates readable text with a form input for accessibility and usability.',
      useWhen: ['All form inputs must have a Label', 'Checkbox and radio items'],
      avoidWhen: ['Decorative text (use p/span)', 'Button labels (use button text content)'],
    },
    codeExample: `import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
    semanticRole: 'form field identifier — semantic text association for accessible input labeling',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Every form input needs a label', 'Checkboxes and radio buttons'],
      avoidWhen: ['Decorative text', 'Visible button labels (those are in button content)'],
    },
  },

  // ── TEXTAREA ────────────────────────────────────────────────────
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    description: 'A multi-line text input for longer form content like descriptions, messages, or notes.',
    variants: ['default', 'auto-resize'],
    previewType: 'input',
    states: [
      { name: 'empty', description: 'Placeholder visible' },
      { name: 'focused', description: 'Border emphasized' },
      { name: 'filled', description: 'Content entered' },
      { name: 'disabled', description: 'Read-only appearance' },
      { name: 'error', description: 'Validation failed' },
    ],
    tokenDeps: [
      { tokenId: 'textarea/bg', label: 'Background', semanticRef: 'surface/sunken', primitiveRef: 'gray-50', currentValue: '#f9fafb' },
      { tokenId: 'textarea/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'textarea/min-height', label: 'Min Height', semanticRef: 'layout/textarea', primitiveRef: '80px', currentValue: '80px' },
    ],
    accessibility: [
      { rule: 'Associated Label via htmlFor/id', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Resize handle accessible — keyboard resize via Shift+Arrow', wcag: '2.1.1', level: 'A', passes: false, detail: 'CSS resize:vertical handles mouse only' },
    ],
    aiRules: {
      semanticIntent: 'Captures longer free-form text input in a multi-line field.',
      useWhen: ['Message composition', 'Bio/description fields', 'Code or JSON input', 'Feedback forms'],
      avoidWhen: ['Short single-line input (use Input)', 'Rich text (use RichTextEditor)', 'Structured data (use form fields)'],
    },
    codeExample: `import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Type your message here..."
    rows={4}
    value={message}
    onChange={e => setMessage(e.target.value)}
  />
</div>`,
    semanticRole: 'multi-line text input — captures extended free-form text content',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Multi-line text: messages, descriptions, code', 'Any field expecting paragraph-length input'],
      avoidWhen: ['Single-line inputs (use Input)', 'Rich text formatting needed'],
    },
  },

  // ── FORM ────────────────────────────────────────────────────────
  {
    id: 'form',
    name: 'Form',
    category: 'Forms',
    description: 'React Hook Form + Zod validation wrapper — manages field state, errors, and submission lifecycle.',
    variants: ['default'],
    previewType: 'input',
    states: [
      { name: 'pristine', description: 'Untouched initial state' },
      { name: 'dirty', description: 'User has edited fields' },
      { name: 'invalid', description: 'Validation errors present' },
      { name: 'submitting', description: 'Async submission in progress' },
      { name: 'submitted', description: 'Success state' },
    ],
    tokenDeps: [
      { tokenId: 'form/error-text', label: 'Error Text', semanticRef: 'text/danger', primitiveRef: 'red-600', currentValue: '#dc2626' },
      { tokenId: 'form/description', label: 'Field Description', semanticRef: 'text/subtle', primitiveRef: 'gray-500', currentValue: '#6b7280' },
    ],
    accessibility: [
      { rule: 'aria-describedby links field to description and error', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'Invalid fields marked with aria-invalid="true"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Error messages programmatically associated', wcag: '3.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Orchestrates validated form submission with field-level error messaging.',
      useWhen: ['Any form with validation (login, signup, settings, checkout)', 'Forms with async submission'],
      avoidWhen: ['Single unrelated inputs', 'Read-only data display', 'Controlled inputs not requiring submission'],
    },
    codeExample: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({ email: z.string().email() })

function SignupForm() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  )
}`,
    semanticRole: 'form orchestrator — manages field state, validation, and submission for data collection',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Any form with validation', 'Multi-field data collection', 'Async submission handling'],
      avoidWhen: ['Single standalone inputs', 'Read-only data display', 'Non-submittable controls'],
    },
  },

  // ── COMMAND ─────────────────────────────────────────────────────
  {
    id: 'command',
    name: 'Command',
    category: 'Forms',
    description: 'A command palette / combobox with fuzzy search — keyboard-driven selection from a large list.',
    variants: ['default', 'dialog', 'popover'],
    previewType: 'input',
    states: [
      { name: 'empty', description: 'Search prompt visible' },
      { name: 'searching', description: 'Query entered, filtered results' },
      { name: 'no-results', description: 'No match message' },
      { name: 'item-selected', description: 'Item highlighted via keyboard' },
    ],
    tokenDeps: [
      { tokenId: 'command/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'command/item-hover', label: 'Item Active', semanticRef: 'accent/subtle', primitiveRef: 'blue-50', currentValue: '#eff6ff' },
      { tokenId: 'command/separator', label: 'Group Separator', semanticRef: 'border/subtle', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'role="combobox" with role="listbox" results', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation in list', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'aria-activedescendant tracks highlighted item', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Keyboard-first search-and-select — power user shortcut for large option sets.',
      useWhen: ['Command palette (⌘K)', 'Searchable large selects (countries, emojis, icons)', 'Global search', 'Quick-switch navigation'],
      avoidWhen: ['Small option sets < 10 (use Select or RadioGroup)', 'Non-searchable fixed lists', 'Mobile-primary (virtual keyboard conflicts)'],
    },
    codeExample: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

<Command>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem onSelect={() => router.push('/settings')}>Settings</CommandItem>
      <CommandItem onSelect={() => router.push('/profile')}>Profile</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    semanticRole: 'keyboard command launcher — fuzzy-search interface for power-user action dispatch',
    compatibleProfileIds: ['enterprise', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Command palette (⌘K)', 'Large searchable option sets', 'Developer tools, admin interfaces'],
      avoidWhen: ['Small option sets (use Select)', 'Mobile-primary', 'Casual consumer apps'],
    },
  },

  // ── ACCORDION ───────────────────────────────────────────────────
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Data Display',
    description: 'Expandable/collapsible sections — reveals content progressively to reduce visual complexity.',
    variants: ['single', 'multiple', 'bordered'],
    previewType: 'accordion',
    states: [
      { name: 'collapsed', description: 'Only header visible' },
      { name: 'expanded', description: 'Content panel revealed with animation' },
      { name: 'focused', description: 'Focus ring on trigger' },
    ],
    tokenDeps: [
      { tokenId: 'accordion/border', label: 'Item Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'accordion/trigger-hover', label: 'Trigger Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
      { tokenId: 'accordion/content-pad', label: 'Content Padding', semanticRef: 'spacing/component', primitiveRef: 'space-4', currentValue: '16px' },
    ],
    accessibility: [
      { rule: 'role="button" with aria-expanded on trigger', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-controls links trigger to content panel', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Space/Enter toggles section', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Progressive disclosure — hides secondary content behind expand interaction.',
      useWhen: ['FAQ sections', 'Settings with many options', 'Expandable help content', 'Step-by-step instructions'],
      avoidWhen: ['Content that must be visible by default', 'Sequential steps (use Stepper)', 'Short content (just show it)'],
    },
    codeExample: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is included?</AccordionTrigger>
    <AccordionContent>All plans include unlimited projects and team members.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
    <AccordionContent>Yes, no questions asked.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    semanticRole: 'progressive disclosure — reveals content on demand to reduce initial cognitive load',
    interactionTokenRefs: ['motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'ai-native'],
    usageRules: {
      useWhen: ['FAQs', 'Settings panels', 'Long help content needing summary'],
      avoidWhen: ['Content must be visible by default', 'Sequential steps', 'Very short content'],
    },
  },

  // ── ALERT ───────────────────────────────────────────────────────
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    description: 'An inline contextual message — informs users of status, warnings, errors, or tips without interruption.',
    variants: ['default', 'destructive', 'success', 'warning', 'info'],
    previewType: 'alert',
    states: [
      { name: 'default', description: 'Informational — neutral tone' },
      { name: 'destructive', description: 'Error or danger — red palette' },
    ],
    tokenDeps: [
      { tokenId: 'alert/bg', label: 'Background', semanticRef: 'surface/subtle', primitiveRef: 'gray-50', currentValue: '#f9fafb' },
      { tokenId: 'alert/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'alert/icon-color', label: 'Icon Color', semanticRef: 'text/default', primitiveRef: 'gray-700', currentValue: '#374151' },
    ],
    accessibility: [
      { rule: 'role="alert" for live announcements or role="status" for polite', wcag: '4.1.3', level: 'AA', passes: true },
      { rule: 'Sufficient color contrast for text', wcag: '1.4.3', level: 'AA', passes: true },
      { rule: 'Icon + text (never icon alone for meaning)', wcag: '1.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Non-blocking inline message communicating status, warnings, or guidance.',
      useWhen: ['Form validation summaries', 'Deprecation notices', 'Feature tips', 'Permission warnings'],
      avoidWhen: ['Ephemeral feedback after action (use Toast)', 'Blocking confirmations (use Dialog)', 'Decoration (use Card)'],
    },
    codeExample: `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

// Warning alert
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Authentication error</AlertTitle>
  <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
</Alert>

// Success alert
<Alert>
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>Your subscription is now active.</AlertDescription>
</Alert>`,
    semanticRole: 'status communicator — persistent inline message for non-blocking contextual feedback',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Persistent warnings/errors on a page', 'Tips, deprecation notices, info banners'],
      avoidWhen: ['Transient feedback (use Sonner/Toast)', 'Blocking confirmations (use Dialog)'],
    },
  },

  // ── PROGRESS ────────────────────────────────────────────────────
  {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback',
    description: 'A linear progress bar — communicates completion percentage for determinate tasks.',
    variants: ['default', 'indeterminate', 'striped'],
    previewType: 'progress',
    states: [
      { name: '0%', description: 'Not started' },
      { name: 'in-progress', description: 'Filling from left to right' },
      { name: '100%', description: 'Complete' },
      { name: 'indeterminate', description: 'Unknown duration — animated loop' },
    ],
    tokenDeps: [
      { tokenId: 'progress/track', label: 'Track BG', semanticRef: 'surface/subtle', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'progress/fill', label: 'Fill Color', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'progress/height', label: 'Height', semanticRef: 'sizing/xs', primitiveRef: '8px', currentValue: '8px' },
    ],
    accessibility: [
      { rule: 'role="progressbar" with aria-valuenow/min/max', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-label or aria-labelledby for context', wcag: '1.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Communicates task completion state — reduces uncertainty during waits.',
      useWhen: ['File uploads', 'Multi-step onboarding', 'Profile completion indicators', 'Loading states with known duration'],
      avoidWhen: ['Unknown duration (use Skeleton or Spinner)', 'Very fast operations < 300ms', 'Page-level loading (use page skeleton)'],
    },
    codeExample: `import { Progress } from '@/components/ui/progress'

// Determinate
<Progress value={uploadProgress} className="w-full" aria-label="Upload progress" />

// Indeterminate (pass no value or undefined)
<Progress aria-label="Loading..." />`,
    semanticRole: 'completion indicator — communicates known-duration task progress to reduce user anxiety',
    interactionTokenRefs: ['motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['File uploads, multi-step flows, profile completion'],
      avoidWhen: ['Unknown duration (use Skeleton)', 'Sub-300ms operations'],
    },
  },

  // ── SKELETON ────────────────────────────────────────────────────
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    description: 'Animated placeholder shapes that preview content layout while data loads — reduces perceived wait time.',
    variants: ['text', 'circle', 'card', 'table-row'],
    previewType: 'skeleton',
    states: [
      { name: 'loading', description: 'Pulsing animation active' },
      { name: 'resolved', description: 'Hidden — replaced by real content' },
    ],
    tokenDeps: [
      { tokenId: 'skeleton/bg', label: 'Base Color', semanticRef: 'surface/subtle', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'skeleton/shimmer', label: 'Shimmer Highlight', semanticRef: 'surface/mid', primitiveRef: 'gray-300', currentValue: '#d1d5db' },
      { tokenId: 'skeleton/radius', label: 'Radius', semanticRef: 'radius/sm', primitiveRef: 'radius-sm', currentValue: '4px' },
    ],
    accessibility: [
      { rule: 'aria-busy="true" on container while loading', wcag: '4.1.3', level: 'AA', passes: true },
      { rule: 'Skeleton elements hidden from screen readers (aria-hidden)', wcag: '1.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Reduces perceived loading time by showing structural placeholder before data.',
      useWhen: ['Initial page load', 'List/feed loading', 'Dashboard widget loading', 'Card content loading'],
      avoidWhen: ['Known fast data < 100ms (flash is worse)', 'Indeterminate content structure', 'Simple spinner suffices'],
    },
    codeExample: `import { Skeleton } from '@/components/ui/skeleton'

// Card skeleton
<div className="flex gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`,
    semanticRole: 'loading placeholder — structural preview that communicates layout before data arrives',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Data loading states where structure is known', 'Lists, cards, dashboards'],
      avoidWhen: ['Sub-100ms loads', 'Unknown content structure', 'Inline spinners suffice'],
    },
  },

  // ── SONNER (TOAST) ──────────────────────────────────────────────
  {
    id: 'sonner',
    name: 'Toast (Sonner)',
    category: 'Feedback',
    description: 'Non-blocking ephemeral notifications — confirms actions, communicates async results, or shows errors.',
    variants: ['default', 'success', 'error', 'warning', 'loading', 'action'],
    previewType: 'badge',
    states: [
      { name: 'entering', description: 'Slides in from edge' },
      { name: 'visible', description: 'Displayed with auto-dismiss timer' },
      { name: 'exiting', description: 'Fades/slides out' },
    ],
    tokenDeps: [
      { tokenId: 'toast/bg', label: 'Background', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'toast/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'toast/shadow', label: 'Shadow', semanticRef: 'shadow/lg', primitiveRef: 'shadow-lg', currentValue: '0 10px 15px rgb(0,0,0,0.1)' },
    ],
    accessibility: [
      { rule: 'role="status" (polite) or role="alert" (assertive)', wcag: '4.1.3', level: 'AA', passes: true },
      { rule: 'Auto-dismiss with sufficient duration (4-5s minimum)', wcag: '2.2.1', level: 'A', passes: true },
      { rule: 'Can be dismissed manually', wcag: '2.2.4', level: 'AAA', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Ephemeral feedback for completed actions — confirms without blocking workflow.',
      useWhen: ['Post-action confirmation (saved, deleted, sent)', 'Async operation result', 'Non-critical error feedback'],
      avoidWhen: ['Critical errors requiring action (use Alert or Dialog)', 'Complex interactive content (use Popover)', 'Persistent messages'],
    },
    codeExample: `import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

// In your app layout:
<Toaster position="bottom-right" />

// To trigger:
toast.success('Changes saved!')
toast.error('Failed to save. Try again.')
toast('File uploaded', {
  action: { label: 'View', onClick: () => router.push('/files') }
})`,
    semanticRole: 'ephemeral notification — transient feedback confirming completed operations',
    interactionTokenRefs: ['motion/quick'],
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'native-mobile', 'ai-native'],
    usageRules: {
      useWhen: ['Action confirmation (save, delete, send)', 'Async results', 'Non-critical errors'],
      avoidWhen: ['Critical errors needing user input', 'Persistent status', 'Complex content'],
    },
  },

  // ── TABLE ───────────────────────────────────────────────────────
  {
    id: 'table',
    name: 'Table',
    category: 'Data Display',
    description: 'Structured data display with headers, rows, and cells — the foundation for data-dense admin and dashboard views.',
    variants: ['default', 'striped', 'bordered', 'compact'],
    previewType: 'table',
    states: [
      { name: 'default', description: 'Static data display' },
      { name: 'row-hover', description: 'Row highlighted on hover' },
      { name: 'row-selected', description: 'Row marked as selected' },
      { name: 'loading', description: 'Skeleton rows shown' },
    ],
    tokenDeps: [
      { tokenId: 'table/header-bg', label: 'Header BG', semanticRef: 'surface/subtle', primitiveRef: 'gray-50', currentValue: '#f9fafb' },
      { tokenId: 'table/border', label: 'Row Border', semanticRef: 'border/subtle', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
      { tokenId: 'table/row-hover', label: 'Row Hover', semanticRef: 'surface/hover', primitiveRef: 'gray-50', currentValue: '#f9fafb' },
      { tokenId: 'table/selected', label: 'Selected Row', semanticRef: 'accent/subtle', primitiveRef: 'blue-50', currentValue: '#eff6ff' },
    ],
    accessibility: [
      { rule: 'role="table" with role="columnheader" in thead', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'scope="col" on th elements', wcag: '1.3.1', level: 'A', passes: true },
      { rule: 'caption element or aria-label for table', wcag: '1.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Displays structured relational data for scanning, comparing, and managing records.',
      useWhen: ['Admin data management (users, orders, logs)', 'Comparing multiple records', 'Sortable/filterable data sets'],
      avoidWhen: ['Single item details (use Card)', 'Non-relational content (use List)', 'Mobile-primary small screens'],
    },
    codeExample: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell className="text-right">
          <Badge>{user.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
    semanticRole: 'data grid — structured tabular display for comparing and managing relational records',
    compatibleProfileIds: ['enterprise', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Admin interfaces', 'Data comparison', 'Multi-attribute record management'],
      avoidWhen: ['Single records (use Card)', 'Simple lists (use ul/li)', 'Mobile-primary screens'],
    },
  },

  // ── CALENDAR ────────────────────────────────────────────────────
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'Data Display',
    description: 'A date picker calendar — single date, date range, or multi-date selection with react-day-picker.',
    variants: ['single', 'range', 'multiple'],
    previewType: 'calendar',
    states: [
      { name: 'default', description: 'Current month shown' },
      { name: 'date-selected', description: 'Selected date(s) highlighted' },
      { name: 'range-selected', description: 'Start, middle, and end highlighted' },
      { name: 'date-disabled', description: 'Past dates or excluded dates grayed' },
    ],
    tokenDeps: [
      { tokenId: 'calendar/selected', label: 'Selected Day', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
      { tokenId: 'calendar/today', label: 'Today Highlight', semanticRef: 'accent/subtle', primitiveRef: 'blue-50', currentValue: '#eff6ff' },
      { tokenId: 'calendar/range-middle', label: 'Range Middle', semanticRef: 'accent/subtle', primitiveRef: 'blue-100', currentValue: '#dbeafe' },
    ],
    accessibility: [
      { rule: 'role="grid" with role="gridcell"', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation between days', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'aria-selected on selected dates', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-disabled on unavailable dates', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Visual date selection — spatially oriented picker for date or range inputs.',
      useWhen: ['Date of birth fields', 'Booking date selection', 'Report date range filters', 'Scheduling'],
      avoidWhen: ['Known dates user will type (use Input[type=date])', 'Time selection (add a time picker)', 'Far-future dates (add year navigation)'],
    },
    codeExample: `import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

// Single date
const [date, setDate] = useState<Date>()
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<DateRange>()
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />`,
    semanticRole: 'date selector — visual spatial picker for date and date-range form inputs',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Date pickers, booking flows, scheduling, report filters'],
      avoidWhen: ['Users prefer typed input', 'Very specific times (add time picker)', 'Far-future dates without year nav'],
    },
  },

  // ── CAROUSEL ────────────────────────────────────────────────────
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data Display',
    description: 'A horizontal scroll container with prev/next navigation — for image galleries, card sequences, or step flows.',
    variants: ['default', 'loop', 'autoplay', 'vertical'],
    previewType: 'carousel',
    states: [
      { name: 'default', description: 'First slide visible' },
      { name: 'transitioning', description: 'Animated slide change' },
      { name: 'at-start', description: 'Previous disabled' },
      { name: 'at-end', description: 'Next disabled' },
    ],
    tokenDeps: [
      { tokenId: 'carousel/button-bg', label: 'Nav Button BG', semanticRef: 'surface/overlay', primitiveRef: 'white', currentValue: '#ffffff' },
      { tokenId: 'carousel/button-border', label: 'Nav Button Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'role="region" with aria-label on carousel', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Prev/Next buttons keyboard accessible', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'Pause autoplay on keyboard focus or hover', wcag: '2.2.2', level: 'AA', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Sequential content browsing — reveals items one at a time with directional navigation.',
      useWhen: ['Image galleries', 'Onboarding step sequences', 'Product feature highlights', 'Testimonial sliders'],
      avoidWhen: ['Content needing comparison (show all)', 'Data that should be scannable (use Grid)', 'Long content sequences > 10 items'],
    },
    codeExample: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

<Carousel className="w-full max-w-sm">
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i}>
        <Card><CardContent className="p-6">{item.title}</CardContent></Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    semanticRole: 'sequential content viewer — one-at-a-time browsing for ordered item sets',
    interactionTokenRefs: ['motion/quick'],
    compatibleProfileIds: ['premium', 'playful', 'native-mobile'],
    usageRules: {
      useWhen: ['Galleries, feature highlights, onboarding tours, testimonials'],
      avoidWhen: ['Comparable items (show all)', 'Large data sets (use virtual list)', 'Critical content (carousel hides items)'],
    },
  },

  // ── COLLAPSIBLE ─────────────────────────────────────────────────
  {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'Data Display',
    description: 'A primitive show/hide container — lower level than Accordion, for custom expandable sections.',
    variants: ['default'],
    previewType: 'accordion',
    states: [
      { name: 'closed', description: 'Content hidden' },
      { name: 'open', description: 'Content revealed' },
    ],
    tokenDeps: [
      { tokenId: 'collapsible/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'Trigger has aria-expanded', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'aria-controls links trigger to content', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Low-level collapsible primitive for custom show/hide interactions.',
      useWhen: ['Custom expandable sections not suited to Accordion pattern', 'Show more/less text truncation', 'Sidebar section toggling'],
      avoidWhen: ['FAQ-style groups (use Accordion)', 'Navigation (use NavigationMenu)'],
    },
    codeExample: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center justify-between">
    <span className="font-medium">Starred repositories</span>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon"><ChevronsUpDown /></Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>
    {/* content */}
  </CollapsibleContent>
</Collapsible>`,
    semanticRole: 'show/hide primitive — toggles content visibility for custom expandable patterns',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Custom expandable UI not fitting Accordion', 'Show more/less, sidebar sections'],
      avoidWhen: ['FAQ groups (Accordion)', 'Navigation patterns'],
    },
  },

  // ── RESIZABLE ───────────────────────────────────────────────────
  {
    id: 'resizable',
    name: 'Resizable',
    category: 'Layout',
    description: 'Draggable panel dividers that let users resize adjacent panes — for IDE-style or split-view layouts.',
    variants: ['horizontal', 'vertical', 'nested'],
    previewType: 'resizable',
    states: [
      { name: 'default', description: 'Panels at default sizes' },
      { name: 'dragging', description: 'Divider being dragged — cursor changes' },
      { name: 'collapsed', description: 'Panel collapsed to minimum size' },
    ],
    tokenDeps: [
      { tokenId: 'resizable/handle-bg', label: 'Handle BG', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'resizable/handle-hover', label: 'Handle Hover', semanticRef: 'accent/default', primitiveRef: 'blue-600', currentValue: '#2563eb' },
    ],
    accessibility: [
      { rule: 'Resize handle keyboard accessible (arrow keys)', wcag: '2.1.1', level: 'A', passes: true },
      { rule: 'role="separator" with aria-orientation', wcag: '4.1.2', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Gives users control over layout proportions in multi-pane interfaces.',
      useWhen: ['Code editors (file tree + editor + output)', 'Email clients (list + detail)', 'Dashboard with adjustable widgets'],
      avoidWhen: ['Simple single-column layouts', 'Mobile (drag precision issues)', 'Fixed-ratio layouts'],
    },
    codeExample: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'

<ResizablePanelGroup direction="horizontal" className="h-screen">
  <ResizablePanel defaultSize={25} minSize={15}>
    <div className="p-4">Sidebar</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    <div className="p-4">Main content</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    semanticRole: 'layout controller — user-adjustable panel sizing for complex multi-pane workspaces',
    compatibleProfileIds: ['enterprise', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['IDE layouts', 'Email/message clients', 'Admin split views'],
      avoidWhen: ['Mobile', 'Simple single-panel layouts', 'Fixed-ratio designs'],
    },
  },

  // ── ASPECT RATIO ────────────────────────────────────────────────
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Layout',
    description: 'Constrains child content to a defined aspect ratio — prevents layout shift during image/video loading.',
    variants: ['1/1', '16/9', '4/3', '21/9', 'custom'],
    previewType: 'card',
    states: [
      { name: 'default', description: 'Content maintains ratio at any container width' },
    ],
    tokenDeps: [
      { tokenId: 'aspect-ratio/bg', label: 'Placeholder BG', semanticRef: 'surface/subtle', primitiveRef: 'gray-100', currentValue: '#f3f4f6' },
    ],
    accessibility: [
      { rule: 'Images inside have alt text', wcag: '1.1.1', level: 'A', passes: true, detail: 'alt must be set on <img> child' },
    ],
    aiRules: {
      semanticIntent: 'Maintains consistent proportions to prevent layout shift — especially for media.',
      useWhen: ['Image cards', 'Video embeds', 'Thumbnail grids', 'Any media needing consistent dimensions'],
      avoidWhen: ['Text-only content', 'Intrinsically sized elements', 'Content where crop/overflow is unacceptable'],
    },
    codeExample: `import { AspectRatio } from '@/components/ui/aspect-ratio'

// 16:9 video embed
<div className="w-full max-w-2xl">
  <AspectRatio ratio={16 / 9}>
    <img src="/thumbnail.jpg" alt="Course preview" className="object-cover w-full h-full rounded-lg" />
  </AspectRatio>
</div>

// Square image card
<AspectRatio ratio={1}>
  <img src="/product.jpg" alt="Product" className="object-cover w-full h-full" />
</AspectRatio>`,
    semanticRole: 'proportion container — enforces consistent media dimensions to prevent layout shift',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'playful', 'ai-native'],
    usageRules: {
      useWhen: ['Images, videos, thumbnails needing consistent ratios'],
      avoidWhen: ['Text content', 'Elements that should grow freely'],
    },
  },

  // ── SEPARATOR ───────────────────────────────────────────────────
  {
    id: 'separator',
    name: 'Separator',
    category: 'Layout',
    description: 'A visual and semantic divider between content sections — horizontal or vertical.',
    variants: ['horizontal', 'vertical'],
    previewType: 'separator',
    states: [
      { name: 'default', description: 'Static line' },
    ],
    tokenDeps: [
      { tokenId: 'separator/color', label: 'Color', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
      { tokenId: 'separator/thickness', label: 'Thickness', semanticRef: 'sizing/px', primitiveRef: '1px', currentValue: '1px' },
    ],
    accessibility: [
      { rule: 'role="separator" with aria-orientation', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Decorative separators use role="none" or aria-hidden', wcag: '1.3.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Visually and semantically separates distinct groups of content.',
      useWhen: ['Dividing sections in forms', 'Separating groups in menus/dropdowns', 'Visual rhythm in dense layouts'],
      avoidWhen: ['Between every item (use spacing instead)', 'As decoration only (use margin/padding)'],
    },
    codeExample: `import { Separator } from '@/components/ui/separator'

// Between sections
<div>
  <h2>Account</h2>
  <Separator className="my-4" />
  <h2>Billing</h2>
</div>

// Vertical in flex layout
<div className="flex h-5 items-center gap-4">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`,
    semanticRole: 'content divider — semantic and visual boundary between distinct content groups',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['Grouping related items', 'Dividing sections', 'Menu item groups'],
      avoidWhen: ['Pure decoration (use spacing)', 'Between every item'],
    },
  },

  // ── TOGGLE GROUP ─────────────────────────────────────────────────
  {
    id: 'toggle-group',
    name: 'Toggle Group',
    category: 'Actions',
    description: 'A group of toggle buttons with single or multiple selection — like a segmented control.',
    variants: ['single', 'multiple', 'outline', 'default'],
    previewType: 'toggle-group',
    states: [
      { name: 'default', description: 'No selection' },
      { name: 'selected', description: 'One or more items active' },
      { name: 'hover', description: 'Item highlighted' },
    ],
    tokenDeps: [
      { tokenId: 'toggle-group/active', label: 'Active Item', semanticRef: 'surface/emphasis', primitiveRef: 'gray-900', currentValue: '#111827' },
      { tokenId: 'toggle-group/border', label: 'Border', semanticRef: 'border/default', primitiveRef: 'gray-200', currentValue: '#e5e7eb' },
    ],
    accessibility: [
      { rule: 'role="group" containing role="radio" (single) or role="checkbox" (multiple)', wcag: '4.1.2', level: 'A', passes: true },
      { rule: 'Arrow key navigation within group', wcag: '2.1.1', level: 'A', passes: true },
    ],
    aiRules: {
      semanticIntent: 'Compact segmented selection — mutually exclusive or additive mode switching.',
      useWhen: ['View mode toggle (List/Grid/Map)', 'Text formatting (Bold/Italic/Underline)', 'Filter toggles', 'Time range selectors (1D/1W/1M)'],
      avoidWhen: ['More than 5 options (use Tabs or Select)', 'Boolean only (use Switch)', 'Navigation (use Tabs)'],
    },
    codeExample: `import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LayoutList, LayoutGrid, Map } from 'lucide-react'

<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroupItem value="list" aria-label="List view"><LayoutList /></ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="Grid view"><LayoutGrid /></ToggleGroupItem>
  <ToggleGroupItem value="map" aria-label="Map view"><Map /></ToggleGroupItem>
</ToggleGroup>`,
    semanticRole: 'segmented controller — exclusive or multi-select mode switching in compact form',
    compatibleProfileIds: ['minimal', 'enterprise', 'premium', 'cyber', 'ai-native'],
    usageRules: {
      useWhen: ['View mode switching', 'Formatting toolbars', 'Compact filter toggles'],
      avoidWhen: ['5+ options (use Tabs)', 'Boolean (use Switch)', 'Primary navigation'],
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
