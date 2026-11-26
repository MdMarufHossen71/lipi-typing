export interface NavItem {
  to: string
  /** i18n key for the label */
  key: string
}

// "Learn" dropdown items
export const learnNav: NavItem[] = [
  { to: '/learn-bangla', key: 'nav.learnBangla' },
  { to: '/avro', key: 'nav.avro' },
  { to: '/bijoy', key: 'nav.bijoy' },
  { to: '/bijoy-bayanno', key: 'nav.bijoyBayanno' },
  { to: '/english', key: 'nav.english' },
]

// Top-level items shown inline on desktop
export const topNav: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/keyboard', key: 'nav.keyboard' },
  { to: '/practice', key: 'nav.practice' },
  { to: '/test', key: 'nav.test' },
  { to: '/dashboard', key: 'nav.dashboard' },
  { to: '/history', key: 'nav.history' },
]

// "More" dropdown items
export const moreNav: NavItem[] = [
  { to: '/faq', key: 'nav.faq' },
  { to: '/about', key: 'nav.about' },
  { to: '/references', key: 'nav.references' },
  { to: '/contact', key: 'nav.contact' },
]

// All routes for the mobile drawer (grouped)
export const mobileNavSections: { titleKey: string; items: NavItem[] }[] = [
  { titleKey: 'nav.home', items: [{ to: '/', key: 'nav.home' }] },
  { titleKey: 'nav.learnBangla', items: learnNav },
  { titleKey: 'nav.practice', items: [{ to: '/keyboard', key: 'nav.keyboard' }, { to: '/practice', key: 'nav.practice' }, { to: '/test', key: 'nav.test' }] },
  { titleKey: 'nav.dashboard', items: [{ to: '/dashboard', key: 'nav.dashboard' }, { to: '/history', key: 'nav.history' }] },
  { titleKey: 'nav.about', items: moreNav },
]
