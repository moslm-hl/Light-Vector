"use client"

import AgentNode from './AgentNode'
import MarketNode from './MarketNode'
import FlowArrow from './FlowArrow'
import type { CircuitMode } from '@/lib/circuitModel'

interface CircuitCanvasProps {
  mode: CircuitMode
  onSelect: (id: string) => void
}

export default function CircuitCanvas({ mode, onSelect }: CircuitCanvasProps) {
  const nodes = new Map<string, { x: number; y: number }>()
  for (const a of mode.agents) nodes.set(a.id, { x: a.x, y: a.y })
  for (const m of mode.markets) nodes.set(m.id, { x: m.x, y: m.y })

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-4">
        <div className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-widest">
          Équation: {mode.equation}
        </div>
      </div>

      <svg viewBox="0 0 600 420" className="w-full h-[420px]">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <path d="M 0 0 L 10 4 L 0 8 z" fill="rgba(17, 24, 39, 0.55)" />
          </marker>
        </defs>

        {mode.flows.map((f, idx) => {
          const from = nodes.get(f.from)
          const to = nodes.get(f.to)
          if (!from || !to) return null
          return (
            <FlowArrow
              key={`${f.from}-${f.to}-${idx}`}
              from={from}
              to={to}
              label={f.label}
              type={f.type}
              animated={f.animated}
            />
          )
        })}

        {mode.markets.map(m => (
          <MarketNode key={m.id} x={m.x} y={m.y} label={m.label} onClick={() => onSelect(m.id)} />
        ))}

        {mode.agents.map(a => (
          <AgentNode key={a.id} x={a.x} y={a.y} label={a.label} color={a.color} onClick={() => onSelect(a.id)} />
        ))}

        <style>{`
          @keyframes flowdash {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -18; }
          }
          @keyframes flowmove {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -18; }
          }
        `}</style>
      </svg>
    </div>
  )
}
