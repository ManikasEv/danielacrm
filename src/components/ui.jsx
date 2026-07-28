export function PageHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald">
          {eyebrow}
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`border border-line bg-ink-soft/40 p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full border-b border-line bg-transparent py-3 text-base text-paper outline-none focus:border-emerald'

export const btnPrimary =
  'inline-flex min-h-11 items-center justify-center bg-emerald px-5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-emerald-bright'

export const btnGhost =
  'inline-flex min-h-11 items-center justify-center border border-line px-4 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition hover:border-emerald hover:text-emerald'
