import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
}

/** Lightweight SEO: sets document.title, the meta description and a route
 * canonical URL at runtime (SPA — no prerendering). */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
    // Per-route canonical so each page is its own URL for crawlers.
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`
  }, [title, description])
  return null
}
