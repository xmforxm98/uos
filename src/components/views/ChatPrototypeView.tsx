'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileId = 'cyber' | 'premium'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Session {
  id: string
  title: string
  group: string
  preview: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SESSIONS: Session[] = [
  { id: '1', title: 'Next.js auth with server sessions', group: 'Today',            preview: 'JWT vs database sessions...' },
  { id: '2', title: 'React Query v5 patterns',           group: 'Today',            preview: 'Using queryOptions helper...' },
  { id: '3', title: 'TypeScript satisfies operator',     group: 'Today',            preview: 'When to use satisfies vs as...' },
  { id: '4', title: 'Tailwind v4 migration guide',       group: 'Yesterday',        preview: 'Updating config file...' },
  { id: '5', title: 'PostgreSQL indexing strategies',    group: 'Yesterday',        preview: 'Partial vs composite...' },
  { id: '6', title: 'WebSocket vs SSE comparison',       group: 'Previous 7 days',  preview: 'Real-time updates for chat...' },
  { id: '7', title: 'Docker multi-stage builds',         group: 'Previous 7 days',  preview: 'Reducing image size...' },
  { id: '8', title: 'Zustand vs Jotai tradeoffs',        group: 'Previous 7 days',  preview: 'Global state patterns...' },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'How do I implement authentication in Next.js with server-side sessions?',
  },
  {
    id: '2',
    role: 'assistant',
    content: `For server-side auth in Next.js 15, here's the recommended approach using NextAuth with JWT sessions:\n\n\`\`\`typescript\n// app/api/auth/[...nextauth]/route.ts\nimport NextAuth from 'next-auth'\nimport { authOptions } from '@/lib/auth'\n\nconst handler = NextAuth(authOptions)\nexport { handler as GET, handler as POST }\n\`\`\`\n\nKey principles to follow:\n1. Keep secrets in environment variables only\n2. Use httpOnly cookies for session tokens\n3. Validate on every protected route via middleware\n4. Rotate refresh tokens on every use`,
  },
  {
    id: '3',
    role: 'user',
    content: 'Should I use JWT or database sessions?',
  },
  {
    id: '4',
    role: 'assistant',
    content: `It depends on your scale and security requirements.\n\nJWT (stateless) — Best for: microservices, edge functions, horizontal scaling. Trade-off: tokens can't be revoked until expiry.\n\nDatabase sessions — Best for: instant logout, audit trails, security-critical apps. Trade-off: adds DB round-trip to every authenticated request.\n\nFor most production apps, I recommend database sessions with Redis caching — best balance of security and performance. Set a 15-minute JWT expiry with a 7-day refresh token stored in the database.`,
  },
]

// ─── Cyber sidebar ────────────────────────────────────────────────────────────

