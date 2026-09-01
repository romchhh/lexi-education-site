'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import { lockBodyScroll, unlockBodyScroll } from '@/lib/scroll-lock'
import styles from './GallerySection.module.css'

type Props = {
  content?: GalleryContent
}

export default function GallerySection({ content = getDefaultContent().gallery }: Props) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const flexGalleryRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const activeIndexRef = useRef(activeIndex)

  activeIndexRef.current = activeIndex

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const closeLightbox = useCallback(() => setOpen(false), [])

  const scrollToSlide = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    slideRefs.current[index]?.scrollIntoView({ behavior, block: 'nearest', inline: 'center' })
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(content.items.length - 1, index))
      setActiveIndex(next)
      scrollToSlide(next)
    },
    [content.items.length, scrollToSlide],
  )

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goTo(activeIndexRef.current + 1)
      if (e.key === 'ArrowLeft') goTo(activeIndexRef.current - 1)
    }

    lockBodyScroll()

    window.addEventListener('keydown', onKey)

    return () => {
      unlockBodyScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeLightbox, goTo])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => scrollToSlide(activeIndexRef.current, 'instant'))
  }, [open, scrollToSlide])

  useEffect(() => {
    const node = flexGalleryRef.current
    if (!open || !node) return

    const onScroll = () => {
      const center = node.scrollLeft + node.clientWidth / 2
      let closest = activeIndexRef.current
      let minDistance = Number.POSITIVE_INFINITY

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
        const distance = Math.abs(slideCenter - center)
        if (distance < minDistance) {
          minDistance = distance
          closest = index
        }
      })

      if (closest !== activeIndexRef.current) {
        setActiveIndex(closest)
      }
    }

    node.addEventListener('scroll', onScroll, { passive: true })
    return () => node.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <>
      <section id="galereya" className={styles.section} aria-label="Галерея школи">
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.inner}>
          <header className={`${styles.header} reveal-heading`} data-reveal>
            <h2 className={styles.heading}>
              {content.heading.line1}
              <br />
              <em>{content.heading.line2Em}</em>
            </h2>
            <p className={styles.lead}>{content.lead}</p>
          </header>

          <div className={styles.grid}>
            {content.items.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={`${styles.item} ${styles[item.size]}`}
                data-reveal="scale"
                style={{ ['--reveal-delay' as string]: `${index * 60}ms` }}
                onClick={() => openLightbox(index)}
                aria-label={`Відкрити фото: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading={index === 0 ? undefined : 'lazy'}
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
              <div>
                <p className={styles.lightboxTitle}>
                  {content.lightboxLine1} <em>{content.lightboxEm}</em>
                </p>
                <p className={styles.lightboxCounter}>
                  {activeIndex + 1} / {content.items.length}
                </p>
              </div>
              <button type="button" className={styles.close} onClick={closeLightbox} aria-label="Закрити">
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4 L24 24 M24 4 L4 24" />
                </svg>
              </button>
            </div>

            <div className={styles.flexWrap}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Попереднє фото"
                disabled={activeIndex <= 0}
                onClick={() => goTo(activeIndex - 1)}
              >
                ←
              </button>

              <div ref={flexGalleryRef} className={styles.flexGallery}>
                {content.items.map((item, index) => (
                  <figure
                    key={item.src}
                    ref={(el) => {
                      slideRefs.current[index] = el
                    }}
                    className={`${styles.flexItem} ${index === activeIndex ? styles.flexItemActive : ''}`}
                    onClick={() => goTo(index)}
                  >
                    <div className={styles.flexFrame}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 560px) 88vw, 480px"
                        className={styles.flexImage}
                        priority={index === activeIndex}
                      />
                    </div>
                    <figcaption>{item.alt}</figcaption>
                  </figure>
                ))}
              </div>

              <button
                type="button"
                className={styles.navBtn}
                aria-label="Наступне фото"
                disabled={activeIndex >= content.items.length - 1}
                onClick={() => goTo(activeIndex + 1)}
              >
                →
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Фото галереї">
              {content.items.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Фото ${index + 1}: ${item.alt}`}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
