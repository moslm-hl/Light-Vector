import type { CircuitFlowType } from '@/lib/circuitModel'

interface Point {
  x: number
  y: number
}

interface FlowArrowProps {
  from: Point
  to: Point
  label: string
  type: CircuitFlowType
  animated?: boolean
}

function mid(a: number, b: number) {
  return (a + b) / 2
}

export default function FlowArrow({ from, to, label, type, animated }: FlowArrowProps) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const curvature = 0.18
  const cx = mid(from.x, to.x) - dy * curvature
  const cy = mid(from.y, to.y) + dx * curvature

  const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`

  const stroke = type === 'real' ? '#378ADD' : '#BA7517'
  const dash = type === 'real' ? '5 4' : undefined

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={dash}
        markerEnd="url(#arrowhead)"
        style={
          animated
            ? {
                strokeDashoffset: 0,
                animation: type === 'real' ? 'flowdash 2.4s linear infinite' : 'flowmove 2.4s linear infinite',
              }
            : undefined
        }
      />

      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontFamily="var(--font-dm-mono)"
        fontSize={9}
        fill="var(--color-text-tertiary)"
      >
        {label}
      </text>
    </g>
  )
}
