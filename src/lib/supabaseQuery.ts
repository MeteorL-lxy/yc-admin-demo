import { supabase } from '@/lib/supabase';

/**
 * 统一处理 Supabase 响应，有错误则抛出
 */
function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return result.data as T;
}

/**
 * GET — 查询表中数据，支持筛选、排序、分页
 *
 * @example
 * const res = await get<WorkItem[]>('works', { status: 'published' }, { page: 1, pageSize: 10 })
 */
export async function get<T>(
  table: string,
  filters?: Record<string, unknown>,
  options?: {
    select?: string;
    orderBy?: string;
    orderAsc?: boolean;
    page?: number;
    pageSize?: number;
  }
): Promise<{ data: T; total: number }> {
  const {
    select = '*',
    orderBy = 'created_at',
    orderAsc = false,
    page,
    pageSize
  } = options ?? {};

  let query = supabase.from(table).select(select, { count: 'exact' });

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
  }

  query = query.order(orderBy, { ascending: orderAsc });

  if (page && pageSize) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const result = await query;
  unwrap(result as { data: T | null; error: { message: string } | null });

  return {
    data: result.data as T,
    total: result.count ?? 0
  };
}

/**
 * GET ONE — 按 ID 查询单条记录
 *
 * @example
 * const work = await getOne<WorkItem>('works', '123')
 */
export async function getOne<T>(
  table: string,
  id: string
): Promise<T> {
  const result = await supabase.from(table).select('*').eq('id', id).single();
  return unwrap<T>(result as { data: T | null; error: { message: string } | null });
}

/**
 * POST — 向表中插入数据
 *
 * @param table 表名
 * @param rows  要插入的数据（单条或批量）
 *
 * @example
 * const work = await post<WorkItem[]>('works', [{ title: '新作品' }])
 */
export async function post<T>(
  table: string,
  rows: Record<string, unknown> | Record<string, unknown>[]
): Promise<T> {
  const result = await supabase.from(table).insert(rows).select();
  return unwrap<T>(result as { data: T | null; error: { message: string } | null });
}

/**
 * POST 单条 — 插入并返回单条记录
 *
 * @example
 * const work = await postOne<WorkItem>('works', { title: '新作品' })
 */
export async function postOne<T>(
  table: string,
  row: Record<string, unknown>
): Promise<T> {
  const result = await supabase.from(table).insert(row).select().single();
  return unwrap<T>(result as { data: T | null; error: { message: string } | null });
}

/**
 * PUT — 更新表中数据
 *
 * @param table   表名
 * @param values  要更新的字段
 * @param filters 匹配条件
 *
 * @example
 * const data = await put<WorkItem[]>('works', { title: '新标题' }, { id: '123' })
 */
export async function put<T>(
  table: string,
  values: Record<string, unknown>,
  filters: Record<string, unknown>
): Promise<T> {
  let builder = supabase.from(table).update(values).select();
  for (const [key, value] of Object.entries(filters)) {
    builder = builder.eq(key, value);
  }
  const result = await builder;
  return unwrap<T>(result as { data: T | null; error: { message: string } | null });
}

/**
 * DELETE — 删除表中数据
 *
 * @param table   表名
 * @param filters 匹配条件
 *
 * @example
 * await remove('works', { id: '123' })
 */
export async function remove(
  table: string,
  filters: Record<string, unknown>
): Promise<void> {
  let builder = supabase.from(table).delete();
  for (const [key, value] of Object.entries(filters)) {
    builder = builder.eq(key, value);
  }
  const result = await builder;
  unwrap(result as { data: unknown | null; error: { message: string } | null });
}

/**
 * UPLOAD — 上传文件到 Supabase Storage
 *
 * @param bucket   存储桶名称
 * @param filePath 存储路径（含文件名）
 * @param file     文件对象
 *
 * @example
 * const url = await uploadFile('upload-cover', 'covers/xxx.jpg', file)
 */
export async function uploadFile(
  bucket: string,
  filePath: string,
  file: File,
  options?: { cacheControl?: string; upsert?: boolean }
): Promise<string> {
  const result = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: options?.cacheControl ?? '3600',
    upsert: options?.upsert ?? false
  });
  unwrap(result as { data: unknown | null; error: { message: string } | null });

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
