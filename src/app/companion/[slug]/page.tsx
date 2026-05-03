import Link from 'next/link'
import { themes } from '@/lib/courseData'

export default async function CompanionThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const theme = themes.find(t => t.slug === slug)

  if (!theme) {
    return (
      <div className="pt-8">
        <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">Light Vector / Companion</div>
        <h1 className="text-[28px] font-serif mb-2">Thème introuvable</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-6">Slug: {slug}</p>
        <Link href="/companion" className="text-[#1D9E75] hover:underline">Retour</Link>
      </div>
    )
  }

  return (
    <div className="pt-2 pb-16">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-mono mb-2">
        <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Light Vector</Link>
        <span>/</span>
        <Link href="/companion" className="hover:text-[var(--color-text-primary)] transition-colors">Companion</Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">{theme.title}</span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-[32px] font-serif leading-tight">{theme.title}</h1>
        <span className="font-mono text-[10px] bg-[#E1F5EE] text-[#1D9E75] px-2 py-1 rounded">{theme.category.toUpperCase()}</span>
      </div>

      <div className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] max-w-[760px]">
        {theme.definition}
      </div>

      <div className="mt-8 flex flex-col gap-6 max-w-[800px]">
        <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-5 shadow-sm">
          <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Concepts clés</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {theme.keyConcepts.map(c => (
              <div key={c.term} className="border-[0.5px] border-[var(--color-border-tertiary)] rounded-[10px] p-3">
                <div className="font-medium text-[13px]">{c.term}</div>
                <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">{c.definition}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-5 shadow-sm">
          <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Formules</div>
          <div className="flex flex-col gap-3">
            {theme.formulas.length === 0 ? (
              <div className="text-[13px] text-[var(--color-text-secondary)]">Aucune formule pour ce thème.</div>
            ) : (
              theme.formulas.map((f, idx) => (
                <div key={idx} className="bg-[var(--color-background-secondary)] border-l-[3px] border-l-[#1D9E75] p-3">
                  <div className="font-mono text-[12px]">{f.expression}</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)] mt-1">{f.description}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-5 shadow-sm">
          <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Exemples</div>
          <div className="flex flex-col gap-3">
            {theme.examples.map(ex => (
              <div key={ex.title} className="border-[0.5px] border-[var(--color-border-tertiary)] rounded-[10px] p-3">
                <div className="font-medium text-[13px]">{ex.title}</div>
                <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">{ex.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-5 shadow-sm">
          <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">Lien</div>
          <div className="text-[13px] text-[var(--color-text-secondary)] leading-[1.7] mb-4">
            Accédez au simulateur correspondant pour manipuler le modèle.
          </div>
          <Link
            href={`/simulateurs/${theme.slug}`}
            className="inline-flex bg-[#1D9E75] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#188562] transition-colors"
          >
            Voir le simulateur →
          </Link>
        </div>
      </div>
    </div>
  )
}
