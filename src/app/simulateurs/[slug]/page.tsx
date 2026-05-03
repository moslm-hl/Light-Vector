"use client"

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SliderPanel from '@/components/simulators/SliderPanel'
import ChartOutput, { type ChartType } from '@/components/simulators/ChartOutput'
import MetricCard from '@/components/simulators/MetricCard'
import InsightCard from '@/components/simulators/InsightCard'
import type { SliderConfig, SimulatorOutput } from '@/lib/types'
import { simulators } from '@/lib/simulators'
import FinancingVisualizer from '@/components/simulators/FinancingVisualizer'

type SimulatorSlug =
  | 'inflation'
  | 'chomage'
  | 'dette'
  | 'deficit'
  | 'finance-islamique'
  | 'crise-2007'
  | 'echanges'
  | 'taux-de-change'
  | 'deficit-commercial'
  | 'croissance'
  | 'informel'
  | 'financement'
  | 'politique-monetaire'
  | 'zone-euro'

type SimulatorPageConfig = {
  title: string
  badge: string
  chartType: ChartType
  xLabel: string
  yLabel: string
  inputs: SliderConfig[]
}

const SIMULATOR_CONFIGS: Record<SimulatorSlug, SimulatorPageConfig> = {
  inflation: {
    title: "L'Inflation",
    badge: 'MACRO',
    chartType: 'line', xLabel: 'Masse monétaire (M)', yLabel: 'Niveau des prix (P)',
    inputs: [
      { id: 'M', label: 'Masse monétaire (M)', min: 50, max: 2000, step: 10, default: 400, unit: '' },
      { id: 'V', label: 'Vitesse (V)', min: 0.5, max: 10, step: 0.1, default: 2, unit: '' },
      { id: 'Y', label: 'PIB réel (Y)', min: 50, max: 5000, step: 50, default: 1000, unit: '' },
    ],
  },
  chomage: {
    title: 'Le Chômage',
    badge: 'MACRO',
    chartType: 'line', xLabel: 'Inflation π (%)', yLabel: 'Chômage u (%)',
    inputs: [
      { id: 'un', label: 'Chômage naturel (uₙ)', min: 0, max: 30, step: 0.5, default: 10, unit: '%' },
      { id: 'alpha', label: 'Sensibilité (α)', min: 0, max: 2, step: 0.05, default: 0.5, unit: '' },
      { id: 'pi', label: 'Inflation (π)', min: 0, max: 20, step: 0.5, default: 6, unit: '%' },
      { id: 'pie', label: 'Inflation anticipée (πᵉ)', min: 0, max: 20, step: 0.5, default: 5, unit: '%' },
    ],
  },
  dette: {
    title: 'Dette Publique',
    badge: 'MACRO',
    chartType: 'area', xLabel: 'Années', yLabel: 'Dette/PIB (%)',
    inputs: [
      { id: 'debt', label: 'Dette/PIB (t)', min: 0, max: 200, step: 1, default: 80, unit: '%' },
      { id: 'g', label: 'Croissance (g)', min: -5, max: 15, step: 0.5, default: 2, unit: '%' },
      { id: 'r', label: "Taux d'intérêt (r)", min: 0, max: 15, step: 0.5, default: 5, unit: '%' },
      { id: 'primary', label: 'Solde primaire (p)', min: -20, max: 20, step: 0.5, default: 0, unit: '% PIB' },
    ],
  },
  deficit: {
    title: 'Déficit Budgétaire',
    badge: 'MACRO',
    chartType: 'bar', xLabel: '', yLabel: 'Montant',
    inputs: [
      { id: 'G', label: 'Dépenses publiques (G)', min: 0, max: 2000, step: 10, default: 600, unit: '' },
      { id: 'T', label: 'Recettes fiscales (T)', min: 0, max: 2000, step: 10, default: 550, unit: '' },
    ],
  },
  'finance-islamique': {
    title: 'Finance Islamique',
    badge: 'MONNAIE',
    chartType: 'bar', xLabel: 'Instrument', yLabel: 'Score',
    inputs: [
      { id: 'murabaha', label: 'Mourabaha (score)', min: 0, max: 100, step: 1, default: 60, unit: '' },
      { id: 'mudaraba', label: 'Moudaraba (score)', min: 0, max: 100, step: 1, default: 25, unit: '' },
      { id: 'musharaka', label: 'Moucharaka (score)', min: 0, max: 100, step: 1, default: 15, unit: '' },
    ],
  },
  'crise-2007': {
    title: 'Crise 2007',
    badge: 'MACRO',
    chartType: 'area', xLabel: 'Temps', yLabel: 'Intensité du choc',
    inputs: [
      { id: 'shock', label: 'Choc initial', min: 1, max: 100, step: 1, default: 30, unit: '' },
      { id: 'leverage', label: 'Levier', min: 1, max: 20, step: 1, default: 10, unit: '' },
    ],
  },
  echanges: {
    title: 'Échanges Internationaux',
    badge: 'INTERNATIONAL',
    chartType: 'bar', xLabel: '', yLabel: 'Montant',
    inputs: [
      { id: 'X', label: 'Exportations (X)', min: 0, max: 2000, step: 10, default: 600, unit: '' },
      { id: 'M', label: 'Importations (M)', min: 0, max: 2000, step: 10, default: 700, unit: '' },
      { id: 'R', label: 'Revenus (R)', min: -500, max: 500, step: 10, default: -50, unit: '' },
      { id: 'TR', label: 'Transferts (TR)', min: -500, max: 500, step: 10, default: 80, unit: '' },
      { id: 'KA', label: 'Compte capital (KA)', min: -500, max: 500, step: 10, default: 0, unit: '' },
      { id: 'FA', label: 'Compte financier (FA)', min: -500, max: 500, step: 10, default: 50, unit: '' },
    ],
  },
  'taux-de-change': {
    title: 'Taux de Change',
    badge: 'INTERNATIONAL',
    chartType: 'line', xLabel: 'Taux nominal (Z)', yLabel: 'Taux réel (Zr)',
    inputs: [
      { id: 'Z', label: 'Taux nominal (Z)', min: 0.5, max: 10, step: 0.1, default: 3, unit: '' },
      { id: 'P', label: 'Prix domestiques (P)', min: 50, max: 200, step: 1, default: 120, unit: '' },
      { id: 'PStar', label: 'Prix étrangers (P*)', min: 50, max: 200, step: 1, default: 100, unit: '' },
    ],
  },
  'deficit-commercial': {
    title: 'Déficit Commercial',
    badge: 'INTERNATIONAL',
    chartType: 'bar', xLabel: '', yLabel: 'Montant',
    inputs: [
      { id: 'X', label: 'Exportations (X)', min: 0, max: 2000, step: 10, default: 600, unit: '' },
      { id: 'M', label: 'Importations (M)', min: 0, max: 2000, step: 10, default: 750, unit: '' },
    ],
  },
  croissance: {
    title: 'Croissance',
    badge: 'DÉVELOPPEMENT',
    chartType: 'bar', xLabel: '', yLabel: 'PIB',
    inputs: [
      { id: 'gdp0', label: 'PIB (t-1)', min: 1, max: 10000, step: 50, default: 2500, unit: '' },
      { id: 'gdp1', label: 'PIB (t)', min: 1, max: 10000, step: 50, default: 2600, unit: '' },
    ],
  },
  informel: {
    title: 'Secteur Informel',
    badge: 'DÉVELOPPEMENT',
    chartType: 'bar', xLabel: '', yLabel: 'Valeur',
    inputs: [
      { id: 'totalPIB', label: 'PIB total', min: 1, max: 10000, step: 50, default: 2500, unit: '' },
      { id: 'informalShare', label: 'Part informelle', min: 0, max: 80, step: 1, default: 35, unit: '%' },
    ],
  },
  financement: {
    title: 'Financement de l\'Économie',
    badge: 'MONNAIE',
    chartType: 'bar', xLabel: 'Source', yLabel: 'Montant (Md DT)',
    inputs: [
      { id: 'besoin', label: 'Besoins de financement', min: 100, max: 100000, step: 500, default: 20000, unit: 'Md DT' },
      { id: 'epargne', label: 'Épargne brute', min: 0, max: 50000, step: 100, default: 8000, unit: 'Md DT' },
      { id: 'credit', label: 'Crédit bancaire', min: 0, max: 50000, step: 100, default: 10000, unit: 'Md DT' },
      { id: 'marche', label: 'Marchés financiers', min: 0, max: 50000, step: 100, default: 2000, unit: 'Md DT' },
    ],
  },
  'politique-monetaire': {
    title: 'Politique Monétaire (IS-LM)',
    badge: 'MACRO',
    chartType: 'is-lm', xLabel: "Taux d'intérêt (r %)", yLabel: 'Production (Y)',
    inputs: [
      { id: 'A0', label: 'Dépenses autonomes (A₀)', min: 100, max: 2000, step: 10, default: 500, unit: '' },
      { id: 'b', label: 'Sensibilité invest. (b)', min: 1, max: 100, step: 1, default: 30, unit: '' },
      { id: 'h', label: 'Paramètre IS (h)', min: 1, max: 50, step: 1, default: 20, unit: '' },
      { id: 'Mo', label: "Offre de monnaie (M₀)", min: 50, max: 2000, step: 10, default: 400, unit: '' },
      { id: 'k', label: 'Demande transaction (k)', min: 0.1, max: 1, step: 0.05, default: 0.3, unit: '' },
      { id: 'g', label: 'Demande spéculation (g)', min: 1, max: 100, step: 1, default: 20, unit: '' },
      { id: 'B', label: 'Constante monétaire (B)', min: 0, max: 500, step: 10, default: 100, unit: '' },
    ],
  },
  'zone-euro': {
    title: 'Zone Euro',
    badge: 'INTERNATIONAL',
    chartType: 'area', xLabel: 'Temps', yLabel: 'Stress index',
    inputs: [
      { id: 'spread', label: 'Spread', min: 0, max: 15, step: 0.25, default: 3, unit: '%' },
      { id: 'debt', label: 'Dette/PIB', min: 0, max: 200, step: 1, default: 90, unit: '%' },
      { id: 'growth', label: 'Croissance', min: -5, max: 10, step: 0.5, default: 1.5, unit: '%' },
    ],
  },
}

