import { translate } from '@/composables/useLocale';
import type { AnalyticsDashboard, AnalyticsRange, AudienceHeatCell, ReadingActivity, TrendPoint } from '@/types/analytics';

const workOptions = [
  { label: translate('service.analytics.allWorks'), value: 'all' },
  { label: 'Midnight Archive', value: 'work-1' },
  { label: 'Eclipse Theater', value: 'work-2' },
  { label: 'Glass Train 2049', value: 'work-4' }
];

const trafficByRange: Record<AnalyticsRange, TrendPoint[]> = {
  '7d': [
    { label: 'Mon', value: 42, secondaryValue: 18 },
    { label: 'Tue', value: 58, secondaryValue: 24 },
    { label: 'Wed', value: 67, secondaryValue: 31 },
    { label: 'Thu', value: 61, secondaryValue: 29 },
    { label: 'Fri', value: 72, secondaryValue: 34 },
    { label: 'Sat', value: 89, secondaryValue: 43 },
    { label: 'Sun', value: 96, secondaryValue: 47 }
  ],
  '28d': [
    { label: 'W1', value: 196, secondaryValue: 84 },
    { label: 'W2', value: 218, secondaryValue: 96 },
    { label: 'W3', value: 264, secondaryValue: 118 },
    { label: 'W4', value: 281, secondaryValue: 126 }
  ],
  '90d': [
    { label: 'Jan', value: 620, secondaryValue: 278 },
    { label: 'Feb', value: 708, secondaryValue: 324 },
    { label: 'Mar', value: 786, secondaryValue: 372 }
  ]
};

const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const heatmapHours = ['00', '04', '08', '12', '16', '20'];

const heatmapBase = [14, 22, 31, 55, 72, 80];

const buildHeatmap = (factor: number): AudienceHeatCell[] =>
  heatmapDays.flatMap((day, dayIndex) =>
    heatmapHours.map((hour, hourIndex) => ({
      day,
      hour,
      value: Math.min(100, heatmapBase[hourIndex] + dayIndex * 4 + factor)
    }))
  );

const baseActivities: ReadingActivity[] = [
  {
    id: 'activity-1',
    workId: 'work-1',
    workName: 'Midnight Archive',
    reader: 'Sofia H.',
    chapter: 'Chapter 128: The Hidden Cabinet',
    duration: '18 min',
    happenedAt: '5 minutes ago'
  },
  {
    id: 'activity-2',
    workId: 'work-4',
    workName: 'Glass Train 2049',
    reader: 'Elena W.',
    chapter: 'Episode 87: Last Platform',
    duration: '11 min',
    happenedAt: '21 minutes ago'
  },
  {
    id: 'activity-3',
    workId: 'work-2',
    workName: 'Eclipse Theater',
    reader: 'Noah K.',
    chapter: 'Scene 24: Curtain Call',
    duration: '9 min',
    happenedAt: '42 minutes ago'
  }
];

const rangeMultipliers: Record<AnalyticsRange, number> = {
  '7d': 1,
  '28d': 3.6,
  '90d': 10.8
};

const workShare: Record<string, number> = {
  all: 1,
  'work-1': 0.46,
  'work-2': 0.31,
  'work-4': 0.23
};

const formatCount = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return `${Math.round(value)}`;
};

const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export function createAnalyticsDashboard(range: AnalyticsRange, workId: string): AnalyticsDashboard {
  const multiplier = rangeMultipliers[range] * workShare[workId];
  const totalViews = 128000 * multiplier;
  const visitors = 41800 * multiplier;
  const revenue = 4860 * multiplier;
  const fanRatio = 18.4 + (workId === 'all' ? 1.2 : 0.6);

  const contributionSource = [
    { label: 'Midnight Archive', value: workId === 'work-1' ? 100 : 46, amount: '$8.2K', color: '#A259FF' },
    { label: 'Eclipse Theater', value: workId === 'work-2' ? 100 : 31, amount: '$5.1K', color: '#7C4DFF' },
    { label: 'Glass Train 2049', value: workId === 'work-4' ? 100 : 23, amount: '$3.4K', color: '#D48FFF' }
  ];

  const contributions =
    workId === 'all'
      ? contributionSource
      : [
          contributionSource.find((item) => item.label === workOptions.find((option) => option.value === workId)?.label) ?? contributionSource[0],
          {
            label: translate('service.analytics.otherWorks'),
            value: 100 - (contributionSource.find((item) => item.label === workOptions.find((option) => option.value === workId)?.label)?.value ?? 46),
            amount: '$4.6K',
            color: '#3B2A59'
          }
        ];

  return {
    workOptions,
    metrics: [
      {
        label: translate('service.analytics.totalViews'),
        value: formatCount(totalViews),
        helper: translate('service.analytics.totalViewsHelper'),
        change: '+12.8%',
        trend: 'up'
      },
      {
        label: translate('service.analytics.visitors'),
        value: formatCount(visitors),
        helper: translate('service.analytics.visitorsHelper'),
        change: '+8.3%',
        trend: 'up'
      },
      {
        label: translate('service.analytics.revenue'),
        value: formatCurrency(revenue),
        helper: translate('service.analytics.revenueHelper'),
        change: '+15.4%',
        trend: 'up'
      },
      {
        label: translate('service.analytics.fanRatio'),
        value: `${fanRatio.toFixed(1)}%`,
        helper: translate('service.analytics.fanRatioHelper'),
        change: '+2.1%',
        trend: 'up'
      }
    ],
    siteTraffic: trafficByRange[range].map((point) => ({
      ...point,
      value: Number((point.value * workShare[workId]).toFixed(1)),
      secondaryValue: Number(((point.secondaryValue ?? 0) * workShare[workId]).toFixed(1))
    })),
    workContribution: contributions,
    audienceHeatmap: buildHeatmap(workId === 'all' ? 6 : 2),
    fanLoyalty: [
      { label: translate('service.analytics.dailyReturn'), value: workId === 'all' ? 44 : 52, amount: translate('service.analytics.high'), color: '#A259FF' },
      { label: translate('service.analytics.weeklyReturn'), value: workId === 'all' ? 36 : 31, amount: translate('service.analytics.stable'), color: '#7C4DFF' },
      { label: translate('service.analytics.occasional'), value: workId === 'all' ? 20 : 17, amount: translate('service.analytics.low'), color: '#D48FFF' }
    ],
    recentActivity: workId === 'all' ? baseActivities : baseActivities.filter((item) => item.workId === workId),
    audienceMetrics: [
      { label: translate('service.analytics.avgReadTime'), value: workId === 'all' ? '17.4 min' : '19.1 min', note: translate('service.analytics.avgReadTimeNote') },
      { label: translate('service.analytics.completionRate'), value: workId === 'all' ? '62%' : '69%', note: translate('service.analytics.completionRateNote') },
      { label: translate('service.analytics.shareConversion'), value: workId === 'all' ? '8.7%' : '10.3%', note: translate('service.analytics.shareConversionNote') }
    ],
    suggestions: [
      translate('service.analytics.suggestion1'),
      translate('service.analytics.suggestion2'),
      translate('service.analytics.suggestion3')
    ],
    insight: {
      title: translate('service.analytics.insightTitle'),
      summary: translate('service.analytics.insightSummary'),
      tags: [translate('service.analytics.tag1'), translate('service.analytics.tag2'), translate('service.analytics.tag3')],
      diagnosis: [
        translate('service.analytics.diagnosis1'),
        translate('service.analytics.diagnosis2'),
        translate('service.analytics.diagnosis3')
      ],
      nextAction: translate('service.analytics.nextAction')
    }
  };
}
