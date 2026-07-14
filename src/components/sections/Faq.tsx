import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Motion'
import { FAQ } from '@/lib/config'

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors hover:text-magenta-soft"
        >
          <span className="text-base font-semibold text-bone sm:text-lg">
            {q}
          </span>

          {/* Icono +/− */}
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line">
            <span className="absolute h-[1.5px] w-3.5 rounded bg-current" />
            <motion.span
              animate={{ rotate: isOpen ? 0 : 90, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute h-[1.5px] w-3.5 rounded bg-current"
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pr-12 pb-6 text-sm leading-relaxed text-muted sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section id="faq">
      <SectionHeader title={FAQ.title} />

      <Reveal className="mx-auto mt-14 max-w-3xl">
        {FAQ.items.map((item, i) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </Reveal>
    </Section>
  )
}
