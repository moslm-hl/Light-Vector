export type CircuitFlowType = 'real' | 'monetary'

export interface CircuitAgent {
  id: string
  label: string
  x: number
  y: number
  color: string
}

export interface CircuitMarket {
  id: string
  label: string
  x: number
  y: number
}

export interface CircuitFlow {
  from: string
  to: string
  label: string
  type: CircuitFlowType
  animated?: boolean
}

export interface CircuitMode {
  agents: CircuitAgent[]
  markets: CircuitMarket[]
  flows: CircuitFlow[]
  equation: string
}

export const circuit2Agents: CircuitMode = {
  agents: [
    { id: 'menages', label: 'Ménages', x: 80, y: 220, color: '#1D9E75' },
    { id: 'entreprises', label: 'Entreprises', x: 520, y: 220, color: '#BA7517' },
  ],
  markets: [
    { id: 'biens', label: 'Marché des biens', x: 300, y: 100 },
    { id: 'facteurs', label: 'Marché des facteurs', x: 300, y: 340 },
  ],
  flows: [
    { from: 'menages', to: 'biens', label: 'Consommation C', type: 'monetary', animated: true },
    { from: 'biens', to: 'entreprises', label: 'Biens', type: 'real', animated: true },
    { from: 'entreprises', to: 'facteurs', label: 'Salaires W', type: 'monetary', animated: true },
    { from: 'facteurs', to: 'menages', label: 'Travail L', type: 'real', animated: true },
  ],
  equation: 'Y = C',
}

export const circuit3Agents: CircuitMode = {
  agents: [
    { id: 'menages', label: 'Ménages', x: 80, y: 260, color: '#1D9E75' },
    { id: 'etat', label: 'État', x: 300, y: 90, color: '#378ADD' },
    { id: 'entreprises', label: 'Entreprises', x: 520, y: 260, color: '#BA7517' },
  ],
  markets: [
    { id: 'marche', label: 'Marché', x: 300, y: 360 },
  ],
  flows: [
    { from: 'menages', to: 'etat', label: 'Impôts T', type: 'monetary', animated: true },
    { from: 'etat', to: 'entreprises', label: 'Dépenses G', type: 'monetary', animated: true },
    { from: 'entreprises', to: 'marche', label: 'Production Y', type: 'real', animated: true },
    { from: 'marche', to: 'menages', label: 'Consommation C', type: 'monetary', animated: true },
    { from: 'entreprises', to: 'menages', label: 'Revenus Y', type: 'monetary', animated: true },
  ],
  equation: 'Y = C + I + G',
}

export const circuit4Agents: CircuitMode = {
  agents: [
    { id: 'menages', label: 'Ménages', x: 80, y: 270, color: '#1D9E75' },
    { id: 'etat', label: 'État', x: 300, y: 90, color: '#378ADD' },
    { id: 'entreprises', label: 'Entreprises', x: 520, y: 270, color: '#BA7517' },
    { id: 'rdm', label: 'Reste du Monde', x: 520, y: 90, color: '#6b7280' },
  ],
  markets: [
    { id: 'marche', label: 'Marché', x: 300, y: 370 },
    { id: 'changes', label: 'Changes', x: 300, y: 210 },
  ],
  flows: [
    { from: 'menages', to: 'etat', label: 'Impôts T', type: 'monetary', animated: true },
    { from: 'etat', to: 'entreprises', label: 'Dépenses G', type: 'monetary', animated: true },
    { from: 'entreprises', to: 'marche', label: 'Production Y', type: 'real', animated: true },
    { from: 'marche', to: 'menages', label: 'Consommation C', type: 'monetary', animated: true },
    { from: 'entreprises', to: 'rdm', label: 'Exportations X', type: 'real', animated: true },
    { from: 'rdm', to: 'entreprises', label: 'Importations M', type: 'real', animated: true },
    { from: 'rdm', to: 'changes', label: 'Devises', type: 'monetary', animated: true },
    { from: 'changes', to: 'etat', label: 'Taux de change', type: 'monetary', animated: true },
  ],
  equation: 'Y = C + I + G + (X − M)',
}

export function getCircuitMode(mode: 2 | 3 | 4): CircuitMode {
  if (mode === 2) return circuit2Agents
  if (mode === 3) return circuit3Agents
  return circuit4Agents
}
