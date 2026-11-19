'use client'

import { qrTypes, type TypeId } from '@/lib/qr/content'
import { typeIcons } from './typeIcons'

export function TypePicker({ active, onChange }: { active: TypeId; onChange: (t: TypeId) => void }) {
  return (
    <div role="radiogroup" aria-label="Art des QR-Codes" className="flex flex-wrap gap-1.5">
      {qrTypes.map((t) => {
        const Icon = typeIcons[t.id]
        const on = t.id === active
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-[7px] text-[13.5px] font-semibold transition-all duration-150 ${
              on
                ? 'border-ink bg-ink text-paper'
                : 'border-ink/15 bg-white text-ink/75 hover:border-ink/60 hover:text-ink'
            }`}
          >
            <Icon className={`h-4 w-4 ${on ? 'text-signal' : ''}`} aria-hidden />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
