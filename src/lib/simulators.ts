import { SimulatorOutput } from './types'

export function computeChomage(inputs: { un: number, alpha: number, pi: number, pie: number }): SimulatorOutput {
  return computeUnemployment(inputs)
}

export function computeInflation(inputs: { M: number, V: number, Y: number }): SimulatorOutput {
  const { M, V, Y } = inputs
  const P = (M * V) / Y
  const chartData = Array.from({ length: 21 }, (_, i) => {
    const m = M * (0.5 + i * 0.05)
    return {
      x: m,
      y: (m * V) / Y,
    }
  })
  let insight = "Équilibre. P augmente avec M."
  if (P > 10) insight = "Forte inflation: la masse monétaire est trop importante par rapport au PIB."
  return { metrics: { 'P': P }, chartData: chartData as any, insight }
}

export function computeUnemployment(inputs: { un: number, alpha: number, pi: number, pie: number }): SimulatorOutput {
  const { un, alpha, pi, pie } = inputs
  const uStar = un - alpha * (pi - pie)
  
  // Phillips Curve data: pi on y-axis, u on x-axis
  const chartData = Array.from({ length: 21 }, (_, i) => {
    const inflation = i // 0% to 20%
    const unemployment = un - alpha * (inflation - pie)
    return {
      u: Math.round(unemployment * 10) / 10,
      pi: inflation,
    }
  })
  
  let insight = "Courbe de Phillips à court terme."
  if (pi > pie) insight = "L'inflation inattendue réduit le chômage à court terme."
  return { metrics: { 'u (%)': uStar }, chartData: chartData as any, insight }
}

export function computeDette(inputs: { debt: number, g: number, r: number, primary: number }): SimulatorOutput {
  const { debt, g, r, primary } = inputs
  const deltaRatio = (r - g) * debt - primary
  const nextDebt = debt + deltaRatio
  const chartData = Array.from({ length: 21 }, (_, i) => {
    const t = i
    const d = debt + (deltaRatio * i) / 20
    return { x: t, y: d }
  })
  let insight = "Dynamique de la dette."
  if (r > g) insight = "Si r > g, la dette tend à augmenter sans solde primaire suffisant."
  return { metrics: { 'Dette/PIB (%)': nextDebt, 'Δ(Dette/PIB)': deltaRatio }, chartData: chartData as any, insight }
}

export function computeDeficit(inputs: { G: number, T: number }): SimulatorOutput {
  const { G, T } = inputs
  const deficit = G - T
  const chartData = [
    { name: 'Dépenses (G)', y: G },
    { name: 'Recettes (T)', y: T },
    { name: 'Solde (G−T)', y: deficit },
  ]
  let insight = "Solde budgétaire."
  if (deficit > 0) insight = "Déficit: dépenses supérieures aux recettes."
  else if (deficit < 0) insight = "Excédent: recettes supérieures aux dépenses."
  return { metrics: { 'G − T': deficit }, chartData: chartData as any, insight }
}

export function computeFinanceIslamique(inputs: { murabaha: number, mudaraba: number, musharaka: number }): SimulatorOutput {
  const { murabaha, mudaraba, musharaka } = inputs
  const total = murabaha + mudaraba + musharaka
  const chartData = [
    { name: 'Mourabaha', y: murabaha },
    { name: 'Moudaraba', y: mudaraba },
    { name: 'Moucharaka', y: musharaka },
  ]
  let insight = "Comparaison simplifiée des instruments."
  if (mudaraba + musharaka > murabaha) insight = "Orientation plus participative (partage profits/pertes)."
  return { metrics: { 'Total (score)': total }, chartData: chartData as any, insight }
}

export function computeCrise2007(inputs: { shock: number, leverage: number }): SimulatorOutput {
  const { shock, leverage } = inputs
  const peak = shock * leverage
  const chartData = Array.from({ length: 21 }, (_, i) => {
    const t = i
    const phase = t / 20
    const y = peak * Math.exp(-3 * phase) * (1 + 0.2 * Math.sin(phase * Math.PI * 6))
    return { x: t, y }
  })
  let insight = "Propagation stylisée d'un choc financier."
  if (leverage > 8) insight = "Levier élevé: amplification et instabilité accrues."
  return { metrics: { 'Intensité max': peak }, chartData: chartData as any, insight }
}

export function computeEchanges(inputs: { X: number, M: number, R: number, TR: number, KA: number, FA: number }): SimulatorOutput {
  return computeBOP(inputs)
}

