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
  amount_chf: '',
  kind: 'expense',
  category: '',
  notes: '',
  entry_date: '',
}

export default function BudgetPage() {
  const { getToken } = useAuth()
  const [entries, setEntries] = useState([])
  const [summary, setSummary] = useState(null)
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const data = await api('/crm/budget', { token })
      setEntries(data.entries)
      setSummary(data.summary)
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
    await api('/crm/budget', {
      token,
      method: 'POST',
      body: {
        ...form,
        amount_chf: Number(form.amount_chf),
        entry_date: form.entry_date || undefined,
      },
    })
    setForm(empty)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete entry?')) return
    const token = await getToken()
    await api(`/crm/budget/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader eyebrow="Budget" title="Studio finances" />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      {summary && (
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Income</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-emerald">
              {Number(summary.income).toFixed(0)} CHF
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Expense</p>
            <p className="mt-2 font-display text-2xl font-extrabold">
              {Number(summary.expense).toFixed(0)} CHF
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Balance</p>
            <p className="mt-2 font-display text-2xl font-extrabold">
              {Number(summary.balance).toFixed(0)} CHF
            </p>
          </Card>
        </div>
      )}

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
          <Field label="Amount (CHF)">
            <input
              required
              type="number"
              step="0.01"
              className={inputClass}
              value={form.amount_chf}
              onChange={(e) => setForm({ ...form, amount_chf: e.target.value })}
            />
          </Field>
          <Field label="Kind">
            <select
              className={inputClass}
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value })}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </Field>
          <Field label="Date">
            <input
              type="date"
              className={inputClass}
              value={form.entry_date}
              onChange={(e) => setForm({ ...form, entry_date: e.target.value })}
            />
          </Field>
          <button type="submit" className={btnPrimary}>
            Add entry
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {entries.map((e) => (
          <Card key={e.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-emerald">
                {e.kind} · {e.entry_date}
              </p>
              <p className="mt-1 font-display text-lg font-bold">{e.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-display text-xl font-extrabold">
                {Number(e.amount_chf).toFixed(0)}
              </p>
              <button type="button" className={btnGhost} onClick={() => remove(e.id)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
