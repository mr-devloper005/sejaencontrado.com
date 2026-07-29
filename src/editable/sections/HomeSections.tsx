import Link from 'next/link'
import { ArrowRight, Bookmark, Check, ExternalLink, Globe2, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { isUiHiddenTask } from '@/editable/content/global.content'
import { getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const collections = CATEGORY_OPTIONS.slice(0, 8)

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function domainOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = [content.website, content.url, content.link].find((value) => typeof value === 'string' && value) as string | undefined
  if (!raw) return 'Resource'
  try {
    return new URL(raw.startsWith('http') ? raw : `https://${raw}`).hostname.replace(/^www\./, '')
  } catch {
    return raw.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || 'Resource'
  }
}

function ResourceCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  return (
    <Link href={href} className="group flex min-h-[260px] flex-col rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-[0_28px_70px_rgba(43,51,46,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
          <Bookmark className="h-5 w-5" />
        </span>
        <span className="font-[var(--editable-font-number)] text-3xl text-[var(--slot4-accent)]/35">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{category}</p>
      <h3 className="editable-display mt-3 line-clamp-2 text-3xl font-medium leading-[1.1] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-[var(--slot4-accent)]">
        {domainOf(post)} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool.slice(0, 4)
  const heroTitle = pagesContent.home.hero.title.join(' ')

  return (
    <section className="overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`${container} grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24`}>
        <EditableReveal>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
          <h1 className="editable-display mt-5 max-w-4xl text-balance text-5xl font-medium leading-[1.05] sm:text-7xl lg:text-[5.625rem]">{heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5">
              {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
              <Search className="h-4 w-4" /> {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
        </EditableReveal>

        <EditableReveal index={1} className="relative">
          <div className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-5 text-white shadow-[0_35px_90px_rgba(43,51,46,0.18)]">
            <div className="grid gap-3">
              {featured.length ? featured.map((post) => (
                <Link key={post.id || post.slug} href={postHref('sbm', post, primaryRoute)} className="group grid gap-4 rounded-[var(--editable-radius)] border border-white/10 bg-white/[0.06] p-4 transition duration-500 hover:bg-white/[0.1] sm:grid-cols-[56px_minmax(0,1fr)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--slot4-accent)]">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">{domainOf(post)}</span>
                    <span className="editable-display mt-1 block line-clamp-2 text-2xl leading-tight">{post.title}</span>
                  </span>
                </Link>
              )) : (
                <div className="rounded-[var(--editable-radius)] border border-white/10 bg-white/[0.06] p-8 text-center text-white/70">Resources will appear here as the library grows.</div>
              )}
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <EditableReveal className={`${container} overflow-hidden py-8`}>
        <div className="flex min-w-max animate-[marquee_26s_linear_infinite] items-center gap-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
          {[...collections, ...collections].map((collection, index) => (
            <Link key={`${collection.slug}-${index}`} href={`${primaryRoute}?category=${encodeURIComponent(collection.slug)}`} className="inline-flex items-center gap-3 rounded-full border border-[var(--editable-border)] px-5 py-2 transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              <Sparkles className="h-4 w-4" /> {collection.name}
            </Link>
          ))}
        </div>
      </EditableReveal>
    </section>
  )
}

export function EditableMagazineSplit({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 6)
  const features = [
    'Collection shelves keep related links close together.',
    'Domain chips make every destination easier to trust before opening.',
    'Resource notes explain why a bookmark belongs in the library.',
  ]

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-[var(--editable-section-y)]`}>
        <EditableReveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Why this library works</p>
            <h2 className="editable-display mt-4 text-4xl font-medium leading-[1.14] sm:text-5xl lg:text-[3.625rem]">A quieter way to decide what is worth opening.</h2>
          </div>
          <div className="grid gap-5">
            {features.map((feature, index) => (
              <EditableReveal key={feature} index={index} className="flex gap-4 border-t border-[var(--editable-border)] pt-5">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white"><Check className="h-4 w-4" /></span>
                <p className="text-lg leading-8 text-[var(--slot4-muted-text)]">{feature}</p>
              </EditableReveal>
            ))}
          </div>
        </EditableReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activity.map((post, index) => (
            <EditableReveal key={post.id || post.slug} index={index}>
              <ResourceCard post={post} href={postHref('sbm', post, primaryRoute)} index={index} />
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  const publicTasks = SITE_CONFIG.tasks.filter((task) => task.enabled && !isUiHiddenTask(task.key))

  return (
    <>
      <section className="bg-[var(--slot4-warm)]">
        <div className={`${container} py-[var(--editable-section-y)]`}>
          <EditableReveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Collections</p>
              <h2 className="editable-display mt-4 text-4xl font-medium leading-[1.14] sm:text-5xl">Browse by shelf.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link key={collection.slug} href={`${primaryRoute}?category=${encodeURIComponent(collection.slug)}`} className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Collection</span>
                  <span className="editable-display mt-2 block text-3xl font-medium">{collection.name}</span>
                </Link>
              ))}
            </div>
          </EditableReveal>
        </div>
      </section>

      {visible.map((section, sectionIndex) => (
        <section key={section.key} className={sectionIndex % 2 === 0 ? 'bg-[var(--slot4-page-bg)]' : 'bg-[var(--slot4-surface-bg)]'}>
          <div className={`${container} py-16 sm:py-20`}>
            <EditableReveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--slot4-accent)]">Live shelf</p>
                <h2 className="editable-display mt-3 text-4xl font-medium leading-tight">{section.key === 'spotlight' ? 'Freshly saved resources' : section.key === 'browse' ? 'Useful this month' : 'Evergreen references'}</h2>
              </div>
              <Link href={section.href || primaryRoute} className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--slot4-accent)] sm:inline-flex">
                View shelf <ArrowRight className="h-4 w-4" />
              </Link>
            </EditableReveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {section.posts.slice(0, 8).map((post, index) => (
                <EditableReveal key={post.id || post.slug} index={index}>
                  <ResourceCard post={post} href={postHref('sbm', post, primaryRoute)} index={index} />
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[var(--slot4-dark-bg)] text-white">
        <EditableReveal className={`${container} grid gap-6 py-16 text-center sm:grid-cols-3 sm:text-left`}>
          <div><span className="font-[var(--editable-font-number)] text-5xl">{posts.length}</span><p className="mt-2 text-sm text-white/65">resources in the current feed</p></div>
          <div><span className="font-[var(--editable-font-number)] text-5xl">{collections.length}</span><p className="mt-2 text-sm text-white/65">starter collection shelves</p></div>
          <div><span className="font-[var(--editable-font-number)] text-5xl">{publicTasks.length}</span><p className="mt-2 text-sm text-white/65">public discovery lane</p></div>
        </EditableReveal>
      </section>

      <section className="bg-[var(--slot4-page-bg)]">
        <div className={`${container} py-[var(--editable-section-y)]`}>
          <EditableReveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--slot4-accent)]">FAQ</p>
            <h2 className="editable-display mt-4 text-4xl font-medium leading-tight sm:text-5xl">How the library is organized.</h2>
          </EditableReveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3">
            {[
              ['What belongs here?', 'Useful links, references, tools, guides, and collection ideas that help visitors get somewhere worthwhile.'],
              ['How are resources grouped?', 'Each bookmark can carry a collection, tags, a domain, and notes so it can sit naturally beside related finds.'],
              ['Can I suggest a link?', 'Yes. Use the create page after login, or contact the team with the resource and context.'],
            ].map(([question, answer], index) => (
              <EditableReveal key={question} index={index}>
                <details className="group rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                    {question}<span className="text-[var(--slot4-accent)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{answer}</p>
                </details>
              </EditableReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-accent)] text-white">
      <EditableReveal className={`${container} flex flex-col items-center gap-6 py-16 text-center sm:py-20`}>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/65">{pagesContent.home.cta.badge}</p>
        <h2 className="editable-display max-w-3xl text-4xl font-medium leading-tight sm:text-5xl">{pagesContent.home.cta.title}</h2>
        <p className="max-w-xl text-base leading-8 text-white/78">{pagesContent.home.cta.description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--slot4-accent)] transition hover:-translate-y-0.5">
            {pagesContent.home.cta.primaryCta.label} <ExternalLink className="h-4 w-4" />
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </EditableReveal>
    </section>
  )
}
