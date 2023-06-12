import type { CollectionEntry } from 'astro:content'
import styles from './ProtocolSelect.module.css'

type ProtocolSelectProps = {
  protocols: CollectionEntry<'protocols'>[]
  currentVersion: string
  selectedVersion: string
}

export function ProtocolSelect(props: ProtocolSelectProps) {
  const { protocols, currentVersion, selectedVersion } = props

  return (
    <label class={styles.label}>
      Version{' '}
      <select
        class={styles.select}
        onChange={(event) => {
          if (!event.target) return
          if (!(event.target instanceof HTMLSelectElement)) return

          if (event.target.value === currentVersion) {
            window.location.href = `/protocols/resumable-upload`
            return
          }

          const version = event.target.value
          const slug = version.replaceAll('.', '-')

          window.location.href = `/protocols/resumable-upload/${slug}`
        }}
      >
        {protocols.map((option) => (
          <option
            key={option.id}
            value={option.data.version}
            selected={option.data.version === selectedVersion}
          >
            {option.data.version}
          </option>
        ))}
      </select>
    </label>
  )
}
