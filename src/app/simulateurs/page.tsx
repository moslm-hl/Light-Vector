"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'

const categories = {
  macro: { label: 'Macroéconomie', bg: 'bg-[#E1F5EE]', text: 'text-[#0F6E56]', border: 'border-[#1D9E75]', activeBg: '#E1F5EE', activeText: '#0F6E56', activeBorder: '#1D9E75' },
  monnaie: { label: 'Monnaie & Finance', bg: 'bg-[#E6F1FB]', text: 'text-[#185FA5]', border: 'border-[#378ADD]', activeBg: '#E6F1FB', activeText: '#185FA5', activeBorder: '#378ADD' },
  inter: { label: 'International', bg: 'bg-[#FAEEDA]', text: 'text-[#854F0B]', border: 'border-[#BA7517]', activeBg: '#FAEEDA', activeText: '#854F0B', activeBorder: '#BA7517' },
  dev: { label: 'Développement', bg: 'bg-[#EAF3DE]', text: 'text-[#3B6D11]', border: 'border-[#639922]', activeBg: '#EAF3DE', activeText: '#3B6D11', activeBorder: '#639922' },
} as const

type CatKey = keyof typeof categories

const simulators = [
  { id: 'inflation', title: "Inflation & Quantité de monnaie", cat: 'macro' as CatKey, slug: 'inflation', number: '01', desc: 'MV = PY', formula: 'MV = PY' },
  { id: 'chomage', title: 'Chômage & Marché du travail', cat: 'macro' as CatKey, slug: 'chomage', number: '02', desc: 'Courbe de Phillips', formula: 'u* = f(π)' },
  { id: 'dette', title: 'Dette Publique', cat: 'macro' as CatKey, slug: 'dette', number: '03', desc: 'Dynamique de la dette', formula: 'Δ(D/Y)' },
  { id: 'deficit', title: 'Déficit Budgétaire', cat: 'macro' as CatKey, slug: 'deficit', number: '04', desc: 'Solde budgétaire', formula: 'G − T' },
  { id: 'politique-monetaire', title: 'Modèle IS-LM', cat: 'macro' as CatKey, slug: 'politique-monetaire', number: '05', desc: 'Équilibre IS-LM', formula: 'IS: Y=f(r) · LM: r=g(Y)' },
  { id: 'finance-islamique', title: 'Finance Islamique', cat: 'monnaie' as CatKey, slug: 'finance-islamique', number: '06', desc: 'Instruments & principes', formula: 'Mourabaha' },
  { id: 'financement', title: 'Financement de l\'Économie', cat: 'monnaie' as CatKey, slug: 'financement', number: '07', desc: 'Direct vs Indirect & Globalisation', formula: 'Taux Interm.' },
  { id: 'crise-2007', title: 'Crise de 2007', cat: 'macro' as CatKey, slug: 'crise-2007', number: '08', desc: 'Contagion financière', formula: 'Timeline' },
  { id: 'echanges', title: 'Balance des paiements', cat: 'inter' as CatKey, slug: 'echanges', number: '09', desc: 'Comptes extérieurs', formula: 'CA+KA+FA=0' },
  { id: 'taux-de-change', title: 'Taux de Change', cat: 'inter' as CatKey, slug: 'taux-de-change', number: '10', desc: 'Compétitivité-prix', formula: 'Zr = Z×(P*/P)' },
  { id: 'deficit-commercial', title: 'Déficit Commercial', cat: 'inter' as CatKey, slug: 'deficit-commercial', number: '11', desc: 'Solde commercial', formula: 'X − M' },
  { id: 'zone-euro', title: 'Crise de la Zone Euro', cat: 'inter' as CatKey, slug: 'zone-euro', number: '12', desc: 'Spreads souverains', formula: 'OCA: σ, κ, φ' },
  { id: 'croissance', title: 'Croissance & Développement', cat: 'dev' as CatKey, slug: 'croissance', number: '13', desc: 'Taux de croissance PIB', formula: 'Y/L = f(K/L)' },
  { id: 'informel', title: 'Secteur Informel', cat: 'dev' as CatKey, slug: 'informel', number: '14', desc: 'Part du PIB informel', formula: 'Taille/PIB' },
]

const filterButtons = [
  { key: 'tous', label: 'Tous', color: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56' },
  { key: 'macro', label: 'Macroéconomie', color: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56' },
  { key: 'monnaie', label: 'Monnaie', color: '#378ADD', bg: '#E6F1FB', text: '#185FA5' },
  { key: 'inter', label: 'International', color: '#BA7517', bg: '#FAEEDA', text: '#854F0B' },
  { key: 'dev', label: 'Développement', color: '#639922', bg: '#EAF3DE', text: '#3B6D11' },
]

export default function SimulateursHub() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tous')

  const filtered = useMemo(() => {
    let result = simulators
    if (filter !== 'tous') {
      result = result.filter(s => s.cat === filter)
    }
    const q = search.trim().toLowerCase()
    if (q) {
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.formula.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, filter])

  return (
    <div className="pt-8 w-full max-w-[860px] mx-auto pb-20">
      <div className="mb-8">
        <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">Light Vector / Simulateurs</div>
        <h1 className="text-[32px] font-serif mb-2">14 simulateurs <em className="italic text-[#1D9E75]">interactifs</em></h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">Explorez les modèles fondamentaux de l&apos;économie à travers des simulations manipulables en temps réel.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un thème..."
          className="w-full h-9 pl-10 pr-4 rounded-lg border-[0.5px] border-[var(--color-border-tertiary)] text-[13px] outline-none focus:border-[#1D9E75] bg-white transition-colors"
        />
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterButtons.map(fb => {
          const active = filter === fb.key
          return (
            <button
              key={fb.key}
              onClick={() => setFilter(fb.key)}
              className="px-3 py-1.5 rounded-md text-[12px] font-medium transition-all border-[0.5px]"
              style={{
                borderColor: active ? fb.color : 'var(--color-border-tertiary)',
                backgroundColor: active ? fb.bg : 'transparent',
                color: active ? fb.text : 'var(--color-text-tertiary)',
              }}
            >
              {fb.label}
            </button>
          )
        })}
      </div>

      {/* Count */}
      <div className="font-mono text-[11px] text-[var(--color-text-tertiary)] mb-4">{filtered.length} simulateur{filtered.length !== 1 ? 's' : ''}</div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(sim => {
          const cat = categories[sim.cat]
          return (
            <Link key={sim.id} href={`/simulateurs/${sim.slug}`} className="block group">
              <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-4 group-hover:border-[var(--color-border-secondary)] group-hover:-translate-y-[1px] transition-all shadow-sm h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-8 h-8 rounded-lg ${cat.bg} flex items-center justify-center`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cat.text}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{sim.number}</span>
                </div>
                <h3 className="text-[13px] font-medium leading-tight mb-1">{sim.title}</h3>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-[1.5] flex-1">{sim.desc}</p>
                <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] mt-2 mb-3">{sim.formula}</div>
                <div className="pt-3 border-t-[0.5px] border-[var(--color-border-tertiary)] flex items-center justify-between">
                  <span className={`font-mono text-[9px] uppercase px-2 py-1 rounded-sm ${cat.bg} ${cat.text}`}>{cat.label}</span>
                  <span className="text-[var(--color-text-tertiary)] text-[12px] group-hover:text-[#1D9E75] transition-colors">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
