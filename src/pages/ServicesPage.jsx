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
  name: '',
  description: '',
  price_from_chf: '',
  active: true,
  sort_order: 0,
}

export default function ServicesPage() {
  const { getToken } = useAuth()
  const [services, setServices] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const data = await api('/crm/services', { token })
      setServices(data.services)
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
    await api('/crm/services', {
      token,
      method: 'POST',
      body: {
        name: form.name,
        description: form.description || null,
        price_from_chf: form.price_from_chf
          ? Number(form.price_from_chf)
          : null,
        active: form.active,
        sort_order: Number(form.sort_order) || 0,
      },
    })
    setForm(empty)
    load()
  }

  async function toggleActive(service) {
    const token = await getToken()
    await api(`/crm/services/${service.id}`, {
      token,
      method: 'PATCH',
      body: { active: !service.active },
    })
    load()
  }

  async function remove(id) {
    if (!confirm('Delete service?')) return
    const token = await getToken()
    await api(`/crm/services/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader
        eyebrow="Services"
        title="Internal service catalog"
      />
      <p className="mb-6 max-w-2xl text-muted">
        CRM-only list for your team — not connected to the public website packages.
      </p>
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
          <Field label="From price (CHF)">
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.price_from_chf}
              onChange={(e) =>
                setForm({ ...form, price_from_chf: e.target.value })
              }
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
            Add service
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {services.map((s) => (
          <Card key={s.id} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-emerald">
                {s.active ? 'Active' : 'Inactive'}
                {s.price_from_chf != null
                  ? ` · from ${Number(s.price_from_chf).toFixed(0)} CHF`
                  : ''}
              </p>
              <h2 className="mt-1 font-display text-xl font-extrabold">
                {s.name}
              </h2>
              {s.description && (
                <p className="mt-2 text-sm text-muted">{s.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={btnGhost}
                onClick={() => toggleActive(s)}
              >
                {s.active ? 'Disable' : 'Enable'}
              </button>
              <button type="button" className={btnGhost} onClick={() => remove(s.id)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
