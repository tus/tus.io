import type { HTMLAttributes } from 'preact/compat'

export function ExternalA(props: HTMLAttributes<HTMLAnchorElement>) {
  const { href, children, className } = props
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
