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
  const location =
    [city, state].filter(Boolean).join(', ') ||
    str(locObj?.full_name ?? r.full_address ?? r.location, 'N/A');

  const rating = num(r.average_rating ?? r.rating, 0);
  const reviews = num(r.reviews_count ?? r.total_reviews ?? r.reviews, 0);
  const description = str(r.business_description ?? r.description, '');

  // cover_photo_urls can be string[] or object[]
  const coverArr: unknown[] = Array.isArray(r.cover_photo_urls)
    ? r.cover_photo_urls
    : Array.isArray(r.cover_photos)
    ? r.cover_photos
    : [];

  const firstCover = rec(coverArr[0]);
  const image =
    (typeof coverArr[0] === 'string' && coverArr[0] ? coverArr[0] : '') ||
    str(firstCover?.url ?? firstCover?.image_path, '') ||
    str(r.logo_url ?? r.logo ?? r.image, '') ||
    '/images/feature/1.jpg';

  const verified =
    r.verification_status === 'approved' ||
    r.is_verified === true ||
    r.verified === true;

  return { id, name, category, location, rating, reviews, description, image, verified };
}

const LIST_KEYS = ['businesses', 'business_profiles', 'items', 'data', 'results'] as const;

function extractList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const r = rec(data);
  if (!r) return [];

  // Direct top-level match
  for (const key of LIST_KEYS) {
    const val = r[key];
    if (Array.isArray(val)) return val;
  }

  // One level deeper — handles { data: { businesses: [...] } }
  for (const key of LIST_KEYS) {
    const inner = rec(r[key]);
    if (!inner) continue;
    for (const innerKey of LIST_KEYS) {
      const val = inner[innerKey];
      if (Array.isArray(val)) return val;
    }
  }

  return [];
}

export async function fetchPublicBusinesses(params?: {
  category?: string;
  page?: number;
  per_page?: number;
}): Promise<PublicBusiness[]> {
  const endpoints: Array<{ label: string; fn: () => Promise<unknown> }> = [
    {
      label: 'GET /businesses/home',
      fn: () =>
        request
          .get('/businesses/home', { params, skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: 'GET /public/businesses',
      fn: () =>
        request
          .get('/public/businesses', { params, skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: 'GET /public/business-info',
      fn: () =>
        request
          .get('/public/business-info', { params, skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: 'POST /public/businesses',
      fn: () =>
        request
          .post('/public/businesses', params ?? {}, { skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: 'GET /businesses',
      fn: () =>
        request
          .get('/businesses', { params, skipAuthRedirect: true })
          .then((r) => r.data),
    },
  ];

  for (const { label, fn } of endpoints) {
    try {
      const data = await fn();
      if (import.meta.env.DEV) {
        console.debug('[publicBusinessApi] response from', label, data);
      }
      const rows = extractList(data);
      const parsed = rows
        .map((row, i) => parseBusiness(row, i))
        .filter((b): b is PublicBusiness => b !== null);
      if (parsed.length > 0) return parsed;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[publicBusinessApi] failed:', label, err);
      }
    }
  }

  return [];
}

export async function fetchPublicBusinessById(id: number): Promise<PublicBusiness | null> {
  const endpoints: Array<{ label: string; fn: () => Promise<unknown> }> = [
    {
      // confirmed response: { data: { business: {...} } }
      label: `GET /businesses/${id}`,
      fn: () =>
        request
          .get(`/businesses/${id}`, { skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: `GET /public/businesses/${id}`,
      fn: () =>
        request
          .get(`/public/businesses/${id}`, { skipAuthRedirect: true })
          .then((r) => r.data),
    },
    {
      label: `GET /public/business-info/${id}`,
      fn: () =>
        request
          .get(`/public/business-info/${id}`, { skipAuthRedirect: true })
          .then((r) => r.data),
    },
  ];

  for (const { label, fn } of endpoints) {
    try {
      const data = await fn();
      if (import.meta.env.DEV) {
        console.debug('[publicBusinessApi] single response from', label, data);
      }
      // Unwrap { data: { business: {...} } } or { data: {...} } or raw object
      const r = rec(data);
      const dataObj = rec(r?.data);
      const inner = dataObj?.business ?? r?.data ?? data;
      const parsed = parseBusiness(inner, 0);
      if (parsed) return parsed;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[publicBusinessApi] failed:', label, err);
      }
    }
  }

  return null;
}
