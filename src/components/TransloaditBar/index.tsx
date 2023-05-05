import ukraineFlag from '@/assets/ua-flag.svg'
import styles from './style.module.css'
import Container from '../Container'

export default function TransloaditBar() {
  return (
    <aside class={styles.root}>
      <Container className={styles.container}>
        <p class={styles.text}>
          <img
            class={styles.flag}
            src={ukraineFlag.src}
            alt="Flag of Ukraine"
            width={24}
            height={16}
          />
          We stand with the brave people of Ukraine. Stop the war. Find out{' '}
          <a
            href="https://transloadit.com/blog/2022/02/ukraine"
            target="_blank"
            rel="noopener noreferrer"
            class={styles.link}
          >
            how you can help
          </a>
          .
        </p>
      </Container>
    </aside>
  )
}
