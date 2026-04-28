import { request } from '@/api/request'
import { laravelInnerData, parseCategoryList } from '@/features/categories/categoryParsers'
import type { CategoryDto } from '@/features/categories/types'

/**
 * `GET /public/categories` — unauthenticated catalog for home + filters.
 * Requires Laravel `routes/api/v1/public.php` + `PublicCategoryCatalogController` (see `contrib/laravel-public-categories/`).
 */
export async function fetchPublicCategories(): Promise<CategoryDto[]> {
  const res = await request.get('/public/categories', { skipAuthRedirect: true })
  const inner = laravelInnerData(res.data)
  const raw = inner?.categories
  return parseCategoryList(raw)
}
