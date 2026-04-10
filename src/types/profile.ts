export type WorkStatus = 'published' | 'draft';
export type WorkCategory = 'novel' | 'drama';
export type WorkFilter = 'all' | WorkStatus;

export interface CreatorStats {
  label: string;
  value: string;
}

export interface CreatorProfile {
  id: string;
  nickname: string;
  signature: string;
  email: string;
  phone?: string;
  inviteCode?: string;
  background: string;
  avatar: string;
  squareAvatar: string;
  circleAvatar: string;
  stats: CreatorStats[];
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  status: WorkStatus;
  cover: string;
  episodes: number;
  words?: number;
  views: string;
  collects: string;
  score?: number;
  badge: string;
}

export interface ProfileDraft {
  nickname: string;
  signature: string;
  background: string;
  avatar: string;
  squareAvatar: string;
  circleAvatar: string;
}
