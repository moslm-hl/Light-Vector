import ThemeCard from '@/components/companion/ThemeCard'
import GlossarySearch from '@/components/companion/GlossarySearch'
import { themes } from '@/lib/courseData'
import { glossary } from '@/lib/glossary'

export default function CompanionHubPage() {
  return (
    <div className="pt-8 w-full pb-20">
      <div className="mb-8">
        <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">Light Vector / Companion</div>
        <h1 className="text-[32px] font-serif mb-2">Course <em className="italic text-[#1D9E75]">companion</em></h1>
        <p className="text-[13px] text-[var(--color-text-secondary)] max-w-[700px]">
          Révisez chaque thème: définition, concepts clés, formules et mini-quiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map(t => (
            <ThemeCard
              key={t.slug}
              number={t.id}
              title={t.title}
              description={t.definition}
              slug={t.slug}
              badge={t.category.toUpperCase()}
            />
          ))}
        </div>

        <div>
          <GlossarySearch entries={glossary} />
        </div>
      </div>
    </div>
  )
}
