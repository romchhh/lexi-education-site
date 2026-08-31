'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { GALLERY } from '../brand'
import styles from './GallerySection.module.css'

export default function GallerySection() {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const closeLightbox = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }

    const scrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    window.addEventListener('keydown', onKey)

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeLightbox])

  return (
    <>
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
            {GALLERY.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={`${styles.item} ${styles[item.size]}`}
                onClick={() => openLightbox(index)}
                aria-label={`Відкрити фото: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw"
                  className={styles.image}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Галерея LEXI">
          <button type="button" className={styles.backdrop} aria-label="Закрити" onClick={closeLightbox} />
          <div className={styles.lightboxPanel}>
            <div className={styles.lightboxHead}>
              <p className={styles.lightboxTitle}>
                Атмосфера <em>LEXI</em>
              </p>
              <button type="button" className={styles.close} onClick={closeLightbox} aria-label="Закрити">
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4 L24 24 M24 4 L4 24" />
                </svg>
              </button>
            </div>

            <div className={styles.flexGallery}>
              {GALLERY.map((item, index) => (
                <figure
                  key={item.src}
                  className={`${styles.flexItem} ${index === activeIndex ? styles.flexItemActive : ''}`}
                >
                  <div className={styles.flexFrame}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 560px) 100vw, 420px"
                      className={styles.flexImage}
                    />
                  </div>
                  <figcaption>{item.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