export default function SimulatorPage() {
  const { slug: rawSlug } = useParams()
  const slug = (rawSlug as string) as SimulatorSlug
  const [presentationMode, setPresentationMode] = useState(false)
  const config = (SIMULATOR_CONFIGS as Record<string, SimulatorPageConfig | undefined>)[slug]
  const compute = (simulators as Record<string, (inputs: any) => SimulatorOutput | undefined>)[slug]

  const initialValues = useMemo(() => {
    const initial: Record<string, number> = {}
    if (!config) return initial
    for (const c of config.inputs) initial[c.id] = c.default
    return initial
  }, [config])

  const [inputs, setInputs] = useState<Record<string, number>>(initialValues)

  const output: SimulatorOutput | undefined = useMemo(() => {
    if (!compute || !config) return undefined
    return compute(inputs)
  }, [compute, config, inputs])

  if (!config || !compute || !output) {
    return (
      <div className="pt-8">
        <div className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">Light Vector / Simulateurs</div>
        <h1 className="text-[28px] font-serif mb-2">Simulateur introuvable</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-6">Slug: {rawSlug}</p>
        <Link href="/simulateurs" className="text-[#1D9E75] hover:underline">Retour à la liste</Link>
      </div>
    )
  }

  const handleChange = (id: string, val: number) => setInputs(prev => ({ ...prev, [id]: val }))
  const metricEntries = Object.entries(output.metrics)

  return (
    <div className="flex flex-col gap-6 w-full pb-10 pt-2">
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-mono mb-2">
          <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Light Vector</Link>
          <span>/</span>
          <Link href="/simulateurs" className="hover:text-[var(--color-text-primary)] transition-colors">Simulateurs</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">{config.title}</span>
        </div>

        <div className={`border-[0.5px] rounded-[16px] p-6 shadow-sm mb-4 flex items-center justify-between transition-all duration-300 ${presentationMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-[var(--color-border-tertiary)]'}`}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-widest ${presentationMode ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' : 'bg-[#E1F5EE] text-[#065F46] border-[#065F46]/20'}`}>
                {config.badge}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${presentationMode ? 'text-gray-500' : 'text-[var(--color-text-tertiary)]'}`}>Module Thématique</span>
            </div>
            <h1 className={`text-[36px] font-serif leading-tight ${presentationMode ? 'text-white' : 'text-[#065F46]'}`}>
              {config.title}
            </h1>
          </div>
          <button 
            onClick={() => setPresentationMode(!presentationMode)}
            className={`px-4 py-2 rounded-full font-mono text-[10px] border transition-all ${presentationMode ? 'bg-white text-[#111827] border-white hover:bg-gray-100' : 'bg-[#111827] text-white border-[#111827] hover:opacity-90'}`}
          >
            {presentationMode ? 'QUITTER LE MODE PRÉSENTATION' : 'MODE PRÉSENTATION'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-2 items-start">
        {!presentationMode && (
          <div className="shrink-0 sticky top-4">
            <SliderPanel configs={config.inputs} values={inputs} onChange={handleChange} />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-5 min-w-0 transition-all duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metricEntries.slice(0, 4).map(([k, v]) => (
              <MetricCard key={k} label={k} value={v} colorStyle="neutral" />
            ))}
          </div>

          {slug === 'financement' ? (
            <FinancingVisualizer 
              besoin={inputs.besoin} 
              epargne={inputs.epargne} 
              credit={inputs.credit} 
              marche={inputs.marche} 
            />
          ) : (
            <ChartOutput data={output.chartData as any[]} chartType={config.chartType} xLabel={config.xLabel} yLabel={config.yLabel} />
          )}
          
          <InsightCard text={output.insight} />

          {/* Theoretical Context Section */}
          {slug === 'financement' && (
            <div className="mt-4 p-6 bg-emerald-50/50 rounded-[20px] border border-emerald-100">
              <h3 className="font-serif text-[20px] text-[#065F46] mb-4">Éclairage Théorique : Les 3 « D »</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[#065F46] text-[14px]">Désintermédiation</div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">Prééminence de la finance directe (marchés) sur la finance indirecte (banques) suite à la hausse des taux d'intérêt réels.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[#065F46] text-[14px]">Déréglementation</div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">Suppression du contrôle des changes et des obstacles à la libre circulation des capitaux mondiaux.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[#065F46] text-[14px]">Décloisonnement</div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">Abolition des frontières entre les différents métiers de la finance et les marchés nationaux.</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 flex flex-col gap-2">
                <div className="text-[12px] font-bold text-[#065F46]">Innovations et Risques (Crise de 2008)</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold text-[#065F46] text-[11px] block mb-1">Titrisation</span>
                    <span className="text-[11px] text-gray-600">Transformation de crédits risqués (ex: subprimes) en titres financiers négociables, ce qui a dilué le risque dans tout le système financier.</span>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-bold text-[#065F46] text-[11px] block mb-1">Risque Systémique</span>
                    <span className="text-[11px] text-gray-600">Risque pesant sur l'ensemble du système financier dû à la formation de bulles spéculatives, nécessitant souvent l'intervention de la Banque Centrale en prêteur en dernier ressort.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {slug === 'taux-de-change' && (
            <div className="mt-4 p-6 bg-cyan-50/50 rounded-[20px] border border-cyan-100">
              <h3 className="font-serif text-[20px] text-[#0E7490] mb-4">Éclairage Théorique : Gestion du Risque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[#0E7490] text-[14px]">Couverture au comptant/terme</div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">Techniques permettant de fixer dès aujourd'hui le cours d'une transaction future pour éviter l'incertitude.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[#0E7490] text-[14px]">Interventions des Banques Centrales</div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">En régime de change fixe, la BC intervient (achat/vente de devises) pour maintenir la parité ou les marges de fluctuation.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
