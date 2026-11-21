import styles from './ProtocolSelect.module.css'

interface ProtocolSelectProps {
  versions: string[]
  currentVersion: string
  selectedVersion: string
}

export function ProtocolSelect(props: ProtocolSelectProps) {
  const { versions, currentVersion, selectedVersion } = props

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
        {versions.map((version) => (
          <option
            key={version}
            value={version}
            selected={version === selectedVersion}
          >
            {version}
          </option>
        ))}
      </select>
    </label>
  )
}
