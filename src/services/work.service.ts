import { get, getOne, postOne, uploadFile } from '@/lib/supabaseQuery';
import type { WorkFilter, WorkItem } from '@/types/profile';

/** 查询作品列表（按创建时间倒序，支持分页） */
export async function fetchWorks(
  filter: WorkFilter = 'all',
  page = 1,
  pageSize = 9
): Promise<{ data: WorkItem[]; total: number }> {
  const filters = filter === 'all' ? undefined : { status: filter };
  return get<WorkItem[]>('works', filters, { page, pageSize });
}

/** 上传封面图片到 Storage */
export async function uploadCover(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const filePath = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  return uploadFile('upload-cover', filePath, file);
}

/** 查询单个作品详情 */
export async function fetchWork(id: string): Promise<WorkItem> {
  return getOne<WorkItem>('works', id);
}

/** 创建作品 */
export async function createWork(work: Omit<WorkItem, 'id'>): Promise<WorkItem> {
  return postOne<WorkItem>('works', work);
}
