"use client"

import { useMemo, useState } from 'react'
import type { GlossaryEntry } from '@/lib/glossary'

export default function GlossarySearch({ entries }: { entries: GlossaryEntry[] }) {
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return entries.slice(0, 12)
    return entries
      .filter(e => e.term.toLowerCase().includes(query) || e.definition.toLowerCase().includes(query))
      .slice(0, 12)
  }, [entries, q])

  return (
    <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-4 shadow-sm sticky top-[76px]">
      <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Glossaire</div>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Rechercher un terme..."
        className="w-full h-9 px-3 rounded-md border-[0.5px] border-[var(--color-border-tertiary)] text-[13px] outline-none focus:border-[#1D9E75]"
      />
      <div className="mt-4 flex flex-col gap-3">
        {results.map(r => (
          <div key={r.term} className="border-[0.5px] border-[var(--color-border-tertiary)] rounded-[10px] p-3">
            <div className="font-medium text-[13px]">{r.term}</div>
            <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">{r.definition}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
