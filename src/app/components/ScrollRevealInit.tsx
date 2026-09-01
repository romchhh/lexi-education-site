'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const REVEAL_SELECTOR = '[data-reveal]:not(.is-visible)'

export default function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const seen = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )

    function observe(el: Element) {
      if (seen.has(el)) return
      seen.add(el)
      observer.observe(el)
    }

    function scan(root: ParentNode = document) {
      root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observe(el))
    }

    scan()

    const mutation = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]')) observe(node)
          scan(node)
        })
      })
    })

    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [pathname])

  return null
}
