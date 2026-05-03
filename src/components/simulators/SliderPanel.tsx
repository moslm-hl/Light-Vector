import { SliderConfig } from '@/lib/types'

interface SliderPanelProps {
  configs: SliderConfig[]
  values: Record<string, number>
  onChange: (id: string, val: number) => void
}

export default function SliderPanel({ configs, values, onChange }: SliderPanelProps) {
  return (
    <div className="flex flex-col gap-5 w-[260px] bg-white p-5 rounded-[12px] border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
      <div className="font-mono text-[12px] uppercase text-[var(--color-text-tertiary)] tracking-wider font-medium mb-1">
        Paramètres du Modèle
      </div>
      {configs.map(conf => (
        <div key={conf.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-[var(--color-text-secondary)] font-medium">
              {conf.label}
            </label>
            <span className="font-mono text-[11px] text-[#1D9E75] bg-[#E1F5EE] px-1.5 py-0.5 rounded">
              {values[conf.id]} {conf.unit}
            </span>
          </div>
          <input 
            type="range" 
            min={conf.min} 
            max={conf.max} 
            step={conf.step} 
            value={values[conf.id]} 
            onChange={(e) => onChange(conf.id, parseFloat(e.target.value))}
            className="w-full accent-[#1D9E75]"
          />
        </div>
      ))}
    </div>
  )
}
