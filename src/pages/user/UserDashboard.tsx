import { Heart, MessageSquareText, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/auth/useAuth'
import { FrontendHeader } from '@/components/partials/frontend/FrontendHeader'

const LOGO_FOOTER = '/images/landing/gidira-logo-footer.svg'

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About Gidira', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Cookies Policy', to: '/cookies-policy' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Business Tips', to: '/business-tips' },
      { label: 'FAQs', to: '/faq' },
    ],
  },
] as const

const statCards = [
  {
    title: 'Favorites',
    subtitle: 'ALL FAVORITES ARE HERE',
    icon: Heart,
    to: '/user/favorites',
  },
  {
    title: 'Messages',
    subtitle: 'ALL DIRECTLY MESSAGES',
    icon: MessageSquareText,
    to: '/user/messages',
  },
  {
    title: 'Settings',
    subtitle: 'MANAGE YOUR PROFILE',
    icon: Settings,
    to: '/user/settings',
  },
] as const

const activities = [
  {
    title: 'You got new message from David',
    detail: 'Deep Tissue Massage with David',
    time: '2 HOURS AGO',
    dot: 'bg-chat-accent',
  },
  {
    title: 'You have favorites Items',
    detail: 'Check your favorites',
    time: 'YESTERDAY',
    dot: 'bg-chat-online-text',
  },
  {
    title: 'New Services are available',
    detail: 'Explore new services',
    time: 'OCT 24',
    dot: 'bg-activity-warning',
  },
] as const

export default function UserDashboard() {
  const { user } = useAuth()
  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'Julian'

  return (
    <div className="min-h-screen bg-auth-bg text-ink">
      <FrontendHeader />

      <main className="mx-auto w-full max-w-[1400px] px-4 py-7 xl:px-12">
        <section className="rounded-2xl bg-card p-6 md:p-10">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-[-0.4px] md:text-5xl md:leading-[58px]">
              Welcome back, {displayName}.
            </h1>
            <p className="mt-2 text-lg text-chat-meta">Glad you&apos;re here</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {statCards.map((card) => {
              const Icon = card.icon
              const content = (
                <>
                  <Icon className="size-5 text-ink-muted" />
                  <h2 className="mt-2 font-heading text-[34px] font-bold leading-9">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.6px] text-chat-meta">
                    {card.subtitle}
                  </p>
                </>
              )
              return (
                card.to ? (
                  <Link
                    key={card.title}
                    to={card.to}
                    className="block rounded-xl bg-card p-6 shadow-[0_3px_6.1px_rgba(0,0,0,0.24)] transition hover:opacity-95"
                  >
                    {content}
                  </Link>
                ) : (
                  <article
                    key={card.title}
                    className="rounded-xl bg-card p-6 shadow-[0_3px_6.1px_rgba(0,0,0,0.24)]"
                  >
                    {content}
                  </article>
                )
              )
            })}
          </div>

          <section className="mt-6">
            <h3 className="font-heading text-3xl font-bold leading-8">
              Recent Activity
            </h3>

            <div className="mt-4 rounded-2xl bg-chat-input-bg px-10 py-6">
              <div className="space-y-6">
                {activities.map((item) => (
                  <div key={item.title} className="relative pl-5">
                    <span className={`absolute left-0 top-1.5 size-2 rounded-full ${item.dot}`} />
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-chat-meta">{item.detail}</p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-[1px] text-chat-meta/60">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      <footer className="mt-4 bg-footer-bar">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 xl:px-12">
          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div>
              <img src={LOGO_FOOTER} alt="Gidira" className="h-8 w-auto" />
              <p className="mt-4 text-sm text-white">FIND BETTER | CONNECT FASTER</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-base font-semibold text-white">{column.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-sm text-footer-muted hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-footer-muted">
              © 2026 GIDIRA. All rights reserved. Built for Nigeria&apos;s Digital Economy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

