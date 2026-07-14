import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PopupModal } from 'react-calendly'
import { CALENDLY_PAGE_SETTINGS, CALENDLY_URL } from './config'

/* Contexto que deja a cualquier botón de la página abrir el popup
   de Calendly llamando a openCalendly(). La URL vive en config.ts. */

type CalendlyContextValue = { openCalendly: () => void }

const CalendlyContext = createContext<CalendlyContextValue | null>(null)

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null)

  /* react-calendly necesita un nodo del DOM donde montar el modal.
     Lo resolvemos tras el montaje para no romper en SSR/build. */
  useEffect(() => {
    setRootEl(document.getElementById('root'))
  }, [])

  const openCalendly = useCallback(() => setIsOpen(true), [])
  const value = useMemo(() => ({ openCalendly }), [openCalendly])

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      {rootEl && (
        <PopupModal
          url={CALENDLY_URL}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={rootEl}
          pageSettings={CALENDLY_PAGE_SETTINGS}
        />
      )}
    </CalendlyContext.Provider>
  )
}

export function useCalendly(): CalendlyContextValue {
  const ctx = useContext(CalendlyContext)
  if (!ctx) {
    throw new Error('useCalendly debe usarse dentro de <CalendlyProvider>')
  }
  return ctx
}
