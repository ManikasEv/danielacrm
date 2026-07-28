import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { api } from '../lib/api'
import {
  PageHeader,
  Card,
  Field,
  inputClass,
  btnPrimary,
  btnGhost,
} from '../components/ui'

const empty = {
  title: '',
  description: '',
  starts_at: '',
  ends_at: '',
  location: '',
}

export default function SchedulePage() {
  const { getToken } = useAuth()
  const [events, setEvents] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const data = await api('/crm/schedule', { token })
      setEvents(data.events)
    } catch (err) {
      setError(err.message)
    }
  }, [getToken])

  useEffect(() => {
    load()
  }, [load])

  async function onSubmit(e) {
    e.preventDefault()
    const token = await getToken()
    await api('/crm/schedule', {
      token,
      method: 'POST',
      body: {
        ...form,
        ends_at: form.ends_at || null,
      },
    })
    setForm(empty)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete event?')) return
    const token = await getToken()
    await api(`/crm/schedule/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader eyebrow="Schedule" title="Production calendar" />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      <Card className="mb-8">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <input
              required
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
          <Field label="Starts">
            <input
              required
              type="datetime-local"
              className={inputClass}
              value={form.starts_at}
              onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
            />
          </Field>
          <Field label="Ends">
            <input
              type="datetime-local"
              className={inputClass}
              value={form.ends_at}
              onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                rows={3}
                className={inputClass}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>
          </div>
          <button type="submit" className={btnPrimary}>
            Add event
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {events.map((ev) => (
          <Card key={ev.id} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-emerald">
                {new Date(ev.starts_at).toLocaleString()}
              </p>
              <h2 className="mt-1 font-display text-xl font-extrabold">
                {ev.title}
              </h2>
              {ev.location && (
                <p className="mt-1 text-sm text-muted">{ev.location}</p>
              )}
              {ev.description && (
                <p className="mt-2 text-sm text-paper/80">{ev.description}</p>
              )}
            </div>
            <button type="button" className={btnGhost} onClick={() => remove(ev.id)}>
              Delete
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
