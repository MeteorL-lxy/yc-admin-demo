import type { WorkFilter, WorkItem } from '@/types/profile';
import { workListMock } from '@/mocks/profile';

const delay = (ms = 320) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWorks(filter: WorkFilter = 'all'): Promise<WorkItem[]> {
  await delay();

  if (filter === 'all') {
    return [...workListMock];
  }

  return workListMock.filter((item) => item.status === filter);
}
