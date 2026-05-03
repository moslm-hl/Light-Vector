import Link from 'next/link'

const themeChips = [
  { label: 'Inflation', slug: 'inflation', cat: 'macro' },
  { label: 'Chômage', slug: 'chomage', cat: 'macro' },
  { label: 'Dette', slug: 'dette', cat: 'macro' },
  { label: 'Déficit', slug: 'deficit', cat: 'macro' },
  { label: 'Finance Isl.', slug: 'finance-islamique', cat: 'monnaie' },
  { label: 'Crise 2007', slug: 'crise-2007', cat: 'macro' },
  { label: 'Échanges', slug: 'echanges', cat: 'inter' },
  { label: 'Change', slug: 'taux-de-change', cat: 'inter' },
  { label: 'Déf. Comm.', slug: 'deficit-commercial', cat: 'inter' },
  { label: 'Croissance', slug: 'croissance', cat: 'dev' },
  { label: 'Informel', slug: 'informel', cat: 'dev' },
  { label: 'Financement', slug: 'financement', cat: 'monnaie' },
  { label: 'IS-LM', slug: 'politique-monetaire', cat: 'macro' },
  { label: 'Zone Euro', slug: 'zone-euro', cat: 'inter' },
]

const catDot: Record<string, string> = {
  macro: '#1D9E75',
  monnaie: '#378ADD',
  inter: '#BA7517',
  dev: '#639922',
}

