import { NavLink } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

const LINKS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/tickets', label: 'Tickets' },
  { to: '/clients', label: 'Clients' },
  { to: '/budget', label: 'Budget' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/brainstorm', label: 'Brainstorm' },
  { to: '/services', label: 'Services' },
]

export default function CrmShell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-6">
            <a href="/" className="shrink-0 font-display text-lg font-extrabold tracking-tight">
              Daniela<span className="text-emerald">CRM</span>
            </a>
            <nav className="hidden gap-1 md:flex">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    [
                      'px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
                      isActive
                        ? 'text-emerald'
                        : 'text-muted hover:text-paper',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-line px-2 py-2 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'shrink-0 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]',
                  isActive ? 'text-emerald' : 'text-muted',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  )
}
