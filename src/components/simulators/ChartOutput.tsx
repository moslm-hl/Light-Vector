"use client"

import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell,
  ComposedChart, ReferenceDot, ReferenceArea
} from 'recharts'

export type ChartType = 'line' | 'bar' | 'area' | 'is-lm' | 'phillips'

interface ChartOutputProps {
  data: any[]
  chartType?: ChartType
  xLabel?: string
  yLabel?: string
  xKey?: string
  colors?: string[]
}

const COLORS = ['#1D9E75', '#378ADD', '#BA7517', '#D85A30', '#639922', '#7C3AED']

export default function ChartOutput({
  data,
  chartType = 'line',
  xLabel = '',
  yLabel = '',
  xKey,
  colors = COLORS,
}: ChartOutputProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[340px] bg-white p-4 rounded-[12px] border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm flex items-center justify-center">
        <div className="text-[13px] text-[var(--color-text-tertiary)] font-mono">Aucune donnée graphique</div>
      </div>
    )
  }

  const first = data[0]
  const isISLM = !!first && 'Y' in first && ('IS' in first || 'LM' in first)
  const isPhillips = !!first && 'u' in first && 'pi' in first
  const resolvedType = isISLM ? 'is-lm' : (isPhillips ? 'phillips' : chartType)

  const tickStyle = { fontFamily: 'var(--font-dm-mono)', fontSize: 10, fill: 'var(--color-text-tertiary)' }
  const tooltipStyle = {
    contentStyle: { borderRadius: '8px', border: '0.5px solid var(--color-border-tertiary)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontSize: '12px', fontFamily: 'var(--font-dm-mono)' },
    labelStyle: { fontFamily: 'var(--font-dm-mono)', color: 'var(--color-text-secondary)', marginBottom: '4px' },
  }

  const renderPhillips = () => (
    <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
      <XAxis dataKey="u" type="number" tick={tickStyle} domain={['auto', 'auto']} reversed
        label={{ value: 'u (Chômage %)', position: 'insideBottomRight', offset: -10, fontSize: 11, fill: 'var(--color-text-secondary)' }} />
      <YAxis tick={tickStyle} axisLine={{ stroke: '#111827', strokeWidth: 1.5 }} tickLine={false}
        label={{ value: 'π (Inflation %)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: 'var(--color-text-secondary)' }} />
      <Tooltip {...tooltipStyle} />
      <Line type="linear" dataKey="pi" stroke="#D85A30" strokeWidth={2.5} dot={false} name="Courbe de Phillips" animationDuration={800} />
    </LineChart>
  )

  const renderISLM = () => {
    // Attempt to find intersection (equilibrium)
    let yStar = 0, rStar = 0
    if (data.length > 2) {
      // Find where IS and LM are closest
      let minDiff = Infinity
      data.forEach(d => {
        const diff = Math.abs(d.IS - d.LM)
        if (diff < minDiff) {
          minDiff = diff
          yStar = d.Y
          rStar = (d.IS + d.LM) / 2
        }
      })
    }

    // IS Intercepts from PDF: r = A0/b when Y=0, Y = A0/h when r=0
    let rIntercept = 0, yIntercept = 0
    if (data.length > 0) {
      rIntercept = data[0].IS
      // Find where IS crosses zero (approx)
      const zeroIS = data.find(d => d.IS <= 0)
      yIntercept = zeroIS ? zeroIS.Y : data[data.length-1].Y
    }

    return (
      <div className="relative w-full h-full">
        {/* Custom Axis Arrows */}
        <div className="absolute top-0 left-[20px] w-[1.5px] h-[10px] bg-[#111827] before:content-[''] before:absolute before:top-[-4px] before:left-[-3px] before:border-l-[4px] before:border-l-transparent before:border-r-[4px] before:border-r-transparent before:border-b-[6px] before:border-b-[#111827]" />
        <div className="absolute bottom-[20px] right-0 w-[10px] h-[1.5px] bg-[#111827] after:content-[''] after:absolute after:right-[-4px] after:top-[-3px] after:border-t-[4px] after:border-t-transparent after:border-b-[4px] after:border-b-transparent after:border-l-[6px] after:border-l-[#111827]" />
        
        <ComposedChart data={data} margin={{ top: 30, right: 60, left: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
          
          {/* Background Zones matching PDF cases */}
          <ReferenceArea x1={0} x2={200} fill="#f3f4f6" fillOpacity={0.5} label={{ value: 'Trappe', position: 'insideTopLeft', fontSize: 10, fill: '#9ca3af' }} />
          <ReferenceArea x1={800} x2={1000} fill="#f3f4f6" fillOpacity={0.5} label={{ value: 'Zone Classique', position: 'insideTopRight', fontSize: 10, fill: '#9ca3af' }} />

          <XAxis dataKey="Y" type="number" tick={tickStyle} axisLine={{ stroke: '#111827', strokeWidth: 1.5 }} tickLine={false} domain={[0, 1000]}
            label={{ value: 'Y', position: 'insideBottomRight', offset: -10, fontSize: 13, fill: '#111827', fontWeight: 700, fontFamily: 'var(--font-dm-serif)' }} />
          <YAxis tick={tickStyle} axisLine={{ stroke: '#111827', strokeWidth: 1.5 }} tickLine={false} domain={[0, 25]}
            label={{ value: 'r', angle: 0, position: 'insideTopLeft', offset: -20, fontSize: 13, fill: '#111827', fontWeight: 700, fontFamily: 'var(--font-dm-serif)' }} />
          <Tooltip {...tooltipStyle} cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '5 5' }} />
          
          {/* IS Intercepts Labels matching PDF exactly */}
          {rIntercept > 0 && rIntercept < 25 && (
            <ReferenceLine y={rIntercept} stroke="transparent" label={{ value: 'A₀/b', position: 'left', fill: '#111827', fontSize: 11, fontWeight: 600 }} />
          )}
          {yIntercept > 0 && yIntercept <= 1000 && (
            <ReferenceLine x={yIntercept} stroke="transparent" label={{ value: 'A₀/h', position: 'bottom', fill: '#111827', fontSize: 11, fontWeight: 600 }} />
          )}

          {/* Equilibrium Reference Lines */}
          {yStar > 0 && (
            <>
              <ReferenceLine x={yStar} stroke="#111827" strokeDasharray="3 3" strokeWidth={1} />
              <ReferenceLine y={rStar} stroke="#111827" strokeDasharray="3 3" strokeWidth={1} />
              <ReferenceDot x={yStar} y={rStar} r={4} fill="#111827" stroke="white" strokeWidth={1} />
              
              <ReferenceLine x={yStar} stroke="transparent" label={{ value: 'Y*', position: 'bottom', fill: '#111827', fontSize: 12, fontWeight: 600, offset: 10 }} />
              <ReferenceLine y={rStar} stroke="transparent" label={{ value: 'r*', position: 'left', fill: '#111827', fontSize: 12, fontWeight: 600, offset: 10 }} />
            </>
          )}

          <Line type="linear" dataKey="IS" stroke="#1D9E75" strokeWidth={2.5} dot={false} name="IS" animationDuration={800} isAnimationActive={false} />
          <Line type="linear" dataKey="LM" stroke="#378ADD" strokeWidth={2.5} dot={false} name="LM" animationDuration={800} isAnimationActive={false} />
        </ComposedChart>
      </div>
    )
  }

  const renderBar = () => {
    const keys = Object.keys(first).filter(k => k !== 'name' && k !== 'label' && k !== 'x')
    const dataKey = keys[0] || 'y'
    const hasLabel = 'label' in first || 'name' in first
    const nameKey = 'name' in first ? 'name' : 'label'

    return (
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
        <XAxis dataKey={hasLabel ? nameKey : (xKey || 'x')} tick={tickStyle} axisLine={false} tickLine={false}
          label={xLabel ? { value: xLabel, position: 'insideBottomRight', offset: -5, fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false}
          label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
        <Tooltip {...tooltipStyle} />
        <ReferenceLine y={0} stroke="rgba(0,0,0,0.2)" strokeDasharray="3 3" />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} name={dataKey}>
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry[dataKey] < 0 ? '#D85A30' : colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    )
  }

  const renderArea = () => (
    <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
      <XAxis dataKey={xKey || 'x'} tick={tickStyle} axisLine={false} tickLine={false}
        label={xLabel ? { value: xLabel, position: 'insideBottomRight', offset: -5, fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
      <YAxis tick={tickStyle} axisLine={false} tickLine={false}
        label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
      <Tooltip {...tooltipStyle} />
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="y" stroke="#1D9E75" strokeWidth={2} fill="url(#areaGrad)" dot={false} name="Intensité" />
    </AreaChart>
  )

  const renderLine = () => (
    <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
      <XAxis dataKey={xKey || 'x'} type="number" tick={tickStyle} axisLine={false} tickLine={false}
        label={xLabel ? { value: xLabel, position: 'insideBottomRight', offset: -5, fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
      <YAxis tick={tickStyle} axisLine={false} tickLine={false}
        label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--color-text-tertiary)' } : undefined} />
      <Tooltip {...tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" iconSize={6} />
      <Line type="monotone" dataKey="y" stroke="#1D9E75" strokeWidth={2} dot={false} name={yLabel || 'Valeur'} />
    </LineChart>
  )

  return (
    <div className="w-full h-[340px] bg-white p-4 rounded-[12px] border-[0.5px] border-[var(--color-border-tertiary)] shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        {(() => {
          switch (resolvedType) {
            case 'line': return renderLine()
            case 'bar': return renderBar()
            case 'area': return renderArea()
            case 'is-lm': return renderISLM()
            case 'phillips': return renderPhillips()
            default: return renderLine()
          }
        })()}
      </ResponsiveContainer>
    </div>
  )
}
