import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
}

/** Lightweight SEO: sets document.title and the meta description at runtime. */
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
  }, [title, description])
  return null
}
