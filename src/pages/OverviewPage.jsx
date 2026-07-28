import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { PageHeader, Card } from '../components/ui'

export default function OverviewPage() {
  const { getToken } = useAuth()
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const token = await getToken()
        const [tickets, clients, budget, events, posts, services] =
          await Promise.all([
            api('/crm/tickets', { token }),
            api('/crm/clients', { token }),
            api('/crm/budget', { token }),
            api('/crm/schedule', { token }),
            api('/crm/brainstorm', { token }),
            api('/crm/services', { token }),
          ])
        if (cancelled) return
        setStats({
          openTickets: tickets.tickets.filter((t) => t.status === 'open').length,
          clients: clients.clients.length,
          balance: budget.summary.balance,
          upcoming: events.events.length,
          ideas: posts.posts.length,
          services: services.services.filter((s) => s.active).length,
        })
      } catch (err) {
        if (!cancelled) setError(err.message)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [getToken])

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Studio desk" />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Open tickets', value: stats?.openTickets, to: '/tickets' },
          { label: 'Clients', value: stats?.clients, to: '/clients' },
          {
            label: 'Budget balance (CHF)',
            value: stats ? Number(stats.balance).toFixed(0) : '—',
            to: '/budget',
          },
          { label: 'Schedule items', value: stats?.upcoming, to: '/schedule' },
          { label: 'Brainstorm posts', value: stats?.ideas, to: '/brainstorm' },
          { label: 'Active services', value: stats?.services, to: '/services' },
        ].map((card) => (
          <Link key={card.to} to={card.to}>
            <Card className="transition hover:border-emerald">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {card.label}
              </p>
              <p className="mt-3 font-display text-3xl font-extrabold text-paper">
                {card.value ?? '…'}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
