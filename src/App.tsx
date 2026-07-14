import { CalendlyProvider } from '@/lib/calendly'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Clients } from '@/components/sections/Clients'
import { Problems } from '@/components/sections/Problems'
import { Solutions } from '@/components/sections/Solutions'
import { Calculator } from '@/components/sections/Calculator'
import { Guarantee } from '@/components/sections/Guarantee'
import { Methodology } from '@/components/sections/Methodology'
import { Faq } from '@/components/sections/Faq'
import { FinalCta, Footer } from '@/components/sections/FinalCta'

/* El orden de las secciones ES el recorrido de persuasión:
   promesa → prueba social → dolor → solución → cuantificar la pérdida
   → quitar el riesgo → cómo lo hacemos → objeciones → cierre  */

export default function App() {
  return (
    <CalendlyProvider>
      <Navbar />

      <main>
        <Hero />
        <Clients />
        <Problems />
        <Solutions />
        <Calculator />
        <Guarantee />
        <Methodology />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </CalendlyProvider>
  )
}
