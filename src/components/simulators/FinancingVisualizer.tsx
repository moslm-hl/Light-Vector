"use client"

import { motion } from 'framer-motion'

interface FinancingVisualizerProps {
  epargne: number
  credit: number
  marche: number
  besoin: number
}

export default function FinancingVisualizer({ epargne, credit, marche, besoin }: FinancingVisualizerProps) {
  const total = epargne + credit + marche
  const pEpargne = (epargne / total) * 100 || 0
  const pCredit = (credit / total) * 100 || 0
  const pMarche = (marche / total) * 100 || 0

  return (
    <div className="w-full min-h-[540px] bg-white rounded-[24px] p-8 pb-12 flex flex-col relative text-[#111827] border-[1px] border-[#E5E7EB] shadow-sm">
      <div className="mb-10">
        <h3 className="font-serif text-[26px] text-[#1D9E75] mb-1">Pipeline de Financement</h3>
        <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Répartition des ressources de l'économie</p>
      </div>

      <div className="flex flex-1 gap-10 items-stretch">
        {/* Left: Savers */}
        <div className="w-48 flex flex-col justify-center">
          <div className="h-[160px] p-6 bg-emerald-50 rounded-[20px] border border-emerald-100 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="text-[10px] font-mono text-emerald-600 uppercase font-bold mb-3 tracking-wider">Épargnants</div>
            <div className="text-[26px] font-bold text-[#1D9E75] tabular-nums mb-1">{total.toFixed(0)} Md</div>
            <div className="text-[9px] text-emerald-400 font-mono uppercase leading-tight">Capacité de Financement</div>
          </div>
        </div>

        {/* Middle: Pipes */}
        <div className="flex-1 flex flex-col justify-around py-4">
          {/* Internal */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-emerald-600 uppercase font-mono tracking-tight">1. Autofinancement</span>
              <span className="text-[12px] font-bold tabular-nums text-emerald-600">{pEpargne.toFixed(1)}%</span>
            </div>
            <div className="h-10 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${pEpargne}%` }}
                className="h-full bg-emerald-500 relative z-10"
              />
              {pEpargne > 5 && <FlowParticles color="#10b981" count={Math.ceil(pEpargne / 8)} duration={2.5} />}
            </div>
          </div>

          {/* Banks */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-blue-600 uppercase font-mono tracking-tight">2. Intermédiation Bancaire</span>
              <span className="text-[12px] font-bold tabular-nums text-blue-600">{pCredit.toFixed(1)}%</span>
            </div>
            <div className="h-14 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative flex items-center justify-center">
              <div className="z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-blue-100 text-[11px] font-bold text-blue-700 shadow-sm uppercase tracking-tighter">Banques (Crédit)</div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${pCredit}%` }}
                className="absolute left-0 h-full bg-blue-500/20 relative z-10"
              />
              {pCredit > 5 && <FlowParticles color="#3b82f6" count={Math.ceil(pCredit / 6)} duration={1.8} />}
            </div>
          </div>

          {/* Markets */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-purple-600 uppercase font-mono tracking-tight">3. Marchés Financiers</span>
              <span className="text-[12px] font-bold tabular-nums text-purple-600">{pMarche.toFixed(1)}%</span>
            </div>
            <div className="h-14 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative flex items-center justify-center">
              <div className="z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-purple-100 text-[11px] font-bold text-purple-700 shadow-sm uppercase tracking-tighter">Bourse (Direct)</div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${pMarche}%` }}
                className="absolute left-0 h-full bg-purple-500/20 relative z-10"
              />
              {pMarche > 5 && <FlowParticles color="#a855f7" count={Math.ceil(pMarche / 6)} duration={2.2} />}
            </div>
          </div>
        </div>

        {/* Right: Investors */}
        <div className="w-48 flex flex-col justify-center">
          <div className="h-[160px] p-6 bg-amber-50 rounded-[20px] border border-amber-100 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="text-[10px] font-mono text-amber-600 uppercase font-bold mb-3 tracking-wider">Investisseurs</div>
            <div className="text-[26px] font-bold text-[#D97706] tabular-nums mb-1">{besoin.toFixed(0)} Md</div>
            <div className="text-[9px] text-amber-400 font-mono uppercase leading-tight">Besoins de Financement</div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 grid grid-cols-3 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="text-center">
          <div className="text-[9px] text-gray-400 uppercase font-mono mb-1">Taux d'Intermédiation</div>
          <div className="text-[18px] font-bold text-[#111827]">{((credit / (credit + marche)) * 100 || 0).toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-[9px] text-gray-400 uppercase font-mono mb-1">Indépendance (Auto)</div>
          <div className="text-[18px] font-bold text-[#1D9E75]">{((epargne / besoin) * 100 || 0).toFixed(1)}%</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-[10px] font-bold font-mono text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 text-center w-full">
            {pCredit > pMarche ? 'ÉCONOMIE D\'ENDETTEMENT' : 'ÉCONOMIE DE MARCHÉ'}
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowParticles({ color, count, duration }: { color: string; count: number; duration: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: '110%', opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration, 
            repeat: Infinity, 
            delay: i * (duration / count),
            ease: "linear"
          }}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[2px]"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
