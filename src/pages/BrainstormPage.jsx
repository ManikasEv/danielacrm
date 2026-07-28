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

const empty = { title: '', body: '', tags: '' }

export default function BrainstormPage() {
  const { getToken } = useAuth()
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const token = await getToken()
      const data = await api('/crm/brainstorm', { token })
      setPosts(data.posts)
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
    await api('/crm/brainstorm', {
      token,
      method: 'POST',
      body: {
        title: form.title,
        body: form.body,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      },
    })
    setForm(empty)
    load()
  }

  async function remove(id) {
    if (!confirm('Delete idea?')) return
    const token = await getToken()
    await api(`/crm/brainstorm/${id}`, { token, method: 'DELETE' })
    load()
  }

  return (
    <div>
      <PageHeader eyebrow="Brainstorm" title="Ideas board" />
      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      <Card className="mb-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Title">
            <input
              required
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>
          <Field label="Idea">
            <textarea
              required
              rows={4}
              className={inputClass}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              className={inputClass}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </Field>
          <button type="submit" className={btnPrimary}>
            Post idea
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-extrabold">{p.title}</h2>
                <p className="mt-3 whitespace-pre-wrap text-paper/90">{p.body}</p>
                {p.tags?.length > 0 && (
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-emerald">
                    {p.tags.join(' · ')}
                  </p>
                )}
              </div>
              <button type="button" className={btnGhost} onClick={() => remove(p.id)}>
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
