/* ═══════════════════════════════════════════════════════════════
   MONEDA — Peso colombiano (COP)
   Un único sitio donde se decide cómo se pinta el dinero.
   ═══════════════════════════════════════════════════════════════ */

export const CURRENCY = '$' as const
export const LOCALE = 'es-CO' as const

/** Cifra exacta con separador de miles: $ 12.750.000 */
export function formatCOP(value: number): string {
  return `${CURRENCY} ${Math.round(value).toLocaleString(LOCALE)}`
}

/**
 * Abreviada, para cifras grandes: $ 12,7 M · $ 850 K · $ 1,2 MM
 * Se usa en los números protagonistas para que no desborden.
 */
export function formatCOPShort(value: number): string {
  const abs = Math.abs(value)

  if (abs >= 1_000_000_000) {
    return `${CURRENCY} ${(value / 1_000_000_000).toLocaleString(LOCALE, {
      maximumFractionDigits: 1,
    })} MM`
  }
  if (abs >= 1_000_000) {
    return `${CURRENCY} ${(value / 1_000_000).toLocaleString(LOCALE, {
      maximumFractionDigits: 1,
    })} M`
  }
  if (abs >= 1_000) {
    return `${CURRENCY} ${(value / 1_000).toLocaleString(LOCALE, {
      maximumFractionDigits: 0,
    })} K`
  }
  return formatCOP(value)
}

/** Devuelve las partes por separado, para animar solo el número. */
export function splitCOPShort(value: number): {
  amount: number
  decimals: number
  unit: string
} {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000)
    return { amount: value / 1_000_000_000, decimals: 1, unit: ' MM' }
  if (abs >= 1_000_000)
    return { amount: value / 1_000_000, decimals: 1, unit: ' M' }
  if (abs >= 1_000) return { amount: value / 1_000, decimals: 0, unit: ' K' }
  return { amount: value, decimals: 0, unit: '' }
}
