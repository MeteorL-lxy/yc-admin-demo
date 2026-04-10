import type { WorkFilter } from '@/types/profile';

export const PROFILE_FILTER_OPTIONS: Array<{ key: WorkFilter; label: string }> = [
  { key: 'all', label: '全部作品' },
  { key: 'published', label: '已发布' },
  { key: 'draft', label: '草稿箱' }
];
