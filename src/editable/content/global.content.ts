import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated resource library',
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse collections', href: '/sbm' },
      secondary: { label: 'Submit resource', href: '/create' },
    },
  },
  footer: {
    tagline: 'Curated bookmarks and resource shelves',
    description: 'A calm public library for saved links, collection shelves, and useful references.',
    columns: [
      {
        title: 'Collections',
        links: [
          { label: 'Design', href: '/sbm?category=design' },
          { label: 'Marketing', href: '/sbm?category=marketing' },
          { label: 'Development', href: '/sbm?category=development' },
          { label: 'Research', href: '/sbm?category=research' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean resource discovery.',
  },
  commonLabels: {
    readMore: 'Open resource',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

export const uiHiddenTaskKeys = ['profile'] as const

export const isUiHiddenTask = (key: string) => (uiHiddenTaskKeys as readonly string[]).includes(key)
