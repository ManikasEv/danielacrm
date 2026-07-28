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

const empty = { name: '', email: '', company: '', phone: '', notes: '' }

export default function ClientsPage() {
  const { getToken } = useAuth()
  const [clients, setClients] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const data = await api('/crm/clients', { token })
      setClients(data.clients)
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
    await api('/crm/clients', { token, method: 'POST', body: form })
    setForm(empty)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete client?')) return
    const token = await getToken()
    await api(`/crm/clients/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader eyebrow="Clients" title="Our clients" />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      <Card className="mb-8">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Company">
            <input
              className={inputClass}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes">
              <textarea
                rows={3}
                className={inputClass}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Field>
          </div>
          <button type="submit" className={btnPrimary}>
            Add client
          </button>
        </form>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {clients.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-extrabold">{c.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  {[c.company, c.email, c.phone].filter(Boolean).join(' · ')}
                </p>
                {c.notes && (
                  <p className="mt-3 text-sm text-paper/80">{c.notes}</p>
                )}
              </div>
              <button type="button" className={btnGhost} onClick={() => remove(c.id)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
