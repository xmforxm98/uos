'use client'

import { useDesignSystem } from '@/context/DesignSystemContext'
import {
  primitiveColors, primitiveSpacing, primitiveRadius,
  primitiveTypography, primitiveMotion, primitiveShadows, primitiveGlass,
} from '@/data/primitives'
import { semanticTokens } from '@/data/semantic'
import { componentDefs } from '@/data/components'
import { interactionTokens, interactionProfiles } from '@/data/interactions'
import type { InteractionToken, InteractionProfile } from '@/data/interactions'
import type { PrimitiveToken } from '@/types'
import * as LucideIcons from 'lucide-react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub, faGitlab, faBitbucket,
  faTwitter, faXTwitter, faBluesky,
  faLinkedin, faInstagram, faFacebook, faYoutube, faTiktok, faPinterest,
  faDiscord, faSlack, faTelegram, faWhatsapp,
  faFigma, faNotion, faDropbox,
  faApple, faGoogle, faMicrosoft, faAmazon, faMeta,
  faReact, faVuejs, faAngular, faNodeJs, faPython, faRust, faSwift, faAndroid,
  faDocker, faAws, faGoogleDrive,
  faNpm, faYarn, faGit,
  faStripe, faPaypal,
  faSpotify,
  faUbuntu, faLinux, faWindows,
} from '@fortawesome/free-brands-svg-icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

function whereUsed(id: string) {
  const inSemantic = semanticTokens.filter(t =>
    t.primitiveRef === id || t.darkRef === id
  ).map(t => t.name)
  const inComponent = componentDefs
    .flatMap(c => c.tokenDeps)
    .filter(d => d.primitiveRef === id)
    .map(d => d.tokenId)
  return { semantic: inSemantic, component: inComponent }
}

function CopyOnClick({ id, value }: { id: string; value: string }) {
  const { copiedId, copyValue } = useDesignSystem()
  const copied = copiedId === id
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => copyValue(id, value)}
      className={cn(
        'value-pill h-auto w-auto px-2 py-0.5 text-[11px] font-mono rounded',
        copied && 'copied'
      )}
      title={copied ? 'Copied!' : `Copy ${value}`}
    >
      {copied ? '✓ ' : ''}{value}
    </Button>
  )
}

function ColorGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  const { setSelected } = useDesignSystem()
  const groups: Record<string, PrimitiveToken[]> = {}
  tokens.forEach(t => {
    const group = t.name.split('-')[0]
    if (!groups[group]) groups[group] = []
    groups[group].push(t)
  })

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(groups).map(([group, toks]) => (
        <div key={group}>
          <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-[0.05em] capitalize mb-2.5">
            {group}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {toks.map(t => {
              const used = whereUsed(t.id)
              const totalRefs = used.semantic.length + used.component.length
              return (
                <div key={t.id} className="flex flex-col items-center gap-1">
                  <div
                    title={`${t.name}\n${t.value}${t.description ? '\n' + t.description : ''}${totalRefs > 0 ? '\n↑ ' + totalRefs + ' refs' : ''}`}
                    onClick={() => setSelected({ type: 'primitive', id: t.id })}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer relative transition-transform duration-100 shadow-sm hover:scale-[1.08] hover:shadow-md"
                    style={{ background: t.value }}
                  >
                    {totalRefs > 0 && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent text-[8px] font-bold text-white flex items-center justify-center border-[1.5px] border-background">
                        {totalRefs > 9 ? '9+' : totalRefs}
                      </div>
                    )}
                  </div>
                  <div className="text-[8.5px] text-text-subtle text-center max-w-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {t.name.includes('-') ? t.name.split('-').slice(1).join('-') : t.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function SpacingGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div className="flex flex-col gap-1">
      {tokens.map(t => (
        <div
          key={t.id}
          className="flex items-center gap-3.5 px-3 py-2 bg-surface-mid border border-border rounded-lg transition-colors duration-75"
        >
          <div className="w-12 flex items-center">
            <div
              className="h-3.5 bg-accent rounded-[2px] min-w-[2px]"
              style={{ width: Math.min(parseInt(t.value) / 1.5 || 2, 48) }}
            />
          </div>
          <span className="text-[12px] font-mono text-text min-w-[90px]">{t.name}</span>
          <span className="text-[11.5px] font-mono text-text-muted min-w-[40px]">{t.value}</span>
          <CopyOnClick id={t.id} value={t.value} />
        </div>
      ))}
    </div>
  )
}

function ShadowGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {tokens.map(t => (
        <div
          key={t.id}
          className="flex flex-col gap-2.5 items-center p-5 bg-surface-mid border border-border rounded-xl min-w-[140px]"
        >
          <div
            className="w-16 h-16 bg-surface border border-border rounded-lg"
            style={{ boxShadow: t.value === 'none' ? 'none' : t.value }}
          />
          <div className="text-center">
            <div className="text-[12px] font-mono text-text mb-0.5">{t.name}</div>
            <CopyOnClick id={t.id} value={t.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function RadiusGrid({ tokens }: { tokens: PrimitiveToken[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {tokens.map(t => (
        <div key={t.id} className="flex flex-col gap-2.5 items-center">
          <div
            className="w-14 h-14 bg-accent-subtle border-2 border-accent"
            style={{ borderRadius: t.value }}
          />
          <div className="text-center">
            <div className="text-[11px] font-mono text-text mb-0.5">{t.name}</div>
            <div className="text-[10.5px] text-text-subtle">{t.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographyList({ tokens }: { tokens: PrimitiveToken[] }) {
  const sizes = tokens.filter(t => t.name.startsWith('text-'))
  const fonts = tokens.filter(t => t.name.startsWith('font-') && !t.name.includes('sans') && !t.name.includes('mono'))
  const families = tokens.filter(t => t.name.includes('sans') || t.name.includes('mono'))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">Type Scale</div>
        <div className="border border-border rounded-xl overflow-hidden">
          {sizes.map((t, i) => {
            const [size, lineH] = t.value.split('/')
            return (
              <div
                key={t.id}
                className={cn(
                  'flex items-center gap-4 px-4 py-2.5',
                  i < sizes.length - 1 && 'border-b border-border',
                  i % 2 === 0 ? 'bg-surface-mid' : 'bg-transparent'
                )}
              >
                <span
                  className="text-text font-medium min-w-[140px]"
                  style={{ fontSize: parseInt(size), lineHeight: 1 }}
                >
                  The quick brown fox
                </span>
                <span className="text-[11px] font-mono text-accent min-w-[60px]">{t.name}</span>
                <span className="text-[10.5px] font-mono text-text-muted">{size}</span>
                <span className="text-[10px] text-text-subtle">/ {lineH?.trim()} lh</span>
                <CopyOnClick id={t.id} value={size} />
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-2.5">Font Weight</div>
        <div className="flex gap-2.5 flex-wrap">
          {fonts.map(t => (
            <div
              key={t.id}
              className="px-[18px] py-3.5 bg-surface-mid border border-border rounded-lg"
            >
              <div
                className="text-[20px] text-text mb-1.5"
                style={{ fontWeight: parseInt(t.value) }}
              >
                Aa
              </div>
              <div className="text-[11px] font-mono text-accent">{t.name}</div>
              <div className="text-[10px] text-text-subtle mt-0.5">{t.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-2.5">Font Families</div>
        {families.map(t => (
          <div
            key={t.id}
            className="px-4 py-3.5 bg-surface-mid border border-border rounded-lg mb-2"
          >
            <div
              className="text-[15px] text-text mb-1.5"
              style={{ fontFamily: t.id.includes('mono') ? 'monospace' : 'sans-serif' }}
            >
              {t.id.includes('mono') ? 'const value = "Hello World"' : 'The quick brown fox jumps over the lazy dog.'}
            </div>
            <div className="text-[11px] font-mono text-accent">{t.name}</div>
            <div className="text-[10px] text-text-subtle mt-0.5">{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MotionList({ tokens }: { tokens: PrimitiveToken[] }) {
  const durations = tokens.filter(t => t.name.startsWith('duration-'))
  const easings = tokens.filter(t => t.name.startsWith('ease-'))
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-2.5">Duration</div>
        {durations.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3.5 px-3 py-2 bg-surface-mid border border-border rounded-lg mb-1"
          >
            <div className="w-[100px] h-1 bg-border rounded-sm overflow-hidden">
              <div
                className="h-full bg-accent rounded-sm"
                style={{ width: `${Math.min((parseInt(t.value) / 500) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[12px] font-mono text-text min-w-[120px]">{t.name}</span>
            <span className="text-[11.5px] font-mono text-text-muted">{t.value}</span>
            <CopyOnClick id={t.id} value={t.value} />
          </div>
        ))}
      </div>
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-2.5">Easing</div>
        {easings.map(t => (
          <div
            key={t.id}
            className="px-3.5 py-2.5 bg-surface-mid border border-border rounded-lg mb-1"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-mono text-text font-medium">{t.name}</span>
              <CopyOnClick id={t.id} value={t.value} />
            </div>
            <div className="text-[10.5px] font-mono text-text-subtle">{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Brand icons (Font Awesome) ───────────────────────────────────
const BRAND_ICONS: { id: string; label: string; icon: IconDefinition }[] = [
  // Dev / Version Control
  { id: 'faGithub',      label: 'GitHub',       icon: faGithub },
  { id: 'faGitlab',      label: 'GitLab',       icon: faGitlab },
  { id: 'faBitbucket',   label: 'Bitbucket',    icon: faBitbucket },
  { id: 'faGit',         label: 'Git',          icon: faGit },
  { id: 'faNpm',         label: 'npm',          icon: faNpm },
  { id: 'faYarn',        label: 'Yarn',         icon: faYarn },
  { id: 'faDocker',      label: 'Docker',       icon: faDocker },
  // Languages / Frameworks
  { id: 'faReact',       label: 'React',        icon: faReact },
  { id: 'faVuejs',       label: 'Vue.js',       icon: faVuejs },
  { id: 'faAngular',     label: 'Angular',      icon: faAngular },
  { id: 'faNodeJs',      label: 'Node.js',      icon: faNodeJs },
  { id: 'faPython',      label: 'Python',       icon: faPython },
  { id: 'faRust',        label: 'Rust',         icon: faRust },
  { id: 'faSwift',       label: 'Swift',        icon: faSwift },
  { id: 'faAndroid',     label: 'Android',      icon: faAndroid },
  // Cloud / Infra
  { id: 'faAws',         label: 'AWS',          icon: faAws },
  { id: 'faGoogleDrive', label: 'Google Drive', icon: faGoogleDrive },
  // Design / Productivity
  { id: 'faFigma',       label: 'Figma',        icon: faFigma },
  { id: 'faNotion',      label: 'Notion',       icon: faNotion },
  { id: 'faDropbox',     label: 'Dropbox',      icon: faDropbox },
  { id: 'faSlack',       label: 'Slack',        icon: faSlack },
  { id: 'faDiscord',     label: 'Discord',      icon: faDiscord },
  { id: 'faTelegram',    label: 'Telegram',     icon: faTelegram },
  { id: 'faWhatsapp',    label: 'WhatsApp',     icon: faWhatsapp },
  // Social
  { id: 'faTwitter',     label: 'Twitter',      icon: faTwitter },
  { id: 'faXTwitter',    label: 'X',            icon: faXTwitter },
  { id: 'faBluesky',     label: 'Bluesky',      icon: faBluesky },
  { id: 'faLinkedin',    label: 'LinkedIn',     icon: faLinkedin },
  { id: 'faInstagram',   label: 'Instagram',    icon: faInstagram },
  { id: 'faFacebook',    label: 'Facebook',     icon: faFacebook },
  { id: 'faYoutube',     label: 'YouTube',      icon: faYoutube },
  { id: 'faTiktok',      label: 'TikTok',       icon: faTiktok },
  { id: 'faPinterest',   label: 'Pinterest',    icon: faPinterest },
  // Big Tech
  { id: 'faApple',       label: 'Apple',        icon: faApple },
  { id: 'faGoogle',      label: 'Google',       icon: faGoogle },
  { id: 'faMicrosoft',   label: 'Microsoft',    icon: faMicrosoft },
  { id: 'faAmazon',      label: 'Amazon',       icon: faAmazon },
  { id: 'faMeta',        label: 'Meta',         icon: faMeta },
  // Payments
  { id: 'faStripe',      label: 'Stripe',       icon: faStripe },
  { id: 'faPaypal',      label: 'PayPal',       icon: faPaypal },
  // Entertainment
  { id: 'faSpotify',     label: 'Spotify',      icon: faSpotify },
  // OS
  { id: 'faUbuntu',      label: 'Ubuntu',       icon: faUbuntu },
  { id: 'faLinux',       label: 'Linux',        icon: faLinux },
  { id: 'faWindows',     label: 'Windows',      icon: faWindows },
]

// ─── Icon library ─────────────────────────────────────────────────
const ICON_CATEGORIES: Record<string, string[]> = {
  'Navigation': ['Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ChevronsLeft', 'ChevronsRight', 'Menu', 'MoreHorizontal', 'MoreVertical', 'ExternalLink', 'Link', 'Link2'],
  'Actions': ['Plus', 'Minus', 'X', 'Check', 'Search', 'Filter', 'SortAsc', 'SortDesc', 'Edit', 'Edit2', 'Edit3', 'Trash', 'Trash2', 'Copy', 'Clipboard', 'Download', 'Upload', 'Share', 'Share2', 'RefreshCw', 'RotateCcw', 'Save', 'Send'],
  'Status': ['Info', 'AlertCircle', 'AlertTriangle', 'CheckCircle', 'XCircle', 'HelpCircle', 'Loader', 'Loader2', 'Clock', 'Timer', 'Zap', 'ZapOff', 'Shield', 'ShieldCheck', 'ShieldAlert'],
  'Media': ['Image', 'Video', 'Music', 'Film', 'Camera', 'Mic', 'MicOff', 'Volume', 'Volume2', 'VolumeX', 'Play', 'Pause', 'Square', 'SkipBack', 'SkipForward', 'Maximize', 'Minimize'],
  'Data': ['BarChart', 'BarChart2', 'LineChart', 'PieChart', 'TrendingUp', 'TrendingDown', 'Activity', 'Database', 'Table', 'Grid', 'List', 'Columns', 'Layers', 'Package'],
  'Communication': ['Mail', 'MessageCircle', 'MessageSquare', 'Bell', 'BellOff', 'Phone', 'PhoneCall', 'PhoneOff', 'AtSign', 'Hash', 'User', 'Users', 'UserPlus', 'UserMinus', 'UserCheck'],
  'Files': ['File', 'FileText', 'FilePlus', 'FileMinus', 'FileCode', 'Folder', 'FolderOpen', 'FolderPlus', 'Archive', 'Paperclip', 'Bookmark', 'BookmarkPlus', 'Tag', 'Tags'],
  'Design': ['Palette', 'Brush', 'Pen', 'PenTool', 'Crop', 'Scissors', 'Sliders', 'Sliders2', 'Circle', 'Triangle', 'Hexagon', 'Star', 'Heart', 'Shapes'],
  'Misc': ['Settings', 'Settings2', 'Globe', 'Map', 'MapPin', 'Calendar', 'CalendarDays', 'Sun', 'Moon', 'Sunrise', 'Cloud', 'CloudRain', 'Eye', 'EyeOff', 'Lock', 'Unlock', 'Key', 'Code', 'Terminal', 'Cpu', 'Wifi'],
}

function IconTile({
  copied, onCopy, renderIcon, label, copyId,
}: {
  copied: string | null
  onCopy: (id: string, snippet: string) => void
  renderIcon: () => React.ReactNode
  label: string
  copyId: string
}) {
  const isCopied = copied === copyId
  return (
    <Button
      variant="ghost"
      onClick={() => onCopy(copyId, copyId.startsWith('fa')
        ? `<FontAwesomeIcon icon={${copyId}} />`
        : `<${copyId} size={16} />`)}
      title={`${label} — click to copy`}
      className={cn(
        'flex flex-col items-center justify-center gap-[5px] w-[68px] h-auto px-1.5 py-2.5',
        'border rounded-lg transition-all duration-75',
        isCopied
          ? 'bg-accent-subtle border-accent-border text-accent'
          : 'bg-surface-mid border-border text-text-muted hover:bg-surface-high hover:text-text hover:border-border-mid'
      )}
    >
      {isCopied ? <LucideIcons.Check size={14} /> : renderIcon()}
      <span className="text-[9px] text-center leading-[1.2] max-w-[60px] overflow-hidden text-ellipsis whitespace-nowrap">
        {isCopied ? 'Copied!' : label}
      </span>
    </Button>
  )
}

function IconsView() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  function handleCopy(id: string, snippet: string) {
    navigator.clipboard.writeText(snippet).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  const q = query.trim().toLowerCase()

  const filteredLucide = q
    ? Object.fromEntries(
        Object.entries(ICON_CATEGORIES)
          .map(([cat, icons]) => [cat, icons.filter(n => n.toLowerCase().includes(q))])
          .filter(([, icons]) => (icons as string[]).length > 0)
      )
    : ICON_CATEGORIES

  const filteredBrands = q
    ? BRAND_ICONS.filter(b => b.label.toLowerCase().includes(q) || b.id.toLowerCase().includes(q))
    : BRAND_ICONS

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="flex items-center gap-2 max-w-[320px] relative">
        <LucideIcons.Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none"
        />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter icons..."
          className="pl-8 pr-8"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
          >
            <LucideIcons.X size={12} />
          </Button>
        )}
      </div>

      {/* Lucide categories */}
      {(Object.entries(filteredLucide) as [string, string[]][]).map(([category, iconNames]) => (
        <div key={category}>
          <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-[0.06em] mb-2.5">
            {category} <span className="font-normal">({iconNames.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {iconNames.map(name => {
              const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
              if (!Icon) return null
              return (
                <IconTile
                  key={name}
                  copyId={name}
                  label={name}
                  copied={copied}
                  onCopy={handleCopy}
                  renderIcon={() => <Icon size={16} />}
                />
              )
            })}
          </div>
        </div>
      ))}

      {/* Brand icons (Font Awesome) */}
      {filteredBrands.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-[0.06em]">
              Brands <span className="font-normal">({filteredBrands.length})</span>
            </div>
            <Badge variant="default" className="text-[9.5px] font-medium tracking-[0.03em]">
              Font Awesome
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {filteredBrands.map(({ id, label, icon }) => (
              <IconTile
                key={id}
                copyId={id}
                label={label}
                copied={copied}
                onCopy={handleCopy}
                renderIcon={() => <FontAwesomeIcon icon={icon} style={{ width: 16, height: 16 }} />}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LiquidGlassView() {
  const blurs = primitiveGlass.filter(t => t.id.startsWith('blur-'))
  const fills = primitiveGlass.filter(t => t.id.startsWith('glass-white') || t.id.startsWith('glass-dark'))
  const borders = primitiveGlass.filter(t => t.id.startsWith('glass-border'))
  const shadows = primitiveGlass.filter(t => t.id.startsWith('glass-shadow'))
  const special = primitiveGlass.filter(t => t.id === 'glass-vibrancy')

  return (
    <div className="flex flex-col gap-8">

      {/* Live demo */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">
          Live Demo — Glass Cards
        </div>
        <div
          className="rounded-xl overflow-hidden relative p-10 min-h-[260px] flex flex-wrap gap-4 items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%, #4facfe 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute w-[200px] h-[200px] rounded-full -top-10 -right-10" style={{ background: 'rgba(255,200,100,0.35)', filter: 'blur(40px)' }} />
          <div className="absolute w-[150px] h-[150px] rounded-full -bottom-7 left-5" style={{ background: 'rgba(100,200,255,0.3)', filter: 'blur(30px)' }} />

          {/* Card 1 — thin */}
          <div
            className="relative z-10 rounded-[20px] p-5 w-[200px]"
            style={{
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'saturate(180%) blur(16px)',
              WebkitBackdropFilter: 'saturate(180%) blur(16px)',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>glass/surface</div>
            <div className="text-[22px] font-extrabold mb-1 tracking-[-0.03em]" style={{ color: '#fff' }}>$12,480</div>
            <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Revenue this week</div>
            <div className="mt-3.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(100,255,150,0.9)' }} />
              <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>+8.4% vs last week</span>
            </div>
          </div>

          {/* Card 2 — thick */}
          <div
            className="relative z-10 rounded-[20px] p-5 w-[200px]"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'saturate(200%) blur(24px)',
              WebkitBackdropFilter: 'saturate(200%) blur(24px)',
              border: '1px solid rgba(255,255,255,0.75)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.85)',
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'rgba(80,80,100,0.7)' }}>glass/surface-thick</div>
            <div className="text-[22px] font-extrabold mb-1 tracking-[-0.03em]" style={{ color: '#1c1c1e' }}>3,291</div>
            <div className="text-[11px]" style={{ color: 'rgba(60,60,80,0.7)' }}>Active users</div>
            <div className="mt-3.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#007AFF' }} />
              <span className="text-[11px] font-medium" style={{ color: '#007AFF' }}>92 online now</span>
            </div>
          </div>

          {/* Pill chip */}
          <div
            className="relative z-10 rounded-full px-[18px] py-2 flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.45)',
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(100,255,150,0.9)', boxShadow: '0 0 8px rgba(100,255,150,0.8)' }} />
            <span className="text-[12px] font-semibold tracking-[-0.01em]" style={{ color: '#fff' }}>AI is generating…</span>
          </div>
        </div>
        <p className="text-[11px] text-text-subtle mt-2">
          ↑ Background gradient visible through the glass — demonstrates true transparency with depth.
        </p>
      </div>

      {/* Blur scale */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">
          Blur Scale — backdrop-filter values
        </div>
        <div className="flex flex-wrap gap-2.5">
          {blurs.map(t => (
            <div
              key={t.id}
              className="flex flex-col gap-2.5 items-center p-4 bg-surface-mid border border-border rounded-xl min-w-[120px]"
            >
              <div className="w-16 h-16 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea, #f093fb)' }}>
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: t.value,
                    WebkitBackdropFilter: t.value,
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-[11.5px] font-mono text-text font-medium mb-0.5">{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
                {t.description && <div className="text-[10px] text-text-subtle mt-1">{t.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fill opacity */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">
          Glass Fill Colors — background-color with opacity
        </div>
        <div className="flex flex-wrap gap-2.5">
          {[...fills, ...borders].map(t => (
            <div
              key={t.id}
              className="flex flex-col gap-2 items-center px-4 py-3.5 bg-surface-mid border border-border rounded-xl min-w-[130px]"
            >
              {/* Color swatch on gradient */}
              <div className="w-14 h-8 rounded-lg relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #667eea, #f093fb)' }}>
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: t.value }}
                />
              </div>
              <div className="text-center">
                <div className="text-[10.5px] font-mono text-text mb-0.5">{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">
          Glass Shadows — box-shadow with inner top highlight
        </div>
        <div className="flex flex-wrap gap-4">
          {shadows.map(t => (
            <div
              key={t.id}
              className="flex flex-col gap-2.5 items-center p-5 bg-surface-mid border border-border rounded-xl min-w-[160px]"
            >
              <div
                className="w-[72px] h-[72px] rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: t.value,
                }}
              />
              <div className="text-center">
                <div className="text-[11.5px] font-mono text-text mb-1">{t.name}</div>
                <CopyOnClick id={t.id} value={t.value} />
                {t.description && <div className="text-[10px] text-text-subtle mt-1 max-w-[160px]">{t.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibrancy formula */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-3">
          Vibrancy Formula — Apple&apos;s backdrop-filter secret
        </div>
        {special.map(t => (
          <div
            key={t.id}
            className="px-5 py-4 bg-accent-subtle border border-accent-border rounded-xl flex items-start gap-3.5"
          >
            <div className="text-[20px]">🍎</div>
            <div>
              <div className="text-[12px] font-semibold text-text mb-1">
                {t.name}
              </div>
              <code className="text-[12px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded">
                backdrop-filter: {t.value}
              </code>
              <p className="text-[12px] text-text-muted mt-2 leading-relaxed">
                {t.description} — This is the formula Apple uses for macOS Menubar, iOS Navigation Bar, and every glass surface in visionOS.
                Apply to an element with a <code className="text-[11px] bg-surface-high px-1 py-0.5 rounded">rgba()</code> background that has transparency.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CSS snippet */}
      <div>
        <div className="text-[10px] text-text-subtle uppercase tracking-[0.08em] font-semibold mb-2.5">
          CSS Snippet — Copy-paste recipe
        </div>
        <div className="code-block">{`.glass-surface {
  background: rgba(255, 255, 255, 0.72);           /* glass/surface */
  backdrop-filter: saturate(180%) blur(20px);      /* glass/vibrancy */
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.60);     /* glass/border */
  box-shadow: 0 8px 32px rgba(0,0,0,0.10),
              inset 0 1px 0 rgba(255,255,255,0.65); /* glass/shadow */
  border-radius: 20px;
}

/* Dark mode */
.dark .glass-surface {
  background: rgba(28, 28, 30, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
}`}</div>
      </div>
    </div>
  )
}

// ─── Interaction Tokens View ─────────────────────────────────────────────────

const intensityMeta: Record<string, { label: string; chipClass: string; color: string }> = {
  none:       { label: 'none',       chipClass: 'default', color: 'var(--text-subtle)' },
  subtle:     { label: 'subtle',     chipClass: 'accent',  color: 'var(--accent)' },
  standard:   { label: 'standard',   chipClass: 'green',   color: 'var(--green)' },
  expressive: { label: 'expressive', chipClass: 'purple',  color: 'var(--purple)' },
}

const productFitMeta: Record<string, { color: string; bg: string }> = {
  all:  { color: 'var(--text-muted)', bg: 'var(--surface-high)' },
  b2b:  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  b2c:  { color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
  'b2b+': { color: '#2563eb', bg: 'rgba(37,99,235,0.08)' },
  'b2c+': { color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
}

function MotionTokenCard({ token }: { token: InteractionToken }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const isActive = token.id === 'motion/press' ? pressed : hovered
  const im = intensityMeta[token.intensity]
  const fm = productFitMeta[token.productFit] ?? productFitMeta.all

  const demoBoxStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    flexShrink: 0,
    borderRadius: 10,
    background: isActive ? 'var(--accent)' : 'var(--surface-high)',
    border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
    cursor: 'pointer',
    transition: token.cssTransition ?? 'all 100ms',
    transform: isActive && token.cssTransform ? token.cssTransform : 'none',
    opacity: token.id === 'motion/fade-in' ? (isActive ? 1 : 0.15) : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  }

  return (
    <Card className="border-border bg-surface-mid">
      <CardContent className="p-0">
        <div className="flex items-start gap-3.5 px-4 py-3.5">
          {/* Live demo box */}
          <div
            style={demoBoxStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false) }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            title="Hover / click to preview"
          >
            <div
              className="w-[18px] h-[18px] rounded-[4px]"
              style={{
                background: isActive ? 'rgba(255,255,255,0.4)' : 'var(--border-mid)',
                transition: 'inherit',
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-[5px] flex-wrap">
              <code className="text-[12px] font-semibold text-text font-mono">
                {token.id}
              </code>
              <Badge variant={im.chipClass as 'default' | 'accent' | 'green' | 'red' | 'yellow' | 'purple'}>{im.label}</Badge>
              <span
                className="text-[9.5px] font-semibold px-1.5 py-[2px] rounded-full"
                style={{ background: fm.bg, color: fm.color }}
              >
                {token.productFit}
              </span>
            </div>
            <p className="text-[12px] text-text-muted mb-2 leading-[1.55]">
              {token.description}
            </p>
            {token.cssTransition && (
              <div className="flex gap-1.5 flex-wrap mb-2">
                <code className="text-[10.5px] font-mono bg-surface-high border border-border-mid text-accent px-[7px] py-[2px] rounded">
                  {token.cssTransition}
                </code>
                {token.cssTransform && (
                  <code className="text-[10.5px] font-mono bg-surface-high border border-border-mid text-green px-[7px] py-[2px] rounded">
                    {token.cssTransform}
                  </code>
                )}
              </div>
            )}
            <div className="flex gap-1 flex-wrap">
              {token.usage.map(u => (
                <Badge key={u} variant="default" className="text-[10px]">{u}</Badge>
              ))}
            </div>
          </div>

          {/* Platform support */}
          <div className="flex flex-col gap-1 flex-shrink-0 mt-0.5">
            {(Object.entries(token.platformSupport) as [string, string][]).map(([platform, support]) => (
              <div key={platform} className="flex gap-1.5 items-center">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: support === 'full' ? 'var(--green)' : support === 'partial' ? 'var(--yellow)' : 'var(--border-strong)',
                  }}
                />
                <span className="text-[9.5px] text-text-subtle capitalize">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FeedbackCard({ token }: { token: InteractionToken }) {
  const im = intensityMeta[token.intensity]
  const profileForToken = interactionProfiles.find(p => p.feedbackToken === token.id)
  const profileColor = profileForToken?.color ?? 'var(--text-muted)'

  return (
    <Card
      className="bg-surface-mid"
      style={{ borderColor: `${profileColor}33`, borderWidth: '1.5px' }}
    >
      <CardContent className="p-4 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: profileColor }} />
          <code className="text-[12.5px] font-bold text-text font-mono">
            {token.id}
          </code>
          <Badge variant={im.chipClass as 'default' | 'accent' | 'green' | 'red' | 'yellow' | 'purple'}>{im.label}</Badge>
        </div>
        <p className="text-[12px] text-text-muted leading-relaxed">
          {token.description}
        </p>
        <div className="flex gap-1 flex-wrap">
          {token.usage.map(u => (
            <Badge key={u} variant="default" className="text-[10px]">{u}</Badge>
          ))}
        </div>
        {profileForToken && (
          <div className="text-[10.5px] text-text-subtle mt-0.5">
            Used by <span className="font-semibold" style={{ color: profileColor }}>{profileForToken.name}</span> profile
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function DensityCard({ token }: { token: InteractionToken }) {
  const densityScales: Record<string, number[]> = {
    'density/compact': [4, 6, 8, 12, 16],
    'density/normal':  [8, 12, 16, 20, 28],
    'density/relaxed': [12, 20, 24, 32, 48],
  }
  const scale = densityScales[token.id] ?? [8, 12, 16, 20, 28]
  const profileForToken = interactionProfiles.find(p => p.densityToken === token.id)

  return (
    <Card className="border-border bg-surface-mid">
      <CardContent className="p-0">
        <div className="flex items-start gap-5 px-4 py-3.5">
          {/* Visual spacing bars */}
          <div className="flex gap-1 items-end h-12 flex-shrink-0">
            {scale.map((px, i) => (
              <div
                key={i}
                className="w-2.5 rounded-[3px] bg-accent"
                style={{
                  height: Math.min(px * 0.85, 48),
                  opacity: 0.5 + i * 0.1,
                }}
              />
            ))}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-[5px]">
              <code className="text-[12.5px] font-bold text-text font-mono">
                {token.id}
              </code>
              {profileForToken && (
                <span
                  className="text-[9.5px] font-semibold px-[7px] py-[2px] rounded-full"
                  style={{ background: `${profileForToken.color}18`, color: profileForToken.color }}
                >
                  {profileForToken.name}
                </span>
              )}
            </div>
            <p className="text-[12px] text-text-muted mb-2 leading-[1.55]">
              {token.description}
            </p>
            <div className="flex gap-1 flex-wrap">
              {token.usage.map(u => (
                <Badge key={u} variant="default" className="text-[10px]">{u}</Badge>
              ))}
            </div>

            {/* Platform support dots */}
            <div className="flex gap-2.5 mt-2">
              {(Object.entries(token.platformSupport) as [string, string][]).map(([platform, support]) => (
                <div key={platform} className="flex gap-1 items-center">
                  <div
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      background: support === 'full' ? 'var(--green)' : support === 'partial' ? 'var(--yellow)' : 'var(--border-strong)',
                    }}
                  />
                  <span className="text-[9.5px] text-text-subtle capitalize">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InteractionProfileCard({ profile }: { profile: InteractionProfile }) {
  const tokenEntries: [string, string][] = [
    ['hover', profile.hoverToken],
    ['press', profile.pressToken],
    ['enter', profile.enterToken],
    ['exit', profile.exitToken],
  ]

  return (
    <Card
      className="bg-surface-mid"
      style={{ borderColor: `${profile.color}40`, borderWidth: '2px' }}
    >
      <CardContent className="p-[18px] flex flex-col gap-3">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: profile.color, boxShadow: `0 0 0 3px ${profile.color}25` }}
            />
            <span className="text-[15px] font-bold text-text tracking-[-0.01em]">
              {profile.name}
            </span>
          </div>
          <p className="text-[11.5px] text-text-subtle italic mb-1">
            &ldquo;{profile.tagline}&rdquo;
          </p>
          <p className="text-[11px] text-text-muted">{profile.persona}</p>
        </div>

        {/* Token assignments */}
        <div className="grid grid-cols-2 gap-[5px]">
          {tokenEntries.map(([label, tokenId]) => (
            <div key={label} className="bg-surface-high rounded-lg px-2.5 py-1.5">
              <div className="text-[9px] text-text-subtle uppercase tracking-[0.07em] mb-0.5">
                {label}
              </div>
              <div className="text-[10.5px] text-text font-mono">
                {tokenId.replace('motion/', '')}
              </div>
            </div>
          ))}
        </div>

        {/* Meta badges */}
        <div className="flex gap-1 flex-wrap">
          <Badge variant="default">{profile.motion} motion</Badge>
          <Badge variant="default">{profile.density}</Badge>
          <Badge variant="default">{profile.gestureModel}</Badge>
        </div>

        {/* Theme association */}
        <div className="text-[10.5px] text-text-subtle flex gap-1 flex-wrap items-center">
          <span>Themes:</span>
          {profile.themeIds.map(id => (
            <span
              key={id}
              className="px-1.5 py-[1px] rounded-full text-[10px] font-semibold"
              style={{ background: `${profile.color}18`, color: profile.color }}
            >
              {id}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function InteractionTokensView() {
  const motionTokens = interactionTokens.filter(t => t.group === 'motion')
  const feedbackTokens = interactionTokens.filter(t => t.group === 'feedback')
  const densityTokens = interactionTokens.filter(t => t.group === 'density')

  return (
    <div className="flex flex-col gap-11">
      {/* Intro callout */}
      <div className="bg-accent-subtle border border-accent-border rounded-xl px-[18px] py-3.5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent mb-1.5">
          Behavioral Semantic Primitives
        </div>
        <p className="text-[12.5px] text-text leading-[1.65] m-0">
          Interaction tokens define <em>how it feels</em> — not how it looks. They sit above primitive motion tokens
          and map interaction contexts (hover, press, enter, exit) to concrete CSS values.{' '}
          <span className="text-text-muted">
            Components consume tokens. Profiles bundle tokens into B2B or B2C personalities.
            Gesture tokens and layout patterns are NOT here — this layer defines values, not behaviors.
          </span>
        </p>
      </div>

      {/* Interaction Profiles */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Interaction Profiles — {interactionProfiles.length} profiles
        </div>
        <p className="text-[12px] text-text-muted mb-4 leading-relaxed">
          Profiles bundle tokens into cohesive behavioral personalities. Each theme maps to exactly one profile.
          Switch themes in the sidebar to see how interaction personality changes across B2B ↔ B2C.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {interactionProfiles.map(profile => (
            <InteractionProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>

      {/* Motion Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Motion Tokens — {motionTokens.length} tokens · hover the demo box to preview
        </div>
        <div className="flex flex-col gap-2">
          {motionTokens.map(token => (
            <MotionTokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>

      {/* Feedback Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Feedback Personalities — {feedbackTokens.length} tokens
        </div>
        <p className="text-[12px] text-text-muted mb-3.5 leading-relaxed">
          Feedback tokens define the overall interaction philosophy — how &ldquo;alive&rdquo; the UI feels.
          Not a CSS value, but a behavioral contract.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {feedbackTokens.map(token => (
            <FeedbackCard key={token.id} token={token} />
          ))}
        </div>
      </div>

      {/* Density Tokens */}
      <div>
        <div className="inspector-label" style={{ marginBottom: 12 }}>
          Density Scale — {densityTokens.length} tokens
        </div>
        <p className="text-[12px] text-text-muted mb-3.5 leading-relaxed">
          Density tokens control spacing intensity — how tight or generous the UI breathes.
          Compact for power users, relaxed for touch-first consumer experiences.
        </p>
        <div className="flex flex-col gap-2">
          {densityTokens.map(token => (
            <DensityCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function FoundationsView({ category }: { category: string }) {
  const titles: Record<string, string> = {
    color: 'Colors', spacing: 'Spacing', typography: 'Typography',
    radius: 'Border Radius', motion: 'Motion', shadow: 'Shadows', icons: 'Icons',
    glass: 'Liquid Glass', interaction: 'Interaction Tokens',
  }

  const subtitles: Record<string, string> = {
    color: 'Raw color primitives — the source values all semantic tokens reference.',
    spacing: 'Spacing scale — consistent distance values for padding, margin, and gap.',
    typography: 'Type scale — font sizes, weights, and families.',
    radius: 'Border radius scale — from sharp to fully rounded.',
    motion: 'Animation durations and easing curves.',
    shadow: 'Elevation shadows — from flat to floating.',
    icons: 'Lucide icon library — click any icon to copy the JSX.',
    glass: 'Frosted glass primitives — blur, opacity, border and shadow values for liquid glass surfaces.',
    interaction: 'Behavioral semantic primitives — motion, feedback, and density tokens that define how the UI feels.',
  }

  const totalCounts: Record<string, number> = {
    color: primitiveColors.length,
    spacing: primitiveSpacing.length,
    typography: primitiveTypography.length,
    radius: primitiveRadius.length,
    motion: primitiveMotion.length,
    shadow: primitiveShadows.length,
    icons: Object.values(ICON_CATEGORIES).flat().length,
    glass: primitiveGlass.length,
    interaction: interactionTokens.length,
  }

  const content: Record<string, React.ReactNode> = {
    color:       <ColorGrid tokens={primitiveColors} />,
    spacing:     <SpacingGrid tokens={primitiveSpacing} />,
    typography:  <TypographyList tokens={primitiveTypography} />,
    radius:      <RadiusGrid tokens={primitiveRadius} />,
    motion:      <MotionList tokens={primitiveMotion} />,
    shadow:      <ShadowGrid tokens={primitiveShadows} />,
    icons:       <IconsView />,
    glass:       <LiquidGlassView />,
    interaction: <InteractionTokensView />,
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-6 pt-4 pb-3.5 border-b border-border flex-shrink-0 bg-surface">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-[18px] font-bold tracking-[-0.02em] text-text">
            {titles[category] ?? category}
          </h1>
          <Badge variant="default">
            {totalCounts[category] ?? '—'} {category === 'icons' ? 'icons' : 'tokens'}
          </Badge>
          {category === 'interaction' && <Badge variant="accent">Behavioral</Badge>}
          <Badge variant="accent">Primitive</Badge>
        </div>
        <p className="text-[13px] text-text-muted m-0">
          {subtitles[category] ?? 'Raw values — the source primitives that semantic tokens reference.'}
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-6 py-5">
          {content[category] ?? (
            <div className="text-text-muted">No content for {category}</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
