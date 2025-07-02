import type { AnchorHTMLAttributes } from 'preact/compat'

export function ExternalA(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
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
