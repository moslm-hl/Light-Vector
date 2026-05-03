import type { ThemeContent } from './types'

export const themes: ThemeContent[] = [
  {
    id: 'F1', slug: 'fondamentaux', title: 'Aspects Fondamentaux', category: 'macro',
    definition: "Étude des agents économiques, des marchés et du circuit économique global qui structurent l'activité d'un pays.",
    keyConcepts: [
      { term: 'Secteurs Institutionnels', definition: "SNF (entreprises), SF (banques), APU (État), Ménages, Reste du Monde." },
      { term: 'Agents Économiques', definition: "Unités ayant un comportement homogène (production, consommation, redistribution)." },
      { term: 'Marchés Principaux', definition: "Biens et Services (PIB/Prix), Travail (Emploi), Monétaire (Taux r), Change (Taux e)." },
      { term: 'Circuit Économique', definition: "Représentation schématique des flux réels et monétaires entre agents." },
    ],
    formulas: [
      { expression: 'Y = C', description: "Équilibre circuit 2 agents (économie fermée sans État)", variables: {} },
      { expression: 'Y = C + I + G', description: "Équilibre circuit 3 agents (avec État)", variables: {} },
      { expression: 'Y + M = C + I + G + X', description: "Équilibre circuit complet (4 agents)", variables: { M: 'imports', X: 'exports' } },
    ],
    examples: [
      { title: 'Flux Circulaire', description: "Les revenus des ménages deviennent les dépenses des entreprises (et inversement)." },
    ],
  },
  {
    id: 'F2', slug: 'consommation', title: 'Consommation & Épargne', category: 'macro',
    definition: "Analyse de la fonction de consommation keynésienne et de l'arbitrage entre consommation immédiate et épargne (consommation différée).",
    keyConcepts: [
      { term: 'Revenu Disponible (Yd)', definition: "Revenu après impôts et charges sociales (Y - T)." },
      { term: 'Pmc (c)', definition: "Propension marginale à consommer : part de chaque dinar supplémentaire consommée (0 < c < 1)." },
      { term: 'Consommation Incompressible (C0)', definition: "Minimum vital consommé même avec un revenu nul." },
      { term: 'Seuil d\'Épargne', definition: "Niveau de revenu où l'épargne est nulle (Yd = C)." },
    ],
    formulas: [
      { expression: 'C = C₀ + c · Yd', description: "Fonction de consommation", variables: { 'C₀': 'consommation autonome', c: 'Pmc' } },
      { expression: 'S = −C₀ + s · Yd', description: "Fonction d'épargne", variables: { s: 'Pms = 1 - c' } },
      { expression: 'PMC + PMS = 1', description: "Identité des propensions moyennes", variables: {} },
      { expression: 'YdE = C₀ / s', description: "Seuil d'épargne", variables: {} },
    ],
    examples: [
      { title: 'Loi Psychologique', description: "La consommation augmente moins vite que le revenu (Keynes)." },
    ],
  },
  {
    id: 'F3', slug: 'investissement', title: 'Investissement & Multiplicateur', category: 'macro',
    definition: "L'investissement est le moteur de la croissance. Il dépend du taux d'intérêt (coût) et de la demande anticipée (accélérateur).",
    keyConcepts: [
      { term: 'Investissement (I)', definition: "Dépense pour augmenter ou renouveler le stock de capital (FBCF)." },
      { term: 'VAN', definition: "Valeur Actuelle Nette : somme des revenus futurs actualisés moins le coût initial." },
      { term: 'TRI (ρ)', definition: "Taux de rendement interne : taux d'actualisation qui annule la VAN." },
      { term: 'Multiplicateur (μ)', definition: "Amplification d'un choc d'investissement sur le revenu national (PIB)." },
    ],
    formulas: [
      { expression: 'I = f(r, Y)', description: "Fonction d'investissement", variables: { r: 'taux intérêt (négatif)', Y: 'revenu (positif)' } },
      { expression: 'VAN = Σ [RNₜ / (1+r)ₜ] − I₀', description: "Calcul de rentabilité", variables: { RN: 'revenus nets' } },
      { expression: 'μ = 1 / (1 − c)', description: "Multiplicateur simple (2 agents)", variables: {} },
      { expression: 'ΔY = μ · ΔI', description: "Effet multiplicateur", variables: {} },
    ],
    examples: [
      { title: 'Rentabilité', description: "Un projet est lancé si TRI > r (taux d'intérêt du marché)." },
    ],
  },
  {
    id: 'F4', slug: 'monnaie', title: 'Monnaie & Agrégats', category: 'monnaie',
    definition: "Étude de la monnaie, de ses fonctions (échange, réserve, unité) et de sa mesure par les agrégats monétaires.",
    keyConcepts: [
      { term: 'Agrégat M1', definition: "Billets + pièces + dépôts à vue (monnaie liquide)." },
      { term: 'Agrégat M2', definition: "M1 + Quasi-monnaie (comptes sur livrets, épargne stable)." },
      { term: 'Demande de Monnaie (Md)', definition: "Dépend du motif de transaction (L1) et de spéculation (L2)." },
      { term: 'Création Monétaire', definition: "Les banques créent la monnaie en accordant des crédits (ex nihilo)." },
    ],
    formulas: [
      { expression: 'Md = kY + B − gr', description: "Demande de monnaie globale", variables: { kY: 'transaction', 'B-gr': 'spéculation' } },
      { expression: 'M = m · B', description: "Multiplicateur de crédit", variables: { B: 'Base monétaire (BC)' } },
      { expression: 'Mo = Md', description: "Équilibre du marché monétaire", variables: {} },
    ],
    examples: [
      { title: 'Masse Monétaire', description: "La BCT régule M2 pour contrôler l'inflation en Tunisie." },
    ],
  },
  {
    id: '01', slug: 'inflation', title: "L'Inflation", category: 'macro',
    definition: "Hausse généralisée, persistante et auto-entretenue du niveau général des prix (NGP). Elle réduit le pouvoir d'achat et crée de l'incertitude économique.",
    keyConcepts: [
      { term: 'IPC', definition: "Indice des Prix à la Consommation — mesure le taux d'inflation" },
      { term: 'Hyperinflation', definition: "Taux > 50% par mois (ex: Zimbabwe, Allemagne 1923) — destruction de la monnaie" },
      { term: 'Inflation par les coûts', definition: "Hausse des salaires ou matières premières (Stagflation)" },
      { term: 'Désinflation', definition: "Ralentissement de la hausse des prix (taux d'inflation baisse mais reste positif)" },
      { term: 'Déflation', definition: "Baisse généralisée et durable des prix (taux d'inflation négatif)" },
    ],
    formulas: [
      { expression: 'π = (IPCt − IPCt-1) / IPCt-1 × 100', description: "Taux d'inflation", variables: { 'π': "taux d'inflation", 'IPC': "Indice des Prix à la Consommation" } },
      { expression: 'M · V = P · Y', description: "Équation quantitative (Fisher)", variables: { M: 'masse monétaire', V: 'vitesse circulation', P: 'niveau des prix', Y: 'PIB réel' } },
      { expression: 'π ≈ τM − τY', description: "Inflation monétaire (approximation)", variables: { τM: 'croissance monnaie', τY: 'croissance PIB' } },
    ],
    examples: [
      { title: 'Choc pétrolier 1973', description: "Inflation par les coûts provoquant une stagflation mondiale." },
      { title: 'Hyperinflation Zimbabwe', description: "Taux > 89 milliards % en 2008 — perte totale de confiance." },
    ],
  },
  {
    id: '02', slug: 'chomage', title: 'Le Chômage', category: 'macro',
    definition: "Situation d'une personne sans emploi, disponible et en recherche active (BIT). Le taux de chômage mesure ce déséquilibre sur le marché du travail.",
    keyConcepts: [
      { term: 'Chômage Frictionnel', definition: "Délai normal de transition entre deux emplois (mobilité)" },
      { term: 'Chômage Structurel', definition: "Inadéquation entre les compétences offertes et les besoins du marché" },
      { term: 'Chômage Conjoncturel', definition: "Lié à l'insuffisance de la demande effective (Keynésien)" },
      { term: 'Courbe de Phillips', definition: "Relation inverse entre taux d'inflation et taux de chômage à court terme" },
      { term: 'NAIRU', definition: "Taux de chômage n'accélérant pas l'inflation (chômage naturel)" },
    ],
    formulas: [
      { expression: 'U = (Chômeurs / Pop. active) × 100', description: "Taux de chômage", variables: { U: 'taux de chômage' } },
      { expression: 'π = −α(U − U*) + πᵉ', description: "Phillips augmentée", variables: { 'U*': 'chômage naturel', 'πᵉ': 'inflation anticipée' } },
      { expression: 'ΔU = −0.5(g − 2.5%)', description: "Loi d'Okun (exemple)", variables: { g: 'croissance PIB' } },
    ],
    examples: [
      { title: 'Chômage des diplômés', description: "Problème structurel majeur en Tunisie (inadéquation formation/emploi)." },
      { title: 'Grande Récession 2009', description: "Explosion du chômage conjoncturel suite au choc de demande." },
    ],
  },
  {
    id: '03', slug: 'dette', title: 'Dette Publique', category: 'macro',
    definition: "Stock des emprunts contractés par l'État. Sa dynamique dépend de la croissance, du taux d'intérêt et du solde budgétaire.",
    keyConcepts: [
      { term: 'Ratio Dette/PIB', definition: "Indicateur de soutenabilité (seuil Maastricht = 60%)" },
      { term: 'Effet Boule de Neige', definition: "Si r > g, la dette s'auto-alimente par les intérêts" },
      { term: 'Solde Primaire', definition: "Solde budgétaire hors charge d'intérêts" },
      { term: 'Risque Souverain', definition: "Risque de défaut de paiement d'un État (Spread de taux)" },
    ],
    formulas: [
      { expression: 'Δ(D/Y) = (r − g)(D/Y) − (B/Y)', description: "Dynamique de la dette", variables: { D: 'dette', Y: 'PIB', r: 'taux intérêt réel', g: 'croissance', B: 'solde primaire' } },
      { expression: 'Charge = r × Dette', description: "Poids des intérêts", variables: {} },
    ],
    examples: [
      { title: 'Grèce 2010', description: "Crise de la dette souveraine révélant un déficit caché de 13%." },
      { title: 'Tunisie 2024', description: "Dette publique ~80% du PIB, forte dépendance aux financements externes." },
    ],
  },
  {
    id: '04', slug: 'deficit', title: 'Déficit Budgétaire', category: 'macro',
    definition: "Excès des dépenses publiques (G) sur les recettes fiscales (T). Il alimente la dette publique et peut stimuler ou évincer l'économie.",
    keyConcepts: [
      { term: 'Stabilisateurs Automatiques', definition: "Mécanismes amortissant le cycle (impôts ↓ et aides ↑ en récession)" },
      { term: 'Déficit Structurel', definition: "Partie du déficit indépendante du cycle économique" },
      { term: 'Effet d\'Éviction', definition: "Déficit ↑ → r ↑ → Investissement privé ↓" },
      { term: 'Règle d\'Or', definition: "N'emprunter que pour l'investissement, pas pour le fonctionnement" },
    ],
    formulas: [
      { expression: 'Déficit = G − T', description: "Solde budgétaire", variables: { G: 'dépenses', T: 'recettes' } },
      { expression: 'Solde Total = Solde Primaire − Charge Dette', description: "Calcul du solde final", variables: {} },
    ],
    examples: [
      { title: 'Plan COVID-19', description: "Déficits massifs en 2020 pour soutenir les ménages et entreprises." },
      { title: 'Loi de Finances', description: "Document fixant les objectifs de recettes et dépenses de l'État." },
    ],
  },
  {
    id: '05', slug: 'finance-islamique', title: 'Finance Islamique', category: 'finance',
    definition: "Système financier conforme à la Charia, basé sur le partage des risques et l'adossement à des actifs réels.",
    keyConcepts: [
      { term: 'Interdiction du Riba', definition: "Prohibition de l'intérêt usuraire fixe et prédéterminé" },
      { term: 'Partage 3P', definition: "Partage des Profits et des Pertes entre prêteur et emprunteur" },
      { term: 'Mourabaha', definition: "Contrat d'achat-revente avec marge bénéficiaire connue" },
      { term: 'Sukuk', definition: "Certificats d'investissement (obligations islamiques) adossés à des actifs" },
      { term: 'Takaful', definition: "Système d'assurance solidaire et mutuelle" },
    ],
    formulas: [
      { expression: 'Profit = (Rendement Réel) × Ratio Partage', description: "Logique moudaraba", variables: {} },
    ],
    examples: [
      { title: 'Zitouna Bank', description: "Pionnier de la banque islamique en Tunisie." },
      { title: 'Financement immobilier', description: "Utilisation de la Mourabaha au lieu du prêt à intérêt classique." },
    ],
  },
  {
    id: '06', slug: 'crise-2007', title: 'Crise 2007 (Subprimes)', category: 'macro',
    definition: "Crise financière mondiale née du marché immobilier US, propagée par la titrisation et la faillite de Lehman Brothers.",
    keyConcepts: [
      { term: 'Subprimes', definition: "Crédits immobiliers hypothécaires à taux variables accordés à des ménages peu solvables." },
      { term: 'Titrisation', definition: "Transformation de crédits risqués en titres négociables facilement vendus sur les marchés mondiaux." },
      { term: 'Risque Systémique', definition: "Risque pesant sur l'ensemble du système financier dû à la formation de bulles spéculatives." },
      { term: 'Crise de Liquidité', definition: "Saisie du marché immobilier entraînant la faillite des banques et l'assèchement du crédit." },
      { term: 'Intervention BC', definition: "Injection massive de liquidités par les Banques Centrales pour éviter la hausse des taux." },
    ],
    formulas: [
      { expression: 'Levier = Dette / Fonds Propres', description: "Effet de levier financier", variables: {} },
    ],
    examples: [
      { title: 'Lehman Brothers', description: "Sa faillite en sept. 2008 a failli causer l'effondrement du système mondial." },
      { title: 'TARP', description: "Plan de sauvetage américain de 700 Mds $ pour recapitaliser les banques." },
    ],
  },
  {
    id: '07', slug: 'echanges', title: 'Échanges Internationaux', category: 'international',
    definition: "Mesure des flux réels et financiers entre une économie et le Reste du Monde via la Balance des Paiements.",
    keyConcepts: [
      { term: 'Balance des Paiements', definition: "Compte courant + Compte de capital + Compte financier" },
      { term: 'Taux de Couverture', definition: "Capacité des exportations à payer les importations" },
      { term: 'IDE', definition: "Investissements Directs Étrangers — flux durables de capital" },
    ],
    formulas: [
      { expression: 'BC = X − M', description: "Solde commercial", variables: {} },
      { expression: 'Tc = (X / M) × 100', description: "Taux de couverture", variables: {} },
      { expression: 'To = [(X + M)/2] / PIB × 100', description: "Taux d'ouverture", variables: {} },
    ],
    examples: [
      { title: 'Déficit courant tunisien', description: "Déficit structurel compensé par les transferts des TRE et le tourisme." },
    ],
  },
  {
    id: '08', slug: 'taux-de-change', title: 'Taux de Change', category: 'international',
    definition: "Prix d'une monnaie par rapport à une autre. Crucial pour la compétitivité et l'inflation importée.",
    keyConcepts: [
      { term: 'Taux de Change', definition: "Prix d'une monnaie exprimé en unités monétaires étrangères." },
      { term: 'Formation du Taux', definition: "Déterminé par la confrontation de l'offre et de la demande de devises." },
      { term: 'Change Fixe', definition: "Parité stable garantie par la BC (or ou panier de devises). Interventions obligatoires de la BC." },
      { term: 'Change Flottant', definition: "Déterminé librement par le marché sans intervention systématique de la BC." },
      { term: 'Risque de Change', definition: "Incertitude liée aux variations futures du taux impactant les importateurs/exportateurs." },
      { term: 'Instruments de Couverture', definition: "Assurances, couverture au comptant/à terme, et produits dérivés (options)." },
    ],
    formulas: [
      { expression: 'Zr = Z × (P*/P)', description: "Taux de change réel", variables: { Z: 'taux nominal', 'P*': 'prix étrangers', P: 'prix locaux' } },
      { expression: 'Cotation au certain', description: "1 monnaie nationale = x devises étrangères", variables: {} },
    ],
    examples: [
      { title: 'Dévaluation vs Dépréciation', description: "Dévaluation (décision officielle en change fixe) vs Dépréciation (baisse du marché en change flottant)." },
    ],
  },
  {
    id: '09', slug: 'deficit-commercial', title: 'Déficit Commercial', category: 'international',
    definition: "Déséquilibre où M > X. Impacte le PIB via le multiplicateur de l'économie ouverte.",
    keyConcepts: [
      { term: 'Compétitivité-Prix', definition: "Capacité à exporter grâce à des coûts bas" },
      { term: 'Compétitivité Hors-Prix', definition: "Innovation, qualité et image de marque" },
      { term: 'Propension à importer (m)', definition: "Fraction du revenu qui fuit vers l'étranger" },
    ],
    formulas: [
      { expression: 'μ = 1 / (s + ct + m)', description: "Multiplicateur ouvert", variables: { s: 'épargne', ct: 'fiscalité', m: 'imports' } },
    ],
    examples: [
      { title: 'Balance Énergétique', description: "Source majeure de déficit pour les pays importateurs de pétrole." },
    ],
  },
  {
    id: '10', slug: 'croissance', title: 'Croissance & Développement', category: 'developpement',
    definition: "La croissance est quantitative (PIB) ; le développement est qualitatif (bien-être, IDH).",
    keyConcepts: [
      { term: 'Progrès Technique', definition: "Principal moteur de la croissance à long terme (résidu de Solow)" },
      { term: 'IDH', definition: "Indice combinant santé, éducation et revenu (échelle 0 à 1)" },
      { term: 'Convergence', definition: "Idée que les pays pauvres rattrapent les riches (Modèle de Solow)" },
    ],
    formulas: [
      { expression: 'Y = A · K^α · L^(1-α)', description: "Fonction Cobb-Douglas", variables: { A: 'productivité', K: 'capital', L: 'travail' } },
      { expression: 'gPIB = (PIBt / PIBt-1) - 1', description: "Taux de croissance", variables: {} },
    ],
    examples: [
      { title: 'Trente Glorieuses', description: "Période de croissance exceptionnelle (1945-1975) en Europe." },
      { title: 'Piège à revenu intermédiaire', description: "Difficulté à passer d'une économie de bas coût à l'innovation." },
    ],
  },
  {
    id: '11', slug: 'informel', title: 'Secteur Informel', category: 'developpement',
    definition: "Activités légales mais non enregistrées. Pilier de survie mais frein à la fiscalité.",
    keyConcepts: [
      { term: 'Inclusion Financière', definition: "Défi d'accès au crédit formel pour les petits entrepreneurs" },
      { term: 'Manque à gagner fiscal', definition: "Impact du secteur informel sur les recettes de l'État" },
      { term: 'Productivité', definition: "Généralement très faible dans l'informel (manque de capital)" },
    ],
    formulas: [
      { expression: 'PIB_Réel = PIB_Off + PIB_Inf', description: "Vision globale de l'économie", variables: {} },
    ],
    examples: [
      { title: 'Commerce frontalier', description: "Exemple typique d'activité informelle majeure en Tunisie." },
    ],
  },
  {
    id: '12', slug: 'financement', title: 'Financement de l\'Économie', category: 'monnaie',
    definition: "Analyse des circuits permettant de drainer l'épargne vers l'investissement. Étude du passage d'une économie d'endettement à une économie de marchés financiers.",
    keyConcepts: [
      { term: 'Capacité de Financement', definition: "Revenu > Dépenses (Ménages). Agent qui offre des capitaux." },
      { term: 'Besoin de Financement', definition: "Dépenses > Revenu (Entreprises, État). Agent qui demande des capitaux." },
      { term: 'Financement Direct', definition: "Rencontre directe sur le marché des capitaux (actions, obligations) sans intermédiaire bancaire." },
      { term: 'Financement Indirect', definition: "Intermédiation bancaire où la banque collecte l'épargne pour accorder des crédits." },
      { term: 'Globalisation Financière', definition: "Processus d'intégration des marchés mondiaux via les '3 D' : Désintermédiation, Déréglementation, Décloisonnement." },
      { term: 'Marché Monétaire', definition: "Marché des capitaux à court terme (interbancaire et titres de créances négociables)." },
      { term: 'Titrisation', definition: "Transformation de créances (ex: crédits) en titres financiers négociables en bourse." },
    ],
    formulas: [
      { expression: 'Taux d\'Intermédiation = (Crédits / Financement Total) × 100', description: "Mesure de la dépendance au système bancaire", variables: {} },
      { expression: 'Taux d\'Autofinancement = (Épargne Brute / FBCF) × 100', description: "Indépendance financière des entreprises", variables: { FBCF: 'Investissement' } },
    ],
    examples: [
      { title: 'Économie de Marché', description: "Prédominance du financement direct (modèle anglo-saxon)." },
      { title: 'Économie d\'Endettement', description: "Prédominance du crédit bancaire (modèle historique français/tunisien)." },
    ],
  },
  {
    id: '13', slug: 'politique-monetaire', title: 'IS-LM & Politique Monétaire', category: 'macro',
    definition: "Modèle de synthèse keynésienne déterminant le PIB (Y) et le taux d'intérêt (r) d'équilibre par la rencontre des marchés des biens (IS) et de la monnaie (LM).",
    keyConcepts: [
      { term: 'Courbe IS', definition: "Équilibre marché des biens : Y = C + I + G + (X-M). Décroissante." },
      { term: 'Courbe LM', definition: "Équilibre marché monétaire : Mo = Md. Croissante." },
      { term: 'Trappe à liquidité', definition: "Zone LM horizontale (r = rmin) : politique monétaire inefficace." },
      { term: 'Zone Classique', definition: "Zone LM verticale (h=0) : politique budgétaire inefficace (éviction totale)." },
      { term: '3 Zones LM', definition: "Keynésienne (horizontale), Médiane (croissante), Classique (verticale)." },
    ],
    formulas: [
      { expression: 'IS : Y = (A₀ − br) / h', description: "Équation de la courbe IS", variables: { A0: 'C0+I0+G0+X0-Mp0 (dépenses autonomes)', b: 'sensibilité de I au taux r', h: '1 - c - i + ct + m (taux de fuite global)' } },
      { expression: 'Pente IS : dY/dr = −b/h < 0', description: "Pente négative de la courbe IS", variables: {} },
      { expression: 'LM : Y = (M₀ − B + gr) / k', description: "Équation de la courbe LM", variables: { M0: 'Offre de monnaie', B: 'Base monétaire fixe', k: 'sensibilité transactionnelle', g: 'sensibilité spéculative' } },
      { expression: 'Pente LM : dY/dr = g/k > 0', description: "Pente positive de la courbe LM", variables: {} },
      { expression: 'Y* = (gA₀ + bM₀ − bB) / (bk + gh)', description: "PIB d'équilibre global", variables: {} },
      { expression: 'r* = (kA₀ − hM₀ + hB) / (hg + kb)', description: "Taux d'intérêt d'équilibre global", variables: {} },
    ],
    examples: [
      { title: 'Déplacement de IS', description: "Une hausse de G0 (politique budgétaire) déplace IS vers la droite parallèlement." },
      { title: 'Déplacement de LM', description: "Une hausse de Mo (politique monétaire) déplace LM vers la droite parallèlement." },
    ],
  },
  {
    id: '14', slug: 'zone-euro', title: 'Zone Euro & Maastricht', category: 'international',
    definition: "Union monétaire partageant l'Euro. Défis de coordination entre 20 pays.",
    keyConcepts: [
      { term: 'Critère de 3%', definition: "Limite du déficit public annuel par rapport au PIB" },
      { term: 'BCE', definition: "Banque Centrale Européenne — unique pilote de la monnaie" },
      { term: 'OMT', definition: "Programme de rachat de dette pour stabiliser les pays fragiles" },
    ],
    formulas: [
      { expression: 'Déficit < 3% ; Dette < 60%', description: "Pacte de Stabilité", variables: {} },
    ],
    examples: [
      { title: 'Mario Draghi', description: "Son discours 'Whatever it takes' en 2012 a sauvé la zone euro." },
    ],
  },
]