export function computeTauxDeChange(inputs: { Z: number, P: number, PStar: number }): SimulatorOutput {
  const { Z, P, PStar } = inputs
  const Zr = Z * (PStar / P)
  const chartData = Array.from({ length: 21 }, (_, i) => {
    const z = Z * (0.8 + i * 0.02)
    return { x: z, y: z * (PStar / P) }
  })
  let insight = "Taux de change réel (compétitivité-prix)."
  if (Zr > Z) insight = "Dépréciation réelle: produits domestiques relativement moins chers."
  return { metrics: { 'Zr': Zr }, chartData: chartData as any, insight }
}

export function computeDeficitCommercial(inputs: { X: number, M: number }): SimulatorOutput {
  const { X, M } = inputs
  const solde = X - M
  const chartData = [
    { name: 'Export (X)', y: X },
    { name: 'Import (M)', y: M },
    { name: 'Solde (X−M)', y: solde },
  ]
  let insight = "Solde commercial."
  if (solde < 0) insight = "Déficit commercial: M > X."
  return { metrics: { 'X − M': solde }, chartData: chartData as any, insight }
}

export function computeCroissance(inputs: { gdp0: number, gdp1: number }): SimulatorOutput {
  const { gdp0, gdp1 } = inputs
  const growth = gdp0 === 0 ? 0 : ((gdp1 - gdp0) / gdp0) * 100
  const chartData = [
    { name: 'PIB (t-1)', y: gdp0 },
    { name: 'PIB (t)', y: gdp1 },
  ]
  let insight = "Croissance du PIB."
  if (growth < 0) insight = "Récession: PIB en baisse."
  return { metrics: { 'Croissance (%)': growth }, chartData: chartData as any, insight }
}

export function computeInformel(inputs: { totalPIB: number, informalShare: number }): SimulatorOutput {
  const { totalPIB, informalShare } = inputs
  const informal = (informalShare / 100) * totalPIB
  const formal = totalPIB - informal
  const chartData = [
    { name: 'Formel', y: formal },
    { name: 'Informel', y: informal },
  ]
  let insight = "Estimation stylisée du secteur informel."
  if (informalShare > 40) insight = "Part informelle élevée: base fiscale et productivité peuvent être affectées."
  return { metrics: { 'Informel (valeur)': informal, 'Informel (%)': informalShare }, chartData: chartData as any, insight }
}

export function computeFinancement(inputs: { besoin: number, epargne: number, credit: number, marche: number }): SimulatorOutput {
  const { besoin, epargne, credit, marche } = inputs
  
  const totalOffre = epargne + credit + marche
  const tauxAutofinancement = (epargne / besoin) * 100
  const tauxIntermediation = (credit / (credit + marche)) * 100
  
  const chartData = [
    { name: 'Autofinancement', y: epargne },
    { name: 'Crédit Bancaire', y: credit },
    { name: 'Marché Financier', y: marche },
  ]
  
  let insight = "Structure du financement de l'économie."
  if (tauxAutofinancement > 70) insight = "L'économie repose fortement sur l'autofinancement (capacité de financement élevée)."
  if (tauxIntermediation > 60) insight = "L'économie est de type 'économie d'endettement' (prédominance du crédit bancaire)."
  else insight = "L'économie est de type 'économie de marchés financiers'."

  return { 
    metrics: { 
      'Taux Autofinanc. (%)': tauxAutofinancement, 
      'Taux Interméd. (%)': tauxIntermediation,
      'Offre Totale': totalOffre 
    }, 
    chartData: chartData as any, 
    insight 
  }
}

export function computeZoneEuro(inputs: { spread: number, debt: number, growth: number }): SimulatorOutput {
  const { spread, debt, growth } = inputs
  const stress = spread * 0.6 + debt * 0.3 - growth * 0.1
  const chartData = Array.from({ length: 21 }, (_, i) => ({ x: i, y: stress * (0.7 + i * 0.03) }))
  let insight = "Tension souveraine (stylisée)."
  if (spread > 4) insight = "Spread élevé: perception de risque souverain accrue."
  return { metrics: { 'Stress index': stress }, chartData: chartData as any, insight }
}

export function computePIB(inputs: { C: number, I: number, G: number, X: number, M: number }): SimulatorOutput {
  const { C, I, G, X, M } = inputs
  const Y = C + I + G + X - M
  const NX = X - M
  const chartData = [{ name: 'C', value: C }, { name: 'I', value: I }, { name: 'G', value: G }, { name: 'NX', value: NX }]
  let insight = "Le PIB dépend fortement de la consommation."
  if (NX < 0) insight = "Déficit commercial (X < M) qui pèse sur le PIB."
  return { metrics: { 'Y (PIB)': Y, 'NX': NX }, chartData: chartData as any, insight }
}

