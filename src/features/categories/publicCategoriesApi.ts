import { request } from '@/api/request'
import { laravelInnerData, parseCategoryList } from '@/features/categories/categoryParsers'
import type { CategoryDto } from '@/features/categories/types'

const fallbackCategories: CategoryDto[] = [
  { id: 1, name: 'Plumbing', subcategories: ['Pipe Repair', 'Installation'] },
  { id: 2, name: 'Electrical', subcategories: ['Wiring', 'Maintenance'] },
  { id: 3, name: 'Catering', subcategories: ['Events', 'Home Service'] },
  { id: 4, name: 'Cleaning', subcategories: ['Residential', 'Office'] },
  { id: 5, name: 'Construction', subcategories: ['Renovation', 'Finishing'] },
  { id: 6, name: 'Beauty & Spa', subcategories: ['Salon', 'Wellness'] },
  { id: 7, name: 'Photography', subcategories: ['Events', 'Studio'] },
  { id: 8, name: 'Logistics', subcategories: ['Delivery', 'Moving'] },
  { id: 9, name: 'Tutoring', subcategories: ['Primary', 'Secondary'] },
  { id: 10, name: 'Legal Services', subcategories: ['Consultation', 'Documentation'] },
]

/**
 * `GET /public/categories` — unauthenticated catalog for home + filters.
 * Requires Laravel `routes/api/v1/public.php` + `PublicCategoryCatalogController` (see `contrib/laravel-public-categories/`).
 */
export async function fetchPublicCategories(): Promise<CategoryDto[]> {
  try {
    const res = await request.get('/public/categories', { skipAuthRedirect: true })
    const inner = laravelInnerData(res.data)
    const raw = inner?.categories
    const parsed = parseCategoryList(raw)
    return parsed.length > 0 ? parsed : fallbackCategories
  } catch (error) {
    // Keep storefront usable while backend endpoint is being wired.
    console.warn('[categories] using fallback list because /public/categories failed', error)
    return fallbackCategories
  }
}
