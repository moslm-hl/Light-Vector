
export interface GlossaryEntry {
  term: string
  definition: string
  theme?: string
}

export const glossary: GlossaryEntry[] = [
  // Macroéconomie de base
  { term: 'PIB', definition: "Produit intérieur brut : mesure de la production totale d'une économie sur une période.", theme: 'macro' },
  { term: 'PIB réel', definition: "PIB corrigé de l'inflation, mesuré en prix constants.", theme: 'macro' },
  { term: 'PIB nominal', definition: "PIB mesuré en prix courants, non corrigé de l'inflation.", theme: 'macro' },
  { term: 'Revenu disponible (Yd)', definition: "Revenu après impôts : Yd = Y − T.", theme: 'macro' },
  { term: 'Demande effective', definition: "Demande anticipée par les entreprises qui détermine le niveau de production (Keynes).", theme: 'macro' },
  { term: 'Multiplicateur keynésien (μ)', definition: "Rapport ΔY/ΔA₀ : mesure l'amplification d'un choc de demande autonome.", theme: 'macro' },

  // Consommation & Épargne
  { term: 'Pmc', definition: "Propension marginale à consommer = ΔC/ΔYd. Constante dans le modèle keynésien.", theme: 'macro' },
  { term: 'PMC', definition: "Propension moyenne à consommer = C/Yd. Décroissante avec le revenu.", theme: 'macro' },
  { term: 'Pms', definition: "Propension marginale à épargner = ΔS/ΔYd = 1 − Pmc.", theme: 'macro' },
  { term: 'Seuil d\'épargne', definition: "Niveau de revenu où S = 0 : YdE = C₀/s.", theme: 'macro' },
  { term: 'Consommation incompressible (C₀)', definition: "Minimum vital de consommation, indépendant du revenu.", theme: 'macro' },

  // Investissement
  { term: 'VAN', definition: "Valeur Actuelle Nette : si > 0, le projet est rentable.", theme: 'macro' },
  { term: 'TRI (EMC)', definition: "Taux de Rendement Interne : taux ρ tel que VAN = 0. Si ρ > r → investir.", theme: 'macro' },
  { term: 'FBCF', definition: "Formation Brute de Capital Fixe : acquisition de biens d'équipement durables.", theme: 'macro' },

  // Inflation
  { term: 'Inflation', definition: "Hausse généralisée, persistante et auto-entretenue du niveau général des prix.", theme: 'inflation' },
  { term: 'IPC', definition: "Indice des Prix à la Consommation : mesure l'évolution du coût de la vie.", theme: 'inflation' },
  { term: 'Hyperinflation', definition: "Inflation extrême (> 50%/mois) détruisant la valeur de la monnaie.", theme: 'inflation' },
  { term: 'Stagflation', definition: "Combinaison d'inflation élevée et de stagnation économique.", theme: 'inflation' },
  { term: 'Déflation', definition: "Baisse généralisée et durable du niveau général des prix.", theme: 'inflation' },

  // Chômage
  { term: 'Chômage', definition: "Situation d'une personne sans emploi, disponible et en recherche active (définition BIT).", theme: 'chomage' },
  { term: 'Chômage frictionnel', definition: "Chômage temporaire lié aux transitions entre emplois.", theme: 'chomage' },
  { term: 'Chômage structurel', definition: "Inadéquation entre compétences offertes et demandées.", theme: 'chomage' },
  { term: 'Chômage conjoncturel', definition: "Chômage dû à l'insuffisance de la demande effective (keynésien).", theme: 'chomage' },
  { term: 'NAIRU', definition: "Taux de chômage qui n'accélère pas l'inflation (Non-Accelerating Inflation Rate of Unemployment).", theme: 'chomage' },
  { term: 'Courbe de Phillips', definition: "Relation inverse entre inflation et chômage à court terme.", theme: 'chomage' },

  // Monnaie
  { term: 'M1', definition: "Agrégat monétaire : billets + dépôts à vue.", theme: 'monnaie' },
  { term: 'M2', definition: "M1 + quasi-monnaie (dépôts à terme, comptes épargne).", theme: 'monnaie' },
  { term: 'Masse monétaire', definition: "Quantité totale de monnaie en circulation dans l'économie.", theme: 'monnaie' },
  { term: 'Monnaie fiduciaire', definition: "Billets de banque : valeur repose sur la confiance.", theme: 'monnaie' },
  { term: 'Monnaie scripturale', definition: "Monnaie circulant par écritures : chèques, virements, cartes.", theme: 'monnaie' },
  { term: 'Trappe à liquidité', definition: "Zone où r = rmin : politique monétaire totalement inefficace.", theme: 'monnaie' },
  { term: 'Vitesse de circulation (V)', definition: "Nombre de fois qu'une unité monétaire change de mains par période.", theme: 'monnaie' },

  // IS-LM
  { term: 'IS', definition: "Investment-Saving : équilibre marché des biens → relation Y-r décroissante.", theme: 'politique-monetaire' },
  { term: 'LM', definition: "Liquidity-Money : équilibre marché monétaire → relation Y-r croissante.", theme: 'politique-monetaire' },
  { term: 'Effet d\'éviction', definition: "ΔG → r ↑ → I ↓ : la dépense publique évince l'investissement privé.", theme: 'politique-monetaire' },
  { term: 'Politique budgétaire', definition: "Action de l'État sur G et T pour influencer la demande globale.", theme: 'macro' },
  { term: 'Politique monétaire', definition: "Action de la Banque Centrale sur l'offre de monnaie pour contrôler r et P.", theme: 'politique-monetaire' },

  // Agents économiques
  { term: 'Ménages', definition: "Agents dont la fonction principale est la consommation.", theme: 'macro' },
  { term: 'Entreprises (SNF)', definition: "Sociétés Non Financières : production de biens et services marchands.", theme: 'macro' },
  { term: 'Administrations publiques', definition: "Production de services non marchands + redistribution du revenu.", theme: 'macro' },

  // International
  { term: 'Balance des paiements', definition: "Document retraçant toutes les transactions entre résidents et non-résidents.", theme: 'echanges' },
  { term: 'Balance commerciale', definition: "Différence entre exportations et importations de biens : X − M.", theme: 'deficit-commercial' },
  { term: 'Taux de change nominal (Z)', definition: "Nombre d'unités de monnaie nationale pour 1 unité étrangère.", theme: 'taux-de-change' },
  { term: 'Taux de change réel (Zr)', definition: "Zr = Z × (P*/P) : mesure la compétitivité-prix.", theme: 'taux-de-change' },
  { term: 'Condition Marshall-Lerner', definition: "Dépréciation améliore la balance si |εX| + |εM| > 1.", theme: 'taux-de-change' },
  { term: 'Courbe en J', definition: "La balance se dégrade d'abord puis s'améliore après une dépréciation.", theme: 'taux-de-change' },
  { term: 'IDE', definition: "Investissement Direct Étranger : prise de contrôle durable dans un pays étranger.", theme: 'echanges' },

  // Finance islamique
  { term: 'Riba', definition: "Intérêt usuraire interdit par la Charia (finance islamique).", theme: 'finance-islamique' },
  { term: 'Mourabaha', definition: "Vente avec marge bénéficiaire connue (sans intérêt).", theme: 'finance-islamique' },
  { term: 'Moudaraba', definition: "Partenariat : une partie apporte le capital, l'autre le travail.", theme: 'finance-islamique' },
  { term: 'Sukuk', definition: "Obligations islamiques adossées à des actifs réels.", theme: 'finance-islamique' },

  // Crise et dette
  { term: 'Subprimes', definition: "Crédits hypothécaires à haut risque à l'origine de la crise 2007.", theme: 'crise-2007' },
  { term: 'Titrisation', definition: "Transformation de créances en titres financiers négociables.", theme: 'crise-2007' },
  { term: 'Dette publique', definition: "Stock des emprunts contractés par l'État pour financer ses déficits.", theme: 'dette' },
  { term: 'Spread souverain', definition: "Écart de taux entre la dette d'un pays et un taux de référence.", theme: 'zone-euro' },

  // Développement
  { term: 'IDH', definition: "Indice de Développement Humain (PNUD) : espérance de vie + éducation + revenu.", theme: 'croissance' },
  { term: 'Coefficient de Gini', definition: "Mesure des inégalités de revenus (0 = égalité, 1 = inégalité maximale).", theme: 'croissance' },
  { term: 'Secteur informel', definition: "Activités économiques hors réglementation et fiscalité officielle.", theme: 'informel' },
  { term: 'Modèle de Solow', definition: "Modèle de croissance exogène avec état stationnaire et convergence.", theme: 'croissance' },

  // Théories consommation
  { term: 'Effet cliquet (Duesenberry)', definition: "La consommation résiste à la baisse de revenu.", theme: 'macro' },
  { term: 'Revenu permanent (Friedman)', definition: "Partie stable et anticipée du revenu qui détermine la consommation.", theme: 'macro' },
  { term: 'Cycle de vie (Modigliani)', definition: "Épargne pendant la vie active, désépargne à la retraite.", theme: 'macro' },

  // Zone euro
  { term: 'ZMO (Zone Monétaire Optimale)', definition: "Théorie de Mundell : critères pour qu'une union monétaire soit viable.", theme: 'zone-euro' },
  { term: 'Critères de Maastricht', definition: "Déficit < 3% PIB, dette < 60% PIB, inflation maîtrisée.", theme: 'zone-euro' },
  { term: 'BCE', definition: "Banque Centrale Européenne : politique monétaire de la zone euro.", theme: 'zone-euro' },

  // Financement
  { term: 'Multiplicateur de crédit', definition: "M = m × B : la banque crée de la monnaie via le crédit.", theme: 'financement' },
  { term: 'Taux directeur', definition: "Taux auquel la Banque Centrale prête aux banques commerciales.", theme: 'financement' },
  { term: 'Open Market', definition: "Achat/vente de titres par la BC pour contrôler la liquidité.", theme: 'financement' },
]
