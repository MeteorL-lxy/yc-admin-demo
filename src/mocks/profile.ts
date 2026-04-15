import type { CreatorProfile, WorkItem } from '@/types/profile';

export const creatorProfileMock: CreatorProfile = {
  id: 'YC-2026-0428',
  nickname: 'Luna Archive',
  signature: '在霓虹与深夜之间写连载，把每一章都做成会上瘾的悬念。',
  email: 'luna@yourchannel.app',
  phone: '+86 138 0013 8000',
  inviteCode: 'NOVEL88',
  background:
    'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  squareAvatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  circleAvatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  stats: [
    { label: 'Novel', value: '12 部' },
    { label: 'Followers', value: '28.6K' },
    { label: '收藏', value: '8.2K' }
  ]
};