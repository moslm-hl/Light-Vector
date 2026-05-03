const BASE = 'https://api.worldbank.org/v2'

export interface DataPoint {
  year: string
  value: number | null
}

async function fetchIndicator(country: string, indicator: string, years: number = 10): Promise<DataPoint[]> {
  try {
    const res = await fetch(
      `${BASE}/country/${country}/indicator/${indicator}?format=json&mrv=${years}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return []
    const json = await res.json()
    if (!json[1]) return []
    return json[1]
      .map((d: { date: string; value: number | null }) => ({ year: d.date, value: d.value }))
      .filter((d: DataPoint) => d.value !== null)
      .reverse()
  } catch {
    return []
  }
}

export async function getTunisiaInflation(): Promise<DataPoint[]> {
  return fetchIndicator('TUN', 'FP.CPI.TOTL.ZG')
}

export async function getTunisiaUnemployment(): Promise<DataPoint[]> {
  return fetchIndicator('TUN', 'SL.UEM.TOTL.ZS')
}

export async function getTunisiaGDP(): Promise<DataPoint[]> {
  return fetchIndicator('TUN', 'NY.GDP.MKTP.KD.ZG')
}

export async function getTunisiaDebt(): Promise<DataPoint[]> {
  return fetchIndicator('TUN', 'GC.DOD.TOTL.GD.ZS')
}

export async function getWorldBankData(countryCode: string, indicator: string, years: number = 10): Promise<DataPoint[]> {
  return fetchIndicator(countryCode, indicator, years)
}
