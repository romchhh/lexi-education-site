'use client'

import {
  getAdminFieldHint,
  getAdminFieldLabel,
  getAdminSelectOptions,
  type AdminSelectOption,
} from '../fieldConfig'
import ui from '../ui.module.css'

export function TextField({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  hint?: string
}) {
  return (
    <div className={ui.field}>
      <label>{label}</label>
      {multiline ? (
        <textarea className={ui.textarea} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={ui.input} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint ? <p className={ui.fieldHint}>{hint}</p> : null}
    </div>
  )
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: AdminSelectOption[]
  hint?: string
}) {
  const selected = options.find((option) => option.value === value)
  const resolvedHint = selected?.hint ?? hint

  return (
    <div className={ui.field}>
      <label>{label}</label>
      <select
        className={ui.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {resolvedHint ? <p className={ui.fieldHint}>{resolvedHint}</p> : null}
    </div>
  )
}

export function ToggleField({
  label,
  value,
  onChange,
  hint,
  onLabel = 'Так',
  offLabel = 'Ні',
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
  hint?: string
  onLabel?: string
  offLabel?: string
}) {
  return (
    <div className={ui.field}>
      <label className={ui.toggleRow}>
        <input
          type="checkbox"
          className={ui.toggleInput}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={ui.toggleText}>
          <strong>{label}</strong>
          <span>{value ? onLabel : offLabel}</span>
        </span>
      </label>
      {hint ? <p className={ui.fieldHint}>{hint}</p> : null}
    </div>
  )
}

export function ListItemField({
  field,
  value,
  onChange,
}: {
  field: string
  value: unknown
  onChange: (v: unknown) => void
}) {
  const label = getAdminFieldLabel(field)
  const hint = getAdminFieldHint(field)
  const selectOptions = getAdminSelectOptions(field)

  if (selectOptions) {
    return (
      <SelectField
        label={label}
        value={String(value ?? selectOptions[0]?.value ?? '')}
        onChange={(next) => onChange(next)}
        options={selectOptions}
        hint={hint}
      />
    )
  }

  return (
    <TextField
      label={label}
      value={String(value ?? '')}
      onChange={(next) => onChange(next)}
      hint={hint}
    />
  )
}
