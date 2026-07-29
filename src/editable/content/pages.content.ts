import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Stories, visuals, and discoverable content',
      description: 'Explore curated bookmarks, collections, and useful resources through a calm discovery library.',
      openGraphTitle: 'Curated bookmarks and resource collections',
      openGraphDescription: 'Discover useful links, collections, tools, references, and resource shelves.',
      keywords: ['bookmarks', 'collections', 'resources', 'curated links'],
    },
    hero: {
      badge: 'The Library · Curators',
      title: ['Curated bookmarks for', 'better resource discovery.'],
      description: 'Browse hand-arranged links, practical references, and collection shelves built for people who want useful resources without the noise.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Search resources', href: '/search' },
      searchPlaceholder: 'Search resources, tools, topics, and collections',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for saving, sorting, and rediscovering useful links.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Search resources', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Bring one useful resource into the library.',
      description: 'Share a link, collection idea, or reference shelf that deserves to be easier to find.',
      primaryCta: { label: 'Submit a resource', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the library',
    title: 'A calmer, clearer way to explore useful resources.',
    description: `${slot4BrandConfig.siteName} collects helpful links, references, and resource shelves so discovery feels intentional instead of endless.`,
    paragraphs: [
      'Every public surface is organized around bookmarks, collections, and resources that are easier to scan, revisit, and share.',
      'The goal is simple: help visitors move from curiosity to a useful link faster, with enough context to know why it belongs.',
    ],
    values: [
      {
        title: 'Collection-first browsing',
        description: 'We prioritize clear shelves, useful metadata, and calm scanning so good resources are easier to find.',
      },
      {
        title: 'Practical resource context',
        description: 'Each bookmark should explain what it is, where it points, and why it belongs in the collection.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Send a resource, partnership note, or curation request.',
    description: 'Tell us what you want to add, organize, correct, or sponsor. The form stays simple; the context around it is built for resource discovery.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, topics, categories, and resources across the site.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find bookmarks, collections, and resources faster.',
      description: 'Use keywords and collections to discover saved links from the public library.',
      placeholder: 'Search by keyword, topic, collection, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Add a resource to the library.',
      description: 'Add the title, collection, source link, and notes that help visitors understand why the resource is useful.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the library desk.',
      description: 'Login to submit resources and keep the collection queue tidy.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start curating.',
      description: 'Create an account to submit useful bookmarks and collection notes through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Identity details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
