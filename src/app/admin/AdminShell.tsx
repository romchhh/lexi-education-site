'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BRAND } from '@/app/brand'
import shell from './admin.module.css'

const NAV = [
  { href: '/admin', label: 'Дашборд', icon: 'dashboard' },
  { href: '/admin/applications', label: 'Заявки', icon: 'inbox' },
  { href: '/admin/content', label: 'Контент', icon: 'edit' },
] as const

function NavIcon({ name }: { name: (typeof NAV)[number]['icon'] }) {
  if (name === 'dashboard') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  if (name === 'inbox') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 9l4.2 3.15a2 2 0 002.3 0L14 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16M7 17V7m5 10V4m5 13V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const activeNav = NAV.find((item) =>
    item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href),
  )

  const breadcrumbs = buildBreadcrumbs(pathname)

  return (
    <div className={shell.adminRoot}>
      {open ? (
        <button
          type="button"
          className={shell.overlay}
          aria-label="Закрити меню"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className={shell.shell}>
        <aside className={`${shell.sidebar} ${open ? shell.sidebarOpen : ''}`}>
          <div className={shell.brand}>
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={84}
              height={84}
              className={shell.brandLogo}
            />
            <div className={shell.brandText}>
              <strong>LEXI Admin</strong>
              <span>Панель керування</span>
            </div>
          </div>

          <nav className={shell.nav} aria-label="Адмін навігація">
            {NAV.map((item) => {
              const active =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${shell.navLink} ${active ? shell.navLinkActive : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className={shell.navIcon}>
                    <NavIcon name={item.icon} />
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className={shell.sidebarFooter}>
            <Link href="/" className={shell.siteLink} target="_blank" rel="noreferrer">
              <span>Відкрити сайт</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>
            <button type="button" className={shell.logoutBtn} onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Вийти
            </button>
          </div>
        </aside>

        <div className={shell.main}>
          <header className={shell.topbar}>
            <button
              type="button"
              className={shell.menuBtn}
              aria-label="Меню"
              onClick={() => setOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <div className={shell.topbarMeta}>
              <div className={shell.topbarTitle}>{activeNav?.label ?? 'LEXI Admin'}</div>
              {breadcrumbs.length > 1 ? (
                <nav className={shell.breadcrumbs} aria-label="Breadcrumb">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.href}>
                      {index > 0 ? <span className={shell.crumbSep}>/</span> : null}
                      {index === breadcrumbs.length - 1 ? (
                        <span>{crumb.label}</span>
                      ) : (
                        <Link href={crumb.href}>{crumb.label}</Link>
                      )}
                    </span>
                  ))}
                </nav>
              ) : null}
            </div>
          </header>
          <div className={shell.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}

function buildBreadcrumbs(pathname: string): Array<{ href: string; label: string }> {
  if (pathname === '/admin') return [{ href: '/admin', label: 'Дашборд' }]
  if (pathname === '/admin/applications') {
    return [
      { href: '/admin', label: 'Дашборд' },
      { href: '/admin/applications', label: 'Заявки' },
    ]
  }
  if (pathname === '/admin/content') {
    return [
      { href: '/admin', label: 'Дашборд' },
      { href: '/admin/content', label: 'Контент' },
    ]
  }
  if (pathname.startsWith('/admin/content/')) {
    const section = pathname.split('/').pop() ?? ''
    return [
      { href: '/admin', label: 'Дашборд' },
      { href: '/admin/content', label: 'Контент' },
      { href: pathname, label: section },
    ]
  }
  return [{ href: '/admin', label: 'Дашборд' }]
}
