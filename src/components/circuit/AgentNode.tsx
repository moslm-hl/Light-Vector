interface AgentNodeProps {
  x: number
  y: number
  label: string
  color: string
  subtitle?: string
  onClick?: () => void
}

export default function AgentNode({ x, y, label, color, subtitle, onClick }: AgentNodeProps) {
  const fill = `${color}1A`

  return (
    <g transform={`translate(${x}, ${y})`} onClick={onClick} className="cursor-pointer hover:opacity-80 transition-opacity">
      <rect
        x={-70}
        y={-24}
        width={140}
        height={48}
        rx={8}
        fill={fill}
        stroke={color}
        strokeWidth={1}
      />
      <text
        x={0}
        y={-4}
        textAnchor="middle"
        fontFamily="var(--font-dm-mono)"
        fontSize={10}
        fill={color}
      >
        {label.toUpperCase()}
      </text>
      {subtitle ? (
        <text
          x={0}
          y={12}
          textAnchor="middle"
          fontFamily="var(--font-outfit)"
          fontSize={9}
          fill="var(--color-text-secondary)"
        >
          {subtitle}
        </text>
      ) : null}
    </g>
  )
}
