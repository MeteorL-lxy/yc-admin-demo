import type { WorkFilter } from '@/types/profile';

export const PROFILE_FILTER_OPTIONS: Array<{ key: WorkFilter; labelKey: string }> = [
  { key: 'all', labelKey: 'profile.works.filters.all' },
  { key: 'published', labelKey: 'profile.works.filters.published' },
  { key: 'draft', labelKey: 'profile.works.filters.draft' }
];
