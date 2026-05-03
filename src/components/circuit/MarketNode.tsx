interface MarketNodeProps {
  x: number
  y: number
  label: string
  onClick?: () => void
}

export default function MarketNode({ x, y, label, onClick }: MarketNodeProps) {
  return (
    <g transform={`translate(${x}, ${y})`} onClick={onClick} className="cursor-pointer hover:opacity-80 transition-opacity">
      <circle r={28} fill="#F1EFE8" stroke="#B4B2A9" strokeWidth={1} />
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fontFamily="var(--font-dm-mono)"
        fontSize={9}
        fill="var(--color-text-secondary)"
      >
        {label}
      </text>
    </g>
  )
}
