"use client"

import { useState } from 'react'
import ModeSelector from '@/components/circuit/ModeSelector'
import CircuitCanvas from '@/components/circuit/CircuitCanvas'
import { getCircuitMode } from '@/lib/circuitModel'

export default function CircuitPage() {
  const [mode, setMode] = useState<2 | 3 | 4>(3)
  const [selectedInfo, setSelectedInfo] = useState<{ title: string; desc: string } | null>(null)
  
  const circuitMode = getCircuitMode(mode)

  const handleSelect = (id: string) => {
    const agent = circuitMode.agents.find(a => a.id === id)
    const market = circuitMode.markets.find(m => m.id === id)
    
    if (agent) {
      setSelectedInfo({ title: agent.label, desc: getAgentDescription(id) })
    } else if (market) {
      setSelectedInfo({ title: market.label, desc: getMarketDescription(id) })
    }
  }

  return (
    <div className="w-full flex flex-col pt-4">
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-serif mb-2">Circuit Économique Animé</h1>
        <p className="text-[14px] text-[var(--color-text-secondary)]">
          Cliquez sur un agent ou un marché pour explorer son rôle dans le circuit.
        </p>
      </div>

      <ModeSelector mode={mode} onChange={(m) => { setMode(m); setSelectedInfo(null); }} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 mt-4">
        <div className="bg-white rounded-[12px] p-6 border-[0.5px] border-[var(--color-border-tertiary)] min-h-[500px] shadow-sm flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>

          <div className="relative z-10 w-full max-w-[760px]">
            <CircuitCanvas mode={circuitMode} onSelect={handleSelect} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white p-5 rounded-[12px] border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm min-h-[200px]">
            {selectedInfo ? (
              <>
                <h3 className="font-serif text-[18px] text-[#1D9E75] mb-2">{selectedInfo.title}</h3>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedInfo.desc}
                </p>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <span className="text-[24px] mb-2">💡</span>
                <p className="text-[12px] font-mono uppercase tracking-tighter">Cliquez pour explorer</p>
              </div>
            )}
          </div>
          
          <div className="bg-[#111827] p-5 rounded-[12px] text-white">
            <h4 className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-3">Identité du circuit</h4>
            <div className="text-[14px] font-mono text-[#5DCAA5]">
              {circuitMode.equation}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getAgentDescription(id: string): string {
  const descs: Record<string, string> = {
    menages: "Consomment les biens et services, fournissent le travail et l'épargne. Perçoivent des revenus (salaires, dividendes).",
    entreprises: "Produisent des biens et services marchands. Investissent et versent des revenus aux autres agents.",
    etat: "Produit des services non marchands et redistribue les revenus via les impôts et prestations sociales.",
    exterieur: "Représente les échanges avec le reste du monde (Exportations et Importations).",
    banques: "Institutions financières qui collectent l'épargne et accordent des crédits à l'économie."
  }
  return descs[id] || "Agent économique clé."
}

function getMarketDescription(id: string): string {
  const descs: Record<string, string> = {
    marche_biens: "Lieu de rencontre entre l'offre (entreprises) et la demande (ménages, État) de produits.",
    marche_facteurs: "Marché où les ménages offrent leur travail en échange de salaires versés par les entreprises.",
    marche_financier: "Permet le financement de l'économie en reliant l'épargne et les besoins d'investissement.",
    marche_changes: "Lieu d'échange de la monnaie nationale contre des devises étrangères."
  }
  return descs[id] || "Espace de transaction économique."
}
