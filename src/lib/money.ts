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
 * Escala legible en COP. La abreviatura NO se comprime más allá de "millones":
 * en Colombia "MM" se lee como millones tanto o más que como miles de millones,
 * así que $2.748.000.000 se pinta "$ 2.748 M" (y no "$ 2,7 MM", que se lee como
 * dos millones y medio cuando en realidad son casi tres mil).
 *
 * Reglas:
 *   < 1.000.000    → cifra completa      $ 850.000
 *   < 1.000 M      → millones            $ 27,5 M
 *   ≥ 1.000 M      → millones sin decimal $ 2.748 M
 */
function scaleCOP(value: number): {
  amount: number
  decimals: number
  unit: string
} {
  const abs = Math.abs(value)

  if (abs >= 1_000_000_000) {
    /* Miles de millones: ya no hace falta decimal, el orden de magnitud manda */
    return { amount: value / 1_000_000, decimals: 0, unit: ' M' }
  }
  if (abs >= 1_000_000) {
    return { amount: value / 1_000_000, decimals: 1, unit: ' M' }
  }
  return { amount: value, decimals: 0, unit: '' }
}

/**
 * Abreviada, para cifras grandes: $ 27,5 M · $ 2.748 M · $ 850.000
 * Se usa en los números protagonistas para que no desborden.
 */
export function formatCOPShort(value: number): string {
  const { amount, decimals, unit } = scaleCOP(value)

  return `${CURRENCY} ${amount.toLocaleString(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${unit}`
}

/** Devuelve las partes por separado, para animar solo el número. */
export function splitCOPShort(value: number): {
  amount: number
  decimals: number
  unit: string
} {
  return scaleCOP(value)
}

/** Porcentaje con la coma decimal de es-CO: 4,58 % — no "4.58 %". */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toLocaleString(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} %`
}