export function computeISLM(inputs: {
  A0: number, b: number, h: number, Mo: number, k: number, g: number, B: number
}): SimulatorOutput {
  const { A0, b, h, Mo, k, g, B } = inputs
  
  // Formulas from course:
  // r* = (kA₀ - hM₀ + hB) / (hg + kb)
  // Y* = (gA₀ + bM₀ - bB) / (bk + gh)
  const rStar = (k * A0 - h * Mo + h * B) / (h * g + k * b)
  const yStar = (g * A0 + b * Mo - b * B) / (b * k + g * h)
  
  const multiplier = g / (b * k + g * h)
  const eviction = (k * b) / (h * g + k * b)

  const minRate = 1.5 // Trappe à liquidité
  const yFullEmployment = 800 // Zone classique (verticale)
  const yMax = 1000
  
  const chartData = Array.from({ length: 101 }, (_, i) => {
    const Y = (i / 100) * yMax
    
    // IS curve: linear downward
    const rIS = (A0 - h * Y) / b
    
    // LM curve: 3 segments
    let rLM: number
    if (Y < 200) {
      rLM = minRate // Trappe à liquidité
    } else if (Y < yFullEmployment) {
      // Linear upward part: r = slope * (Y - Y_start) + r_min
      rLM = minRate + (k / g) * (Y - 200)
    } else {
      // Vertical classical part: r goes up very fast
      rLM = minRate + (k / g) * (yFullEmployment - 200) + (Y - yFullEmployment) * 100
    }
    
    return { 
      Y: Math.round(Y), 
      IS: rIS < 0 || rIS > 30 ? null : Math.round(rIS * 100) / 100, 
      LM: rLM > 30 ? 30 : Math.round(rLM * 100) / 100 
    }
  })

  let caseName = "Cas général"
  let caseDesc = "Une politique budgétaire (ΔA₀ > 0) augmente à la fois la production (Y) et le taux d'intérêt (r)."
  
  if (yStar < 200) {
    caseName = "Trappe à liquidité"
    caseDesc = "À taux très bas, la politique budgétaire est maximale (ΔY > 0) mais le taux ne monte pas (Δr = 0)."
  } else if (yStar >= yFullEmployment) {
    caseName = "Cas classique"
    caseDesc = "À plein emploi, la politique budgétaire ne fait que monter le taux d'intérêt (Δr > 0) sans augmenter la production (ΔY = 0). C'est l'éviction totale."
  }

  const insight = `[${caseName}] ${caseDesc} (Équilibre: Y* = ${Math.round(yStar)}, r* = ${rStar.toFixed(1)}%)`
  
  return {
    metrics: { 'Y* (PIB)': yStar, 'r* (%)': rStar, 'Mult. Budgétaire': multiplier, 'Effet Éviction': eviction },
    chartData: chartData as any,
    insight,
  }
}

export function computePolitiqueBudgetaire(inputs: { c: number, dG: number, dT: number }): SimulatorOutput {
  const { c, dG, dT } = inputs
  const kG = 1 / (1 - c)
  const kT = -c / (1 - c)
  const dY = kG * dG + kT * dT
  const chartData: any[] = []
  let insight = "Multiplicateur budgétaire en action."
  if (dY > 0) insight = "Politique de relance efficace, le PIB augmente."
  return { metrics: { 'ΔY': dY, 'kG': kG, 'kT': kT }, chartData: chartData as any, insight }
}

export function computeCreationMonetaire(inputs: { B: number, r: number, c: number }): SimulatorOutput {
  const { B, r, c } = inputs
  const m = 1 / (c + r * (1 - c))
  const M = m * B
  const chartData: any[] = []
  let insight = "Création monétaire par le multiplicateur de crédit."
  if (r < 0.1) insight = "Faible taux de réserves: création monétaire forte."
  return { metrics: { 'M': M, 'm': m }, chartData: chartData as any, insight }
}

export function computeTaylor(inputs: { rStar: number, piStar: number, pi: number, y: number, yBar: number, alpha: number, beta: number }): SimulatorOutput {
  const { rStar, piStar, pi, y, yBar, alpha, beta } = inputs
  const gapY = ((y - yBar) / yBar) * 100
  const r = rStar + pi + alpha * (pi - piStar) + beta * gapY
  const chartData: any[] = []
  let insight = "Règle de Taylor."
  if (pi > piStar) insight = "Inflation supérieure à la cible: hausse des taux requise."
  return { metrics: { 'r cible (%)': r, 'Output Gap (%)': gapY }, chartData: chartData as any, insight }
}

