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

export const workListMock: WorkItem[] = [
  {
    id: 'work-1',
    title: '午夜档案室',
    description: '都市悬疑长篇，围绕一间只在凌晨营业的档案室展开。',
    category: 'novel',
    status: 'published',
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    episodes: 128,
    words: 486000,
    views: '1.2M',
    collects: '83K',
    score: 9.4,
    badge: '悬疑'
  },
  {
    id: 'work-2',
    title: '月蚀剧场',
    description: '短剧企划，赛博歌剧与贵族阴谋交织的舞台世界。',
    category: 'drama',
    status: 'published',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
    episodes: 24,
    views: '842K',
    collects: '31K',
    score: 8.9,
    badge: '短剧'
  },
  {
    id: 'work-3',
    title: '雪港来信',
    description: '情绪流现代言情，慢热但高黏性，读者留存优秀。',
    category: 'novel',
    status: 'draft',
    cover:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80',
    episodes: 36,
    words: 92000,
    views: '18K',
    collects: '2.7K',
    badge: '言情'
  },
  {
    id: 'work-4',
    title: '玻璃列车 2049',
    description: '近未来公路题材，冷调视觉和快节奏章节并行推进。',
    category: 'novel',
    status: 'published',
    cover:
      'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=700&q=80',
    episodes: 87,
    words: 301000,
    views: '563K',
    collects: '19K',
    score: 9.1,
    badge: '科幻'
  },
  {
    id: 'work-5',
    title: '紫幕之下',
    description: '偏舞台美学的短剧栏目，适合用来承接会员转化。',
    category: 'drama',
    status: 'draft',
    cover:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=700&q=80',
    episodes: 8,
    views: '6.4K',
    collects: '698',
    badge: '实验'
  },
  {
    id: 'work-6',
    title: '北纬十三度',
    description: '海岛冒险群像，主打世界观和角色关系推动。',
    category: 'novel',
    status: 'published',
    cover:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80',
    episodes: 64,
    words: 208000,
    views: '317K',
    collects: '12K',
    score: 8.7,
    badge: '冒险'
  }
];
