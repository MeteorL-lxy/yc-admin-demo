import { translate } from '@/composables/useLocale';
import { createAnalyticsDashboard } from '@/mocks/analytics';
import type { AnalyticsDashboard, AnalyticsRange } from '@/types/analytics';

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAnalyticsDashboard(range: AnalyticsRange, workId: string): Promise<AnalyticsDashboard> {
  await delay();
  return createAnalyticsDashboard(range, workId);
}

export async function generateAnalyticsDiagnosis(range: AnalyticsRange, workId: string): Promise<string[]> {
  await delay(480);

  const dashboard = createAnalyticsDashboard(range, workId);

  return [
    translate('service.analytics.diagnosisTopSignal', { summary: dashboard.insight.summary }),
    translate('service.analytics.diagnosisLoyalty'),
    translate('service.analytics.diagnosisAction', { action: dashboard.insight.nextAction })
  ];
}

import { supabase } from '@/lib/supabase'

export type AnalyticsTab = 'overview' | 'audience'

export async function getOverviewAnalytics(range: AnalyticsRange, workId: 'all' | number) {
  const isAll = workId === 'all'

  let snapshotQuery = supabase
    .from('analytics_snapshots')
    .select('*')
    .eq('range_key', range)
    .eq('tab_key', 'overview')

  if (isAll) {
    snapshotQuery = snapshotQuery.eq('scope', 'all').is('work_id', null)
  } else {
    snapshotQuery = snapshotQuery.eq('scope', 'single').eq('work_id', workId)
  }

  const { data: snapshot, error: snapshotError } = await snapshotQuery.single()

  if (snapshotError) throw snapshotError

  const { data: contributions, error: contributionsError } = await supabase
    .from('analytics_work_contributions')
    .select(`
      id,
      work_id,
      contribution_value,
      revenue_amount,
      color,
      sort_order,
      works (
        id,
        title,
        cover
      )
    `)
    .eq('snapshot_id', snapshot.id)
    .order('sort_order', { ascending: true })

  if (contributionsError) throw contributionsError

  const { data: traffic, error: trafficError } = await supabase
    .from('analytics_chart_points')
    .select('*')
    .eq('snapshot_id', snapshot.id)
    .eq('chart_key', 'traffic')
    .order('sort_order', { ascending: true })

  if (trafficError) throw trafficError

  return {
    snapshot,
    contributions: contributions ?? [],
    traffic: traffic ?? []
  }
}
