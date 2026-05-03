export interface SliderConfig {
  id: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit: string            // '%', 'Md DT', 'unités', etc.
}

export interface SimulatorOutput {
  metrics: Record<string, number>    // named computed values
  chartData: ChartPoint[]            // array for Recharts
  insight: string                    // auto-generated interpretation text
}

export interface ChartPoint {
  x: number
  y: number
  label?: string
}

export interface ThemeContent {
  id: string
  slug: string
  title: string
  category: 'macro' | 'monnaie' | 'international' | 'developpement' | 'finance'
  definition: string
  keyConcepts: Concept[]
  formulas: Formula[]
  examples: Example[]
}

export interface Concept {
  term: string
  definition: string
}

export interface Example {
  title: string
  description: string
}

export interface Formula {
  expression: string      // e.g. "Y = C + I + G + (X - M)"
  description: string
  variables: Record<string, string>   // variable name → description
}
