import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { api } from '../lib/api'
import { PageHeader, Card, btnGhost } from '../components/ui'

const STATUSES = ['open', 'in_progress', 'done', 'closed']

export default function TicketsPage() {
  const { getToken } = useAuth()
  const [tickets, setTickets] = useState([])
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const q = filter ? `?status=${filter}` : ''
      const data = await api(`/crm/tickets${q}`, { token })
      setTickets(data.tickets)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }, [getToken, filter])

  useEffect(() => {
    load()
  }, [load])

  async function updateStatus(id, status) {
    const token = await getToken()
    await api(`/crm/tickets/${id}`, {
      token,
      method: 'PATCH',
      body: { status },
    })
    load()
  }

  async function remove(id) {
    if (!confirm('Delete this ticket?')) return
    const token = await getToken()
    await api(`/crm/tickets/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader
        eyebrow="Tickets"
        title="Incoming briefs"
        action={
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnGhost} onClick={() => setFilter('')}>
              All
            </button>
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={btnGhost}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        }
      />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
      <div className="space-y-3">
        {tickets.map((t) => (
          <Card key={t.id}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald">
                  {t.category} · {t.status}
                </p>
                <h2 className="mt-2 font-display text-xl font-extrabold">
                  {t.subject}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {t.name} · {t.email}
                  {t.package ? ` · ${t.package}` : ''}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-base text-paper/90">
                  {t.message}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <select
                  className="border border-line bg-ink px-3 py-2 text-sm"
                  value={t.status}
                  onChange={(e) => updateStatus(t.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button type="button" className={btnGhost} onClick={() => remove(t.id)}>
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
        {!tickets.length && (
          <p className="text-muted">No tickets yet — clients submit via /ticket.</p>
        )}
      </div>
    </div>
  )
}
