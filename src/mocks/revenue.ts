import type { RevenueDetailRow, RevenueFilters, RevenueRecord } from '@/types/revenue';

export const defaultRevenueFilters: RevenueFilters = {
  startDate: '2026-03-10',
  endDate: '2026-04-09',
  audienceType: 'all',
  keyword: '',
  workType: 'all'
};

export const revenueRecordsMock: RevenueRecord[] = [
  { id: 'rev-1', date: '2026-04-09', workId: 'work-1', workName: 'Midnight Archive', workType: 'novel', audienceType: 'follower', amount: 1260, paidUsers: 88, freeUsers: 301, orderCount: 112 },
  { id: 'rev-2', date: '2026-04-08', workId: 'work-2', workName: 'Eclipse Theater', workType: 'drama', audienceType: 'non_follower', amount: 820, paidUsers: 57, freeUsers: 266, orderCount: 73 },
  { id: 'rev-3', date: '2026-04-07', workId: 'work-4', workName: 'Glass Train 2049', workType: 'novel', audienceType: 'follower', amount: 980, paidUsers: 62, freeUsers: 214, orderCount: 84 },
  { id: 'rev-4', date: '2026-04-06', workId: 'work-1', workName: 'Midnight Archive', workType: 'novel', audienceType: 'non_follower', amount: 1160, paidUsers: 72, freeUsers: 288, orderCount: 93 },
  { id: 'rev-5', date: '2026-04-05', workId: 'work-2', workName: 'Eclipse Theater', workType: 'drama', audienceType: 'follower', amount: 760, paidUsers: 51, freeUsers: 198, orderCount: 68 },
  { id: 'rev-6', date: '2026-04-04', workId: 'work-4', workName: 'Glass Train 2049', workType: 'novel', audienceType: 'non_follower', amount: 690, paidUsers: 45, freeUsers: 176, orderCount: 57 },
  { id: 'rev-7', date: '2026-04-03', workId: 'work-1', workName: 'Midnight Archive', workType: 'novel', audienceType: 'follower', amount: 1340, paidUsers: 91, freeUsers: 324, orderCount: 118 },
  { id: 'rev-8', date: '2026-04-02', workId: 'work-2', workName: 'Eclipse Theater', workType: 'drama', audienceType: 'non_follower', amount: 710, paidUsers: 44, freeUsers: 187, orderCount: 61 },
  { id: 'rev-9', date: '2026-04-01', workId: 'work-4', workName: 'Glass Train 2049', workType: 'novel', audienceType: 'follower', amount: 930, paidUsers: 58, freeUsers: 203, orderCount: 80 },
  { id: 'rev-10', date: '2026-03-31', workId: 'work-1', workName: 'Midnight Archive', workType: 'novel', audienceType: 'non_follower', amount: 1090, paidUsers: 68, freeUsers: 271, orderCount: 87 },
  { id: 'rev-11', date: '2026-03-28', workId: 'work-2', workName: 'Eclipse Theater', workType: 'drama', audienceType: 'follower', amount: 680, paidUsers: 39, freeUsers: 163, orderCount: 54 },
  { id: 'rev-12', date: '2026-03-24', workId: 'work-4', workName: 'Glass Train 2049', workType: 'novel', audienceType: 'non_follower', amount: 540, paidUsers: 32, freeUsers: 140, orderCount: 43 }
];

export const revenueDetailRowsMock: RevenueDetailRow[] = revenueRecordsMock.map((record) => ({
  id: record.id,
  date: record.date,
  workName: record.workName,
  workType: record.workType === 'novel' ? 'Novel' : 'Drama',
  audienceType: record.audienceType === 'follower' ? 'Follower' : 'Non-follower',
  amount: `$${record.amount.toLocaleString('en-US')}`,
  paidUsers: record.paidUsers,
  freeUsers: record.freeUsers,
  orderCount: record.orderCount
}));