function CyberSidebar({
  sessions, activeId, onSelect, onNew,
}: {
  sessions: Session[]
  activeId: string
  onSelect: (id: string) => void
  onNew: () => void
}) {
  const groups = Array.from(new Set(sessions.map(s => s.group)))

  return (
    <div className="flex flex-col w-[232px] min-w-[232px] shrink-0 bg-[#0a0c0f] border-r border-[#1e2229] overflow-hidden font-mono">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#1e2229]">
        <Avatar className="w-5 h-5 rounded-sm">
          <AvatarFallback className="rounded-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[8px] font-bold tracking-tight">
            AI
          </AvatarFallback>
        </Avatar>
        <span className="text-[11px] font-semibold text-[#d4dce8] tracking-[0.04em]">NEXUS_CHAT</span>
        <Badge variant="green" className="ml-auto text-[8px] tracking-[0.06em] rounded-sm px-1.5 py-0">LIVE</Badge>
      </div>

      {/* New chat */}
      <div className="px-2.5 py-2 border-b border-[#1e2229]">
        <Button
          variant="outline"
          size="sm"
          onClick={onNew}
          className="w-full justify-start gap-1.5 font-mono text-[10.5px] border-[#252b36] text-[#5a6578] hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-sm h-7"
        >
          <span className="text-[13px] leading-none">+</span>
          <span>new_session()</span>
        </Button>
      </div>

      {/* Session list */}
      <ScrollArea className="flex-1">
        <div className="py-1">
          {groups.map(group => (
            <div key={group}>
              <div className="px-3.5 pt-2.5 pb-1 text-[8.5px] text-[#3a4152] font-semibold tracking-[0.1em] uppercase">
                // {group}
              </div>
              {sessions.filter(s => s.group === group).map(s => (
                <Button
                  key={s.id}
                  variant="ghost"
                  onClick={() => onSelect(s.id)}
                  className={cn(
                    'w-full justify-start h-auto flex-col items-start gap-0.5 px-3.5 py-1.5 rounded-none font-mono text-left',
                    'border-l-2',
                    activeId === s.id
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400'
                      : 'border-transparent text-[#d4dce8] hover:bg-[#0f1115]'
                  )}
                >
                  <span className={cn(
                    'text-[10.5px] truncate w-full font-mono',
                    activeId === s.id ? 'font-semibold text-cyan-400' : 'font-normal text-[#d4dce8]'
                  )}>{s.title}</span>
                  <span className="text-[9px] text-[#3a4152] truncate w-full">{s.preview}</span>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-[#1e2229]">
        <Avatar className="w-6 h-6 rounded-sm">
          <AvatarFallback className="rounded-sm bg-[#1a2030] border border-[#1e2229] text-[#5a6578] text-[9px] font-mono">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="text-[9.5px] text-[#d4dce8] font-mono">user_0x4A2F</div>
          <div className="text-[8px] text-[#3a4152]">gpt-4o · 128k ctx</div>
        </div>
        <Button variant="ghost" size="icon" className="h-5 w-5 text-[#3a4152] hover:text-[#5a6578] text-[9px]">⚙</Button>
      </div>
    </div>
  )
}

// ─── Cyber message ────────────────────────────────────────────────────────────

function CyberMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'

  return (
    <div className={cn(
      'flex gap-2.5 items-start',
      isUser ? 'flex-row-reverse pl-[60px]' : 'pr-[60px]'
    )}>
      <Avatar className="w-[22px] h-[22px] rounded-sm shrink-0">
        <AvatarFallback className={cn(
          'rounded-sm text-[8px] font-bold tracking-[0.04em]',
          isUser
            ? 'bg-[#0d1a20] border border-[#252b36] text-[#5a6578]'
            : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
        )}>
          {isUser ? 'USR' : 'AI'}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        'max-w-[78%] rounded-sm px-3 py-2.5',
        isUser
          ? 'bg-[#0a1118] border border-[#252b36]'
          : 'bg-[#0f1115] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.09),0_0_0_1px_rgba(0,229,255,0.18)]'
      )}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5 text-[8px] font-mono text-cyan-400 tracking-[0.1em]">
            <span className="text-[#3df07a]">●</span>
            <span>GPT-4o // RESPONSE</span>
          </div>
        )}
        <pre className={cn(
          'font-mono text-[11px] leading-[1.7] whitespace-pre-wrap break-words m-0',
          isUser ? 'text-[#d4dce8]' : 'text-[#c8d8e8]'
        )}>{msg.content}</pre>
      </div>
    </div>
  )
}

// ─── Cyber chat ───────────────────────────────────────────────────────────────

type ChatProps = {
  sessions: Session[]
  activeId: string
  onSelectSession: (id: string) => void
  onNewSession: () => void
}

function CyberChat({ sessions, activeId, onSelectSession, onNewSession }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }])
    setStreaming(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `// Processing query...\n// Context window: 128k tokens\n// Model: GPT-4o\n\nAnalyzing "${text.slice(0, 40)}..."\n\nThis is a prototype response demonstrating the Cyber behavioral profile — cinematic transitions, monospace typography, compact density, and terminal-grade information hierarchy.`,
      }])
      setStreaming(false)
    }, 1200)
  }

  return (
    <div className="flex h-full bg-[#050608] overflow-hidden">
      <CyberSidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={onSelectSession}
        onNew={onNewSession}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="h-11 shrink-0 flex items-center gap-2.5 px-4 bg-[#0a0c0f] border-b border-[#1e2229]">
          <span className="text-[9px] text-[#3a4152] font-mono">~/sessions/</span>
          <span className="text-[10.5px] text-[#d4dce8] font-mono font-semibold truncate">
            {sessions.find(s => s.id === activeId)?.title ?? 'untitled'}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="accent" className="font-mono text-[9px] rounded-sm px-1.5 py-0">gpt-4o</Badge>
            <Badge variant="default" className="font-mono text-[9px] rounded-sm px-1.5 py-0">128k</Badge>
            <div className="w-1.5 h-1.5 rounded-full bg-[#3df07a] shadow-[0_0_6px_#3df07a]" />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-[760px] w-full mx-auto px-5 py-5 flex flex-col gap-4">
            {messages.map(msg => <CyberMessage key={msg.id} msg={msg} />)}
            {streaming && (
              <div className="flex gap-2.5 items-start">
                <Avatar className="w-[22px] h-[22px] rounded-sm shrink-0">
                  <AvatarFallback className="rounded-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[8px] font-bold">AI</AvatarFallback>
                </Avatar>
                <div className="px-3 py-2.5 rounded-sm bg-[#0f1115] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.09),0_0_0_1px_rgba(0,229,255,0.18)]">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1 h-1 rounded-full bg-cyan-400" style={{ animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                    <span className="text-[9px] text-[#5a6578] font-mono ml-1.5">processing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 bg-[#0a0c0f] border-t border-[#1e2229] px-5 py-3">
          <div className="max-w-[760px] mx-auto">
            <div className="flex items-end gap-2.5 bg-[#0f1115] border border-[#252b36] rounded-sm px-3 py-2.5 focus-within:border-cyan-500/30 focus-within:shadow-[0_0_0_1px_rgba(0,229,255,0.2),0_0_16px_rgba(0,229,255,0.08)] transition-all duration-200">
              <span className="text-cyan-400 text-[12px] font-mono shrink-0 mb-0.5">▶</span>
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend()
                }}
                placeholder="// enter prompt..."
                rows={1}
                className="flex-1 bg-transparent border-none ring-0 focus:ring-0 focus:border-none text-[11.5px] text-[#d4dce8] font-mono placeholder:text-[#3a4152] resize-none leading-[1.6] max-h-[120px] p-0 min-h-0"
              />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[8.5px] text-[#3a4152] font-mono border border-[#1e2229] rounded-sm px-1 py-0.5">⌘↵</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSend}
                  disabled={!input.trim() || streaming}
                  className={cn(
                    'font-mono text-[10px] tracking-[0.04em] font-semibold rounded-sm h-6 px-3',
                    input.trim() && !streaming
                      ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/50'
                      : 'border-[#1e2229] text-[#3a4152] bg-transparent'
                  )}
                >
                  SEND
                </Button>
              </div>
            </div>
            <div className="mt-1.5 text-[8.5px] text-[#3a4152] font-mono text-center">
              GPT-4o · 128,000 token context · ⌘K command palette · j/k to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Premium sidebar ──────────────────────────────────────────────────────────

function PremiumSidebar({
  sessions, activeId, onSelect, onNew,
}: {
  sessions: Session[]
  activeId: string
  onSelect: (id: string) => void
  onNew: () => void
}) {
  const groups = Array.from(new Set(sessions.map(s => s.group)))

  return (
    <div className="flex flex-col w-[248px] min-w-[248px] shrink-0 border-r border-white/[0.07] overflow-hidden" style={{ background: 'rgba(13,13,30,0.95)', backdropFilter: 'blur(20px)' }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-white/[0.07]">
        <Avatar className="w-7 h-7 rounded-lg">
          <AvatarFallback className="rounded-lg text-[11px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', boxShadow: '0 4px 12px rgba(167,139,250,0.3)' }}>
            N
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-[12.5px] font-semibold text-white/90 tracking-tight">NexusAI</div>
          <div className="text-[9.5px] text-white/40">GPT-4o</div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-white/40 hover:text-white/70 text-base rounded-lg">⊕</Button>
      </div>

      {/* New chat */}
      <div className="px-3 py-2.5 border-b border-white/[0.07]">
        <Button
          variant="outline"
          size="sm"
          onClick={onNew}
          className="w-full gap-1.5 font-sans text-[12px] font-medium text-violet-400 border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-500/50 rounded-[10px] h-9"
        >
          <span className="text-[15px] leading-none">+</span>
          New conversation
        </Button>
      </div>

      {/* Session list */}
      <ScrollArea className="flex-1">
        <div className="py-1.5">
          {groups.map(group => (
            <div key={group}>
              <div className="px-3.5 pt-2.5 pb-1 text-[10px] text-white/20 font-medium tracking-[0.04em]">
                {group}
              </div>
              {sessions.filter(s => s.group === group).map(s => (
                <Button
                  key={s.id}
                  variant="ghost"
                  onClick={() => onSelect(s.id)}
                  className={cn(
                    'w-full justify-start h-auto px-3.5 py-2 rounded-none font-sans text-left relative',
                    activeId === s.id
                      ? 'bg-violet-500/10 text-violet-400'
                      : 'text-white/90 hover:bg-white/[0.032]'
                  )}
                >
                  {activeId === s.id && (
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
                  )}
                  <span className={cn(
                    'text-[12px] truncate w-full',
                    activeId === s.id ? 'font-medium text-violet-400' : 'font-normal text-white/90'
                  )}>{s.title}</span>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-t border-white/[0.07]">
        <Avatar className="w-7 h-7 rounded-full">
          <AvatarFallback className="rounded-full text-[11px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 2px 8px rgba(102,126,234,0.25)' }}>
            Y
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] font-medium text-white/90">Yongwoo Kim</div>
          <div className="text-[9.5px] text-white/40">Free plan</div>
        </div>
        <Button variant="ghost" size="icon" className="h-5 w-5 text-white/40 hover:text-white/70 text-[11px]">···</Button>
      </div>
    </div>
  )
}

// ─── Premium message ──────────────────────────────────────────────────────────

function PremiumMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'

  return (
    <div className={cn(
      'flex gap-3 items-start',
      isUser ? 'flex-row-reverse pl-[80px]' : 'pr-[80px]'
    )}>
      {!isUser && (
        <Avatar className="w-7 h-7 rounded-full shrink-0 mt-0.5">
          <AvatarFallback className="rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', boxShadow: '0 4px 12px rgba(167,139,250,0.25)' }}>
            N
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        'max-w-[80%] px-4 py-3',
        isUser
          ? 'rounded-[18px_4px_18px_18px] border border-violet-500/30 shadow-[0_4px_24px_rgba(167,139,250,0.12)]'
          : 'rounded-[4px_18px_18px_18px] border border-white/[0.07] shadow-[0_2px_16px_rgba(0,0,0,0.2)]'
      )} style={{
        background: isUser
          ? 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(129,140,248,0.1))'
          : 'rgba(255,255,255,0.032)',
        backdropFilter: 'blur(20px)',
      }}>
        {!isUser && (
          <div className="text-[10.5px] font-semibold text-violet-400 mb-1.5 tracking-tight">NexusAI</div>
        )}
        <div className={cn(
          'text-[13px] leading-[1.65] font-light whitespace-pre-wrap break-words',
          isUser ? 'text-white/88' : 'text-white/92'
        )}>{msg.content}</div>
        {!isUser && (
          <div className="flex gap-3 mt-2.5 pt-2 border-t border-white/[0.07]">
            {['Copy', 'Regenerate', 'Share'].map(label => (
              <Button key={label} variant="ghost" size="sm" className="h-auto p-0 text-[10.5px] text-white/38 hover:text-white/70 hover:bg-transparent font-normal">
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="w-7 h-7 rounded-full shrink-0 mt-0.5">
          <AvatarFallback className="rounded-full text-[11px] font-semibold text-white" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 2px 8px rgba(102,126,234,0.25)' }}>
            Y
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

// ─── Premium chat ─────────────────────────────────────────────────────────────

function PremiumChat({ sessions, activeId, onSelectSession, onNewSession }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }])
    setStreaming(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here's a thoughtful response to "${text.slice(0, 40)}..." demonstrating the Premium behavioral profile — glass morphism surfaces, springy micro-interactions, light typography weights, and an expressive feedback system designed for an elevated, touch-first experience.`,
      }])
      setStreaming(false)
    }, 1400)
  }

  return (
    <div className="flex h-full overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 20% 50%, rgba(167,139,250,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(129,140,248,0.04) 0%, transparent 40%), #0d0d1e',
    }}>
      <PremiumSidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={onSelectSession}
        onNew={onNewSession}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="h-[52px] shrink-0 flex items-center gap-3 px-5 border-b border-white/[0.07]" style={{ background: 'rgba(13,13,30,0.6)', backdropFilter: 'blur(16px)' }}>
          <span className="flex-1 text-[13.5px] font-medium text-white/92 tracking-tight truncate">
            {sessions.find(s => s.id === activeId)?.title ?? 'New conversation'}
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="rounded-full px-3 py-1 text-[11.5px] font-medium text-violet-400 border-violet-500/30 bg-violet-500/10 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_6px_#34d399]" />
              GPT-4o
            </Badge>
            <Button variant="secondary" size="sm" className="rounded-lg text-[11.5px] text-white/40 hover:text-white/70 h-7">Share</Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-[780px] w-full mx-auto px-6 py-7 flex flex-col gap-5">
            {messages.map(msg => <PremiumMessage key={msg.id} msg={msg} />)}
            {streaming && (
              <div className="flex gap-3 items-start">
                <Avatar className="w-7 h-7 rounded-full shrink-0">
                  <AvatarFallback className="rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #a78bfa, #818cf8)', boxShadow: '0 4px 12px rgba(167,139,250,0.25)' }}>N</AvatarFallback>
                </Avatar>
                <div className="px-4 py-3 rounded-[4px_18px_18px_18px] border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.032)', backdropFilter: 'blur(20px)' }}>
                  <div className="flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 px-6 pt-3 pb-4 border-t border-white/[0.07]" style={{ background: 'rgba(13,13,30,0.6)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-[780px] mx-auto">
            <div
              className="flex items-end gap-2.5 rounded-[18px] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/[0.07] focus-within:border-violet-500/30 focus-within:shadow-[0_0_32px_rgba(167,139,250,0.2),0_0_0_1px_rgba(167,139,250,0.25)] transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(20px)' }}
            >
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Message NexusAI..."
                rows={1}
                className="flex-1 bg-transparent border-none ring-0 focus:ring-0 focus:border-none text-[13.5px] text-white/92 font-light placeholder:text-white/20 resize-none leading-[1.5] max-h-[140px] p-0 min-h-0"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                className={cn(
                  'w-8 h-8 rounded-full shrink-0 text-[13px] transition-all duration-300',
                  input.trim() && !streaming
                    ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 scale-[1.05]'
                    : 'bg-white/[0.08] text-white/20 scale-100'
                )}
              >
                ↑
              </Button>
            </div>
            <div className="mt-1.5 text-[10.5px] text-white/20 text-center">
              NexusAI can make mistakes — verify important information
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function ChatPrototypeView() {
  const [profile, setProfile] = useState<ProfileId>('cyber')
  const [sessions, setSessions] = useState<Session[]>(SESSIONS)
  const [activeSessionId, setActiveSessionId] = useState('1')

  function handleNewSession() {
    const id = `new-${Date.now()}`
    setSessions(prev => [
      { id, title: 'New conversation', group: 'Today', preview: 'Start typing...' },
      ...prev,
    ])
    setActiveSessionId(id)
  }

  const PROFILES: { id: ProfileId; label: string; desc: string }[] = [
    { id: 'cyber',   label: 'Cyber',   desc: 'cinematic · compact · glow · mono' },
    { id: 'premium', label: 'Premium', desc: 'springy · glass · expressive · light' },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Profile toggle bar — Tabs-driven */}
      <Tabs
        value={profile}
        onValueChange={v => setProfile(v as ProfileId)}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="shrink-0 h-11 flex items-center gap-3 px-4 bg-surface border-b border-border">
          <span className="text-[10px] text-text-subtle font-semibold uppercase tracking-[0.08em]">Prototype</span>
          <Separator orientation="vertical" className="h-4" />

          <TabsList className="border-none bg-transparent gap-1 p-0 h-auto">
            {PROFILES.map(p => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11.5px] transition-all duration-150',
                  'data-[state=active]:bg-transparent data-[state=active]:border-transparent',
                  // inactive
                  'border-border text-text-muted mb-0',
                  // active — profile-specific
                  p.id === 'cyber'
                    ? 'data-[state=active]:border-cyan-500/30 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400'
                    : 'data-[state=active]:border-violet-500/30 data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400'
                )}
              >
                <div className={cn(
                  'w-[7px] h-[7px] rounded-full transition-all duration-150',
                  profile === p.id
                    ? p.id === 'cyber'
                      ? 'bg-cyan-400 shadow-[0_0_6px_#00e5ff]'
                      : 'bg-violet-400 shadow-[0_0_6px_#a78bfa]'
                    : 'bg-border'
                )} />
                <span className={cn('font-medium', profile === p.id ? 'font-semibold' : 'font-normal')}>
                  {p.label}
                </span>
                <span className={cn(
                  'text-[9.5px] font-mono',
                  profile === p.id
                    ? p.id === 'cyber' ? 'text-cyan-400/60' : 'text-violet-400/60'
                    : 'text-text-subtle'
                )}>
                  {p.desc}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="ml-auto text-[10.5px] text-text-subtle">
            Interactive prototype · behavioral profile rendering
          </div>
        </div>

        <TabsContent value="cyber" className="flex-1 overflow-hidden mt-0">
          <CyberChat
            sessions={sessions}
            activeId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewSession={handleNewSession}
          />
        </TabsContent>

        <TabsContent value="premium" className="flex-1 overflow-hidden mt-0">
          <PremiumChat
            sessions={sessions}
            activeId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewSession={handleNewSession}
          />
        </TabsContent>
      </Tabs>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
