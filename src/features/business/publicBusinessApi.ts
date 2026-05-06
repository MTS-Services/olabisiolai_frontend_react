import { request } from '@/api/request';

export type PublicBusiness = {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  verified: boolean;
};

type Raw = Record<string, unknown>;

function str(v: unknown, fallback = ''): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  return fallback;
}

function num(v: unknown, fallback = 0): number {
  if (typeof v === 'number' && isFinite(v)) return v;
  if (typeof v === 'string') {
    const n = parseFloat(v);
    if (isFinite(n)) return n;
  }
  return fallback;
}

function rec(v: unknown): Raw | null {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v as Raw;
  return null;
}

function parseBusiness(raw: unknown, idx: number): PublicBusiness | null {
  const r = rec(raw);
  if (!r) return null;

  const id = num(r.id ?? r.business_id, idx + 1);
  const name = str(r.business_name ?? r.name, `Business ${id}`);

  const catObj = rec(r.category);
  const category = str(catObj?.name ?? r.category_name ?? r.category, 'General');

  const locObj = rec(r.location);
  const city = str(locObj?.city ?? r.city, '');
  const state = str(locObj?.state ?? r.state, '');
  const location = [city, state].filter(Boolean).join(', ') || str(r.location ?? r.full_address, 'N/A');

  const rating = num(r.average_rating ?? r.rating, 0);
  const reviews = num(r.reviews_count ?? r.total_reviews ?? r.reviews, 0);
  const description = str(r.business_description ?? r.description, '');

  const coverArr = Array.isArray(r.cover_photos) ? r.cover_photos : [];
  const firstCover = rec(coverArr[0]);
  const image =
    str(firstCover?.url ?? firstCover?.image_path, '') ||
    str(r.logo ?? r.logo_url ?? r.image, '') ||
    '/images/feature/1.jpg';

  const verified = !!(r.is_verified ?? r.verified ?? false);

  return { id, name, category, location, rating, reviews, description, image, verified };
}

function extractList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const r = rec(data);
  if (!r) return [];
  for (const key of ['businesses', 'business_profiles', 'items', 'data', 'results']) {
    const val = r[key];
    if (Array.isArray(val)) return val;
    const inner = rec(val);
    if (inner) {
      const nested = inner.data;
      if (Array.isArray(nested)) return nested;
    }
  }
  return [];
}

export async function fetchPublicBusinesses(params?: {
  category?: string;
  page?: number;
  per_page?: number;
}): Promise<PublicBusiness[]> {
  const endpoints: Array<() => Promise<unknown>> = [
    () => request.get('/public/businesses', { params, skipAuthRedirect: true }).then(r => r.data),
    () => request.get('/public/business-info', { params, skipAuthRedirect: true }).then(r => r.data),
    () => request.post('/public/businesses', params ?? {}, { skipAuthRedirect: true }).then(r => r.data),
    () => request.get('/businesses', { params, skipAuthRedirect: true }).then(r => r.data),
  ];

  for (const attempt of endpoints) {
    try {
      const data = await attempt();
      const rows = extractList(data);
      const parsed = rows
        .map((row, i) => parseBusiness(row, i))
        .filter((b): b is PublicBusiness => b !== null);
      if (parsed.length > 0) return parsed;
    } catch {
      // try next endpoint
    }
  }

  return [];
}

export async function fetchPublicBusinessById(id: number): Promise<PublicBusiness | null> {
  const endpoints: Array<() => Promise<unknown>> = [
    () => request.get(`/public/businesses/${id}`, { skipAuthRedirect: true }).then(r => r.data),
    () => request.get(`/public/business-info/${id}`, { skipAuthRedirect: true }).then(r => r.data),
    () => request.post(`/public/businesses/${id}/view`, {}, { skipAuthRedirect: true }).then(r => r.data),
    () => request.get(`/businesses/${id}`, { skipAuthRedirect: true }).then(r => r.data),
  ];

  for (const attempt of endpoints) {
    try {
      const data = await attempt();
      const r = rec(data);
      const inner = r?.data ?? data;
      const parsed = parseBusiness(inner, 0);
      if (parsed) return parsed;
    } catch {
      // try next
    }
  }

  return null;
}
