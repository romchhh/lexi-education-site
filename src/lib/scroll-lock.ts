let lockCount = 0
let savedScrollY = 0

export function lockBodyScroll(): void {
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    const html = document.documentElement
    const body = document.body

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${savedScrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
  }

  lockCount += 1
}

export function unlockBodyScroll(): void {
  if (lockCount === 0) return

  lockCount -= 1
  if (lockCount > 0) return

  const html = document.documentElement
  const body = document.body
  const scrollY = savedScrollY

  html.style.overflow = ''
  body.style.overflow = ''
  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.right = ''
  body.style.width = ''

  html.style.scrollBehavior = 'auto'
  window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
  html.style.scrollBehavior = ''
}
