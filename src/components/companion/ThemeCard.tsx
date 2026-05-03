import Link from 'next/link'

interface ThemeCardProps {
  number: string
  title: string
  description: string
  slug: string
  badge: string
}

export default function ThemeCard({ number, title, description, slug, badge }: ThemeCardProps) {
  return (
    <Link href={`/companion/${slug}`} className="block">
      <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-[12px] p-4 hover:border-[var(--color-border-secondary)] hover:-translate-y-[1px] transition-all shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <span className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{number}</span>
          <span className="font-mono text-[10px] bg-[#E1F5EE] text-[#1D9E75] px-2 py-1 rounded">{badge}</span>
        </div>
        <div className="text-[14px] font-medium leading-tight mb-1">{title}</div>
        <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">{description}</div>
        <div className="mt-4 pt-3 border-t-[0.5px] border-[var(--color-border-tertiary)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--color-text-tertiary)] font-mono">Étudier</span>
          <span className="text-[var(--color-text-tertiary)] text-[12px]">→</span>
        </div>
      </div>
    </Link>
  )
}
