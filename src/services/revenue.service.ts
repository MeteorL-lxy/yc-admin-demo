import { translate } from '@/composables/useLocale';
import { defaultRevenueFilters, revenueRecordsMock } from '@/mocks/revenue';
import type { RevenueDashboard, RevenueDetailRow, RevenueFilters, RevenueRecord } from '@/types/revenue';

const delay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const matchKeyword = (record: RevenueRecord, keyword: string) =>
  !keyword || record.workName.toLowerCase().includes(keyword.toLowerCase());

const inRange = (record: RevenueRecord, startDate: string, endDate: string) => record.date >= startDate && record.date <= endDate;

const mapRow = (record: RevenueRecord): RevenueDetailRow => ({
  id: record.id,
  date: record.date,
  workName: record.workName,
  workType: record.workType === 'novel' ? translate('revenue.novel') : translate('revenue.drama'),
  audienceType: record.audienceType === 'follower' ? translate('revenue.follower') : translate('revenue.nonFollower'),
  amount: formatCurrency(record.amount),
  paidUsers: record.paidUsers,
  freeUsers: record.freeUsers,
  orderCount: record.orderCount
});

export function getDefaultRevenueFilters(): RevenueFilters {
  return { ...defaultRevenueFilters };
}

function filterRevenueRecords(filters: RevenueFilters): RevenueRecord[] {
  return revenueRecordsMock.filter((record) => {
    if (!inRange(record, filters.startDate, filters.endDate)) {
      return false;
    }

    if (filters.audienceType !== 'all' && record.audienceType !== filters.audienceType) {
      return false;
    }

    if (filters.workType !== 'all' && record.workType !== filters.workType) {
      return false;
    }

    return matchKeyword(record, filters.keyword.trim());
  });
}

function buildTrend(records: RevenueRecord[], key: 'amount' | 'paidUsers') {
  return [...records]
    .sort((left, right) => left.date.localeCompare(right.date))
    .map((record) => ({
      label: record.date.slice(5),
      value: key === 'amount' ? record.amount : record.paidUsers
    }));
}

function buildBreakdown(records: RevenueRecord[]) {
  const grouped = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.workName] = (acc[record.workName] ?? 0) + record.amount;
    return acc;
  }, {});

  const colors = ['#A259FF', '#7C4DFF', '#D48FFF', '#3B2A59'];

  return Object.entries(grouped).map(([label, amount], index) => ({
    label,
    value: amount,
    amount: formatCurrency(amount),
    color: colors[index % colors.length]
  }));
}

export async function fetchRevenueDashboard(filters: RevenueFilters): Promise<RevenueDashboard> {
  await delay();

  const records = filterRevenueRecords(filters);
  const totalRevenue = records.reduce((sum, record) => sum + record.amount, 0);
  const totalPaidUsers = records.reduce((sum, record) => sum + record.paidUsers, 0);
  const totalFreeUsers = records.reduce((sum, record) => sum + record.freeUsers, 0);
  const averageRevenue = records.length > 0 ? totalRevenue / records.length : 0;

  return {
    lastUpdated: '2026-04-09 18:30',
    summary: [
      {
        label: translate('service.revenue.totalRevenue'),
        value: formatCurrency(totalRevenue),
        note: translate('service.revenue.totalRevenueNote'),
        accent: 'primary'
      },
      {
        label: translate('service.revenue.avgRevenue'),
        value: formatCurrency(averageRevenue),
        note: translate('service.revenue.avgRevenueNote'),
        accent: 'blue'
      },
      {
        label: translate('service.revenue.paidVsFree'),
        value: `${totalPaidUsers} / ${totalFreeUsers}`,
        note: translate('service.revenue.paidVsFreeNote'),
        accent: 'pink'
      }
    ],
    paymentAmountTrend: buildTrend(records, 'amount'),
    payingUsersTrend: buildTrend(records, 'paidUsers'),
    breakdown: buildBreakdown(records),
    detailRows: records.sort((left, right) => right.date.localeCompare(left.date)).map(mapRow)
  };
}

export async function fetchRevenueDetailRows(filters: RevenueFilters): Promise<RevenueDetailRow[]> {
  await delay(220);
  return filterRevenueRecords(filters)
    .sort((left, right) => right.date.localeCompare(left.date))
    .map(mapRow);
}
