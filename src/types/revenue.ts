import type { DonutChartItem, TrendPoint } from './analytics';

export type RevenueAudienceType = 'all' | 'follower' | 'non_follower';
export type RevenueWorkType = 'all' | 'novel' | 'drama';

export interface RevenueFilters {
  startDate: string;
  endDate: string;
  audienceType: RevenueAudienceType;
  keyword: string;
  workType: RevenueWorkType;
}

export interface RevenueSummaryCard {
  label: string;
  value: string;
  note: string;
  accent: string;
}

export interface RevenueRecord {
  id: string;
  date: string;
  workId: string;
  workName: string;
  workType: Exclude<RevenueWorkType, 'all'>;
  audienceType: Exclude<RevenueAudienceType, 'all'>;
  amount: number;
  paidUsers: number;
  freeUsers: number;
  orderCount: number;
}

export interface RevenueDetailRow {
  id: string;
  date: string;
  workName: string;
  workType: string;
  audienceType: string;
  amount: string;
  paidUsers: number;
  freeUsers: number;
  orderCount: number;
}

export interface RevenueDashboard {
  lastUpdated: string;
  summary: RevenueSummaryCard[];
  paymentAmountTrend: TrendPoint[];
  payingUsersTrend: TrendPoint[];
  breakdown: DonutChartItem[];
  detailRows: RevenueDetailRow[];
}
