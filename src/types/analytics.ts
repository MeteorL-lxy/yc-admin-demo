export type AnalyticsRange = '7d' | '28d' | '90d';
export type AnalyticsTab = 'overview' | 'audience';

export interface AnalyticsOption {
  label: string;
  value: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  helper: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
}

export interface TrendPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface DonutChartItem {
  label: string;
  value: number;
  amount: string;
  color: string;
}

export interface AudienceHeatCell {
  day: string;
  hour: string;
  value: number;
}

export interface ReadingActivity {
  id: string;
  workId: string;
  workName: string;
  reader: string;
  chapter: string;
  duration: string;
  happenedAt: string;
}

export interface AudienceMetric {
  label: string;
  value: string;
  note: string;
}

export interface AnalyticsInsight {
  title: string;
  summary: string;
  tags: string[];
  diagnosis: string[];
  nextAction: string;
}

export interface AnalyticsDashboard {
  workOptions: AnalyticsOption[];
  metrics: AnalyticsMetric[];
  siteTraffic: TrendPoint[];
  workContribution: DonutChartItem[];
  audienceHeatmap: AudienceHeatCell[];
  fanLoyalty: DonutChartItem[];
  recentActivity: ReadingActivity[];
  audienceMetrics: AudienceMetric[];
  suggestions: string[];
  insight: AnalyticsInsight;
}
