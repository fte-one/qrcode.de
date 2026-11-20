import type { Guide } from './types'
import { coreGuides } from './core'
import { moreGuides } from './more'

export type { Guide, GuideSection } from './types'

export const guides: Guide[] = [...coreGuides, ...moreGuides]

export const guideBySlug = (slug: string): Guide | undefined => guides.find((g) => g.slug === slug)
