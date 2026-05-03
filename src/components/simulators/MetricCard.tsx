interface MetricCardProps {
  label: string
  value: number | string
  format?: 'number' | 'currency' | 'percent' | 'none'
  colorStyle?: 'pink' | 'coral' | 'neutral'
}

export default function MetricCard({ label, value, format = 'number', colorStyle = 'neutral' }: MetricCardProps) {
  
  const formattedValue = typeof value === 'number' 
    ? (format === 'percent' ? `${value.toFixed(2)}%` : value.toFixed(1))
    : value

  let colorClass = 'text-[var(--color-text-primary)]'
  if (colorStyle === 'pink') colorClass = 'text-[#1D9E75]'
  if (colorStyle === 'coral') colorClass = 'text-[#D85A30]'

  return (
    <div className="bg-[var(--color-background-secondary)] rounded-[8px] p-4 border-[0.5px] border-[var(--color-border-tertiary)] flex flex-col items-start justify-center">
      <div className="text-[11px] uppercase text-[var(--color-text-secondary)] tracking-wide mb-1 font-medium">{label}</div>
      <div className={`font-mono text-[20px] font-medium ${colorClass}`}>
        {formattedValue}
      </div>
    </div>
  )
}