export default function Home() {
  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-6">
          <div className="font-mono text-[11px] bg-[#E1F5EE] text-[#0F6E56] px-3 py-1 rounded-full flex items-center gap-2 border border-[#5DCAA5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]"></span>
            Économie Générale 2026
          </div>
          
          <h1 className="text-[44px] leading-[1.08] tracking-[-1px] text-[var(--color-text-primary)]">
            Apprenez l&apos;économie <em className="text-[#1D9E75] italic">en simulant</em>
          </h1>
          
          <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[380px] leading-[1.7]">
            EconoSim est une plateforme d&apos;apprentissage interactive qui transforme les concepts de la macroéconomie en expériences visuelles et manipulables.
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="/simulateurs" className="bg-[#1D9E75] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#188562] transition-colors flex items-center gap-2 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Explorer les modules
            </Link>
            <Link href="/circuit" className="border-[0.5px] border-[var(--color-border-secondary)] bg-white text-[var(--color-text-secondary)] px-5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[var(--color-background-secondary)] transition-colors shadow-sm">
              Voir le circuit
            </Link>
          </div>
          
          <div className="mt-4 pt-6 border-t-[0.5px] border-[var(--color-border-tertiary)] w-full flex items-center gap-8">
            <div>
              <div className="font-mono text-[22px] font-medium">14</div>
              <div className="text-[11px] uppercase text-[var(--color-text-tertiary)] tracking-wide font-medium mt-1">Thèmes</div>
            </div>
            <div>
              <div className="font-mono text-[22px] font-medium">47</div>
              <div className="text-[11px] uppercase text-[var(--color-text-tertiary)] tracking-wide font-medium mt-1">Formules</div>
            </div>
          </div>
        </div>

        {/* Right Column - Animated Circuit Preview */}
        <div className="bg-white rounded-[12px] p-5 border-[0.5px] border-[var(--color-border-tertiary)] flex flex-col min-h-[340px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase font-medium">
            CIRCUIT ÉCONOMIQUE · 3 AGENTS
          </div>
          <svg viewBox="0 0 320 220" className="w-full flex-1">
            <style>{`
              @keyframes flowAnim1 { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -14; } }
              @keyframes flowAnim2 { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -14; } }
              @keyframes flowAnim3 { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -14; } }
              .flow1 { animation: flowAnim1 1.8s linear infinite; }
              .flow2 { animation: flowAnim2 2.2s linear infinite; }
              .flow3 { animation: flowAnim3 2.6s linear infinite; }
            `}</style>

            {/* Ménages node */}
            <rect x="10" y="110" width="80" height="44" rx="6" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="1"/>
            <text x="50" y="131" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="8" fill="#0F6E56" fontWeight="500">MÉNAGES</text>
            <text x="50" y="143" textAnchor="middle" fontFamily="var(--font-outfit)" fontSize="6.5" fill="#6b7280">C, L, Épargne</text>

            {/* État node */}
            <rect x="120" y="10" width="80" height="44" rx="6" fill="#E6F1FB" stroke="#85B7EB" strokeWidth="1"/>
            <text x="160" y="31" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="8" fill="#185FA5" fontWeight="500">ÉTAT</text>
            <text x="160" y="43" textAnchor="middle" fontFamily="var(--font-outfit)" fontSize="6.5" fill="#6b7280">G, T, Budget</text>

            {/* Entreprises node */}
            <rect x="230" y="110" width="80" height="44" rx="6" fill="#FAEEDA" stroke="#EF9F27" strokeWidth="1"/>
            <text x="270" y="131" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="8" fill="#854F0B" fontWeight="500">ENTREPRISES</text>
            <text x="270" y="143" textAnchor="middle" fontFamily="var(--font-outfit)" fontSize="6.5" fill="#6b7280">Y, I, Salaires</text>

            {/* Marché node */}
            <rect x="120" y="170" width="80" height="40" rx="6" fill="#F1EFE8" stroke="#B4B2A9" strokeWidth="1"/>
            <text x="160" y="193" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="7.5" fill="#6b7280">MARCHÉ</text>

            {/* Flow arrows */}
            {/* Ménages → État: Impôts T */}
            <path d="M 70 110 Q 100 60 130 40" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="4 3" className="flow1" markerEnd="url(#heroArrow)"/>
            <text x="85" y="68" fontFamily="var(--font-dm-mono)" fontSize="6" fill="#1D9E75">Impôts T</text>

            {/* État → Entreprises: Dépenses G */}
            <path d="M 200 40 Q 240 70 250 110" fill="none" stroke="#378ADD" strokeWidth="1.5" strokeDasharray="4 3" className="flow2" markerEnd="url(#heroArrow)"/>
            <text x="235" y="68" fontFamily="var(--font-dm-mono)" fontSize="6" fill="#378ADD">Dépenses G</text>

            {/* Entreprises → Marché: Production Y */}
            <path d="M 250 154 Q 220 170 200 178" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="4 3" className="flow3" markerEnd="url(#heroArrow)"/>
            <text x="240" y="175" fontFamily="var(--font-dm-mono)" fontSize="6" fill="#BA7517">Production Y</text>

            {/* Marché → Ménages: Conso C */}
            <path d="M 120 180 Q 90 170 70 154" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="4 3" className="flow2" markerEnd="url(#heroArrow)"/>
            <text x="75" y="178" fontFamily="var(--font-dm-mono)" fontSize="6" fill="#1D9E75">Conso C</text>

            {/* Entreprises → Ménages: Salaires W */}
            <path d="M 230 140 Q 160 150 90 140" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="4 3" className="flow1" markerEnd="url(#heroArrow)"/>
            <text x="160" y="160" fontFamily="var(--font-dm-mono)" fontSize="6" fill="#BA7517">Salaires W</text>

            <defs>
              <marker id="heroArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <path d="M 0 0 L 8 3 L 0 6 z" fill="rgba(17,24,39,0.45)" />
              </marker>
            </defs>
          </svg>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t-[0.5px] border-[var(--color-border-tertiary)]">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-[0] border-t border-dashed border-[#1D9E75]"></div>
              <span className="font-mono text-[8px] text-[#1D9E75]">Ménages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-[0] border-t border-dashed border-[#378ADD]"></div>
              <span className="font-mono text-[8px] text-[#378ADD]">État</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-[0] border-t border-dashed border-[#BA7517]"></div>
              <span className="font-mono text-[8px] text-[#BA7517]">Entreprises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards Section */}
      <div className="mt-16">
        <div className="text-[12px] uppercase text-[var(--color-text-tertiary)] tracking-wider font-medium mb-4 font-mono">3 modules intégrés</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Simulateurs */}
          <Link href="/simulateurs" className="h-full">
            <div className="h-full bg-white rounded-[12px] p-5 border-[0.5px] border-[var(--color-border-tertiary)] hover:border-[var(--color-border-secondary)] hover:-translate-y-[1px] transition-all shadow-sm flex flex-col">
              <div className="w-9 h-9 rounded-lg bg-[#E1F5EE] flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="text-[14px] font-medium mb-1">Simulateurs interactifs</div>
              <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6] mb-3 flex-1">Manipulez les variables et observez les effets en temps réel sur les modèles économiques.</div>
              <div>
                <span className="font-mono text-[10px] bg-[#E1F5EE] text-[#0F6E56] px-2 py-1 rounded">14 thèmes</span>
              </div>
            </div>
          </Link>
          {/* Circuit */}
          <Link href="/circuit" className="h-full">
            <div className="h-full bg-white rounded-[12px] p-5 border-[0.5px] border-[var(--color-border-tertiary)] hover:border-[var(--color-border-secondary)] hover:-translate-y-[1px] transition-all shadow-sm flex flex-col">
              <div className="w-9 h-9 rounded-lg bg-[#E6F1FB] flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
              </div>
              <div className="text-[14px] font-medium mb-1">Circuit économique</div>
              <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6] mb-3 flex-1">Visualisez les flux entre agents économiques avec des animations interactives.</div>
              <div>
                <span className="font-mono text-[10px] bg-[#E6F1FB] text-[#185FA5] px-2 py-1 rounded">2 · 3 · 4 agents</span>
              </div>
            </div>
          </Link>
          {/* Companion */}
          <Link href="/companion" className="h-full">
            <div className="h-full bg-white rounded-[12px] p-5 border-[0.5px] border-[var(--color-border-tertiary)] hover:border-[var(--color-border-secondary)] hover:-translate-y-[1px] transition-all shadow-sm flex flex-col">
              <div className="w-9 h-9 rounded-lg bg-[#FAEEDA] flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div className="text-[14px] font-medium mb-1">Course companion</div>
              <div className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6] mb-3 flex-1">Révisez avec le glossaire et les fiches de cours détaillées par thème.</div>
              <div>
                <span className="font-mono text-[10px] bg-[#FAEEDA] text-[#854F0B] px-2 py-1 rounded">65+ termes</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Theme Chips Grid */}
      <div className="mt-16">
        <div className="text-[12px] uppercase text-[var(--color-text-tertiary)] tracking-wider font-medium mb-4 font-mono">14 thèmes couverts</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {themeChips.map((chip, i) => (
            <Link key={chip.slug} href={`/simulateurs/${chip.slug}`} className="block">
              <div className="bg-white border-[0.5px] border-[var(--color-border-tertiary)] rounded-lg px-2.5 py-2 text-center hover:border-[#1D9E75] transition-colors">
                <div className="font-mono text-[9px] text-[var(--color-text-tertiary)] mb-0.5">{String(i + 1).padStart(2, '0')}</div>
                <div className="text-[10px] text-[var(--color-text-secondary)] leading-tight">{chip.label}</div>
                <div className="mt-1.5 mx-auto w-[5px] h-[5px] rounded-full" style={{ backgroundColor: catDot[chip.cat] }}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Live Data Strip */}
      <div className="mt-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span></span>
          <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">Données Tunisie · World Bank</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-[12px] p-4 border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Inflation CPI</div>
            <div className="font-mono text-[20px] font-medium">9.3%</div>
            <div className="text-[11px] font-mono text-[#D85A30] mt-0.5">▲ hausse</div>
          </div>
          <div className="bg-white rounded-[12px] p-4 border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Chômage</div>
            <div className="font-mono text-[20px] font-medium">15.1%</div>
            <div className="text-[11px] font-mono text-[#1D9E75] mt-0.5">▼ baisse</div>
          </div>
          <div className="bg-white rounded-[12px] p-4 border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Croissance PIB</div>
            <div className="font-mono text-[20px] font-medium">1.8%</div>
            <div className="text-[11px] font-mono text-[var(--color-text-tertiary)] mt-0.5">→ stable</div>
          </div>
          <div className="bg-white rounded-[12px] p-4 border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Dette publique</div>
            <div className="font-mono text-[20px] font-medium">81.2%</div>
            <div className="text-[11px] font-mono text-[#D85A30] mt-0.5">▲ hausse</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-6 border-t-[0.5px] border-[var(--color-border-tertiary)] flex items-center justify-between">
        <div className="font-mono text-[11px] text-[var(--color-text-tertiary)] flex flex-col gap-1">
          <div>© 2026 EconoSim — Économie Générale</div>
          <div className="opacity-70">Created by Moslm HLIMI</div>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--color-text-tertiary)]">
          <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-[var(--color-text-primary)] transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