export function computeGordon(inputs: { D: number, r: number, g: number }): SimulatorOutput {
  const { D, r, g } = inputs
  const P = r > g ? D / ((r - g) / 100) : 0
  const chartData: any[] = []
  let insight = "Évaluation d'action."
  if (g >= r) insight = "Croissance >= Taux requis : modèle non applicable."
  return { metrics: { 'Prix (P)': P }, chartData: chartData as any, insight }
}

export function computeBOP(inputs: { X: number, M: number, R: number, TR: number, KA: number, FA: number }): SimulatorOutput {
  const { X, M, R, TR, KA, FA } = inputs
  const CA = X - M + R + TR
  const BP = CA + KA + FA
  const chartData = [
    { name: 'Exports (X)', y: X },
    { name: 'Imports (M)', y: -M },
    { name: 'Revenus', y: R },
    { name: 'Transferts', y: TR },
    { name: 'Cap. (KA)', y: KA },
    { name: 'Fin. (FA)', y: FA },
    { name: 'Solde BP', y: BP },
  ]
  let insight = "Balance des paiements."
  if (CA < 0) insight = "Déficit courant à financer par des capitaux étrangers."
  return { metrics: { 'Compte Courant': CA, 'Balance Globale': BP }, chartData: chartData as any, insight }
}

export function computePPA(inputs: { P: number, PStar: number }): SimulatorOutput {
  const { P, PStar } = inputs
  const e = PStar / P
  const chartData: any[] = []
  let insight = "Parité de pouvoir d'achat."
  if (P > PStar) insight = "Monnaie domestique surévaluée par rapport aux prix."
  return { metrics: { 'Taux de change (e)': e }, chartData: chartData as any, insight }
}

export function computeTEC(inputs: { Px: number, Pm: number }): SimulatorOutput {
  const { Px, Pm } = inputs
  const TEC = Px / Pm
  const chartData: any[] = []
  let insight = "Termes de l'échange."
  if (TEC > 1) insight = "Amélioration des termes de l'échange."
  else insight = "Dégradation des termes de l'échange."
  return { metrics: { 'TEC': TEC }, chartData: chartData as any, insight }
}

export function computeOCA(inputs: { symetrie: number, flexibilite: number, integration: number }): SimulatorOutput {
  const { symetrie, flexibilite, integration } = inputs
  const index = symetrie * 0.4 + flexibilite * 0.3 + integration * 0.3
  const chartData: any[] = []
  let insight = "ZMO (Mundell)."
  if (index > 7) insight = "Conditions favorables pour une union monétaire."
  return { metrics: { 'Indice OCA': index }, chartData: chartData as any, insight }
}

export function computeSolow(inputs: { s: number, n: number, delta: number, alpha: number, A: number }): SimulatorOutput {
  const { s, n, delta, alpha, A } = inputs
  const kStar = Math.pow((s * A) / (n + delta), 1 / (1 - alpha))
  const yStar = A * Math.pow(kStar, alpha)
  const chartData: any[] = []
  let insight = "Modèle de Solow."
  if (s > 0.4) insight = "Épargne très élevée: peut dépasser la règle d'or."
  return { metrics: { 'k*': kStar, 'y*': yStar }, chartData: chartData as any, insight }
}

export function computeGini(inputs: { A: number, B: number }): SimulatorOutput {
  const { A, B } = inputs
  const G = A / (A + B)
  const chartData: any[] = []
  let insight = "Inégalités (Courbe de Lorenz)."
  if (G > 0.4) insight = "Inégalités élevées."
  return { metrics: { 'Coefficient de Gini': G }, chartData: chartData as any, insight }
}

export const simulators = {
  'inflation': computeInflation,
  'chomage': computeChomage,
  'dette': computeDette,
  'deficit': computeDeficit,
  'finance-islamique': computeFinanceIslamique,
  'crise-2007': computeCrise2007,
  'echanges': computeEchanges,
  'taux-de-change': computeTauxDeChange,
  'deficit-commercial': computeDeficitCommercial,
  'croissance': computeCroissance,
  'informel': computeInformel,
  'financement': computeFinancement,
  'politique-monetaire': computeISLM,
  'zone-euro': computeZoneEuro,
}
