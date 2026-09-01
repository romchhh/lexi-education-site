import { unstable_cache } from 'next/cache'
import { buildContentBundle, CONTENT_CACHE_TAG } from './store'
import type { SiteContent } from './types'

async function loadSiteContent() {
  return buildContentBundle()
}

export const getSiteContent = unstable_cache(loadSiteContent, ['site-content-bundle'], {
  tags: [CONTENT_CACHE_TAG],
  revalidate: 3600,
})

export async function getSiteContentSync(): Promise<SiteContent> {
  return getSiteContent()
}
