import Image from 'next/image'
import { GALLERY } from '../brand'
import styles from './GallerySection.module.css'

export default function GallerySection() {
  return (
    <section id="galereya" className={styles.section} aria-label="Галерея школи">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Атмосфера
            <br />
            <em>LEXI</em>
          </h2>
          <p className={styles.lead}>
            Невеликі групи, живе спілкування й тепло — так виглядає навчання у нас.
          </p>
        </header>

        <div className={styles.grid}>
          {GALLERY.map((item) => (
            <figure
              key={item.src}
              className={`${styles.item} ${styles[item.size]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw"
                className={styles.image}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
