'use client'

import type { QrType, Values } from '@/lib/qr/content'

interface Props {
  type: QrType
  values: Values
  onChange: (v: Values) => void
}

export function ContentForm({ type, values, onChange }: Props) {
  const set = (key: string, value: string | boolean) => onChange({ ...values, [key]: value })

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3.5">
      {type.fields.map((fd, i) => {
        if (fd.showIf && !fd.showIf(values)) return null
        const id = `f-${type.id}-${fd.key}`
        const span = fd.half ? 'col-span-2 sm:col-span-1' : 'col-span-2'

        if (fd.kind === 'checkbox') {
          return (
            <label key={fd.key} htmlFor={id} className={`${span} flex cursor-pointer items-center gap-2.5 self-end py-2.5 text-[14px] font-semibold`}>
              <input
                id={id}
                type="checkbox"
                checked={Boolean(values[fd.key])}
                onChange={(e) => set(fd.key, e.target.checked)}
                className="h-5 w-5 rounded-md border-[1.5px] border-ink accent-[#ff5a2b]"
              />
              {fd.label}
            </label>
          )
        }

        const common = {
          id,
          value: String(values[fd.key] ?? ''),
          placeholder: fd.placeholder,
          autoComplete: fd.autoComplete ?? 'off',
          maxLength: fd.maxLength,
          className: 'field',
          'aria-describedby': fd.hint ? `${id}-hint` : undefined,
        }

        return (
          <div key={fd.key} className={span}>
            <label htmlFor={id} className="field-label">
              {fd.label}
            </label>
            {fd.kind === 'textarea' ? (
              <textarea {...common} rows={3} onChange={(e) => set(fd.key, e.target.value)} className="field resize-y" />
            ) : fd.kind === 'select' ? (
              <select id={id} value={String(values[fd.key] ?? '')} onChange={(e) => set(fd.key, e.target.value)} className="field appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2314130f'%3E%3Cpath d='M5.2 7.5 10 12.3l4.8-4.8 1.1 1.1L10 14.5 4.1 8.6z'/%3E%3C/svg%3E")` }}>
                {fd.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={fd.kind === 'url' ? 'text' : fd.kind}
                inputMode={fd.kind === 'url' ? 'url' : fd.kind === 'tel' ? 'tel' : fd.kind === 'email' ? 'email' : undefined}
                autoCapitalize={fd.kind === 'url' || fd.kind === 'email' ? 'none' : undefined}
                spellCheck={fd.kind === 'text' ? undefined : false}
                autoFocus={false}
                onChange={(e) => set(fd.key, e.target.value)}
                data-first={i === 0 ? '' : undefined}
              />
            )}
            {fd.hint && (
              <p id={`${id}-hint`} className="mt-1.5 text-[12.5px] leading-snug text-muted">
                {fd.hint}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
