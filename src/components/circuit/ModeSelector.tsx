"use client"

interface ModeSelectorProps {
  mode: 2 | 3 | 4
  onChange: (mode: 2 | 3 | 4) => void
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex bg-[var(--color-background-secondary)] p-1 rounded-lg border border-[var(--color-border-tertiary)] w-fit mx-auto mb-6 shadow-sm">
      <button 
        onClick={() => onChange(2)}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 2 ? 'bg-white shadow-sm text-teal-700 border border-teal-100' : 'text-gray-500 hover:text-gray-800'}`}
      >
        2 Agents
      </button>
      <button 
        onClick={() => onChange(3)}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 3 ? 'bg-white shadow-sm text-teal-700 border border-teal-100' : 'text-gray-500 hover:text-gray-800'}`}
      >
        3 Agents
      </button>
      <button 
        onClick={() => onChange(4)}
        className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 4 ? 'bg-white shadow-sm text-teal-700 border border-teal-100' : 'text-gray-500 hover:text-gray-800'}`}
      >
        4 Agents
      </button>
    </div>
  )
}
