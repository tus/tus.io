import tusWordmark from '@/assets/wordmark.png'
import tusLogo from '@/assets/logo.png'
import { computed, signal } from '@preact/signals'
import styles from './style.module.css'
import { useEffect, useRef } from 'preact/hooks'
import cx from 'clsx'
import VisuallyHidden from '../VisuallyHidden'

const expanded = signal(false)
const hidden = computed(() => !expanded.value)

type NavigationProps = {
  currentPage: string
}

export default function Navigation(props: NavigationProps) {
  const { currentPage } = props

  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      expanded.value = document.body.clientWidth > 768
    })

    observer.observe(document.body)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!nav.current) return

    const onClickOutside = (event: MouseEvent) => {
      if (!event.target) return
      const node = event.target as Node
      if (!nav.current?.contains(node)) {
        expanded.value = false
      }
    }

    document.addEventListener('click', onClickOutside)

    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [])

  return (
    <header class={styles.root}>
      <div>
        <a href="/" class={styles.home}>
          {currentPage !== '/' && (
            <img
              src={tusLogo.src}
              width={tusLogo.width}
              height={tusLogo.height}
              alt=""
            />
          )}
          <img
            class={styles.wordmark}
            src={tusWordmark.src}
            width={tusWordmark.width}
            height={tusWordmark.height}
            alt="tus"
          />
        </a>
        <nav ref={nav}>
          <button
            class={styles.toggle}
            onClick={(e) => {
              expanded.value = !expanded.value
              e?.stopPropagation()
            }}
            aria-expanded={expanded}
          >
            {expanded.value ? (
              <CrossIcon size={24} />
            ) : (
              <HamburgerMenuIcon size={24} />
            )}
          </button>
          <ul class={styles.items} hidden={hidden}>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage === '/faq',
                })}
                href="/faq"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage === '/support',
                })}
                href="/support"
              >
                Support
              </a>
            </li>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage.startsWith('/blog'),
                })}
                href="/blog"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage === '/demo',
                })}
                href="/demo"
              >
                Demo
              </a>
            </li>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage.startsWith('/protocols'),
                })}
                href="/protocols/resumable-upload"
              >
                Protocol
              </a>
            </li>
            <li>
              <a
                class={cx(styles.link, {
                  [styles.activeLink]: currentPage === '/implementations',
                })}
                href="/implementations"
              >
                Implementations
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tus"
                class={cx(styles.link, styles.githubLink)}
              >
                <GithubIcon size={20} /> <span>GitHub</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

type IconProps = {
  size?: number
}

function HamburgerMenuIcon(props: IconProps) {
  const { size = 15 } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function CrossIcon(props: IconProps) {
  const { size = 15 } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function GithubIcon(props: IconProps) {
  const { size = 15 } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  )
}
