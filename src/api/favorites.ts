import { request } from '@/api/request'

/** Default page size for `GET /user/favorites` (dashboard + favorites page). */
export const USER_FAVORITES_DEFAULT_PER_PAGE = 12

export interface FavoriteToggleResponse {
  success: boolean;
  message: string;
  data: {
    favorited: boolean;
    business_info_id: number;
  };
}

export type UserFavoriteLocation = {
  state: string
  city: string
  full_name: string
}

export type UserFavoriteBusiness = {
  business_info_id: number
  business_name: string
  category_name: string
  location: UserFavoriteLocation
  rating: number
  reviews_count: number
  is_verified: boolean
  logo_url: string | null
  cover_photo_url: string | null
  phone: string | null
  whatsapp: string | null
  website: string | null
}

export type UserFavoritesPayload = {
  favorites: UserFavoriteBusiness[]
  count: number
  pagination: {
    current_page: number
    per_page: number
    last_page: number
    total: number
  }
}

type UserFavoritesApiEnvelope = {
  success: boolean
  message: string
  data: UserFavoritesPayload
}

export async function toggleFavorite(businessInfoId: number): Promise<FavoriteToggleResponse> {
  try {
    const response = await request.post('/user/favorites/toggle', {
      business_info_id: businessInfoId
    });
    return response.data;
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    throw error;
  }
}

/** `DELETE /user/favorites/:id` — remove saved favorite (authenticated). */
export async function removeFavorite(businessInfoId: number): Promise<void> {
  try {
    await request.delete(`/user/favorites/${businessInfoId}`)
  } catch (error) {
    console.error('Failed to remove favorite:', error)
    throw error
  }
}

export async function fetchUserFavorites(params?: {
  page?: number
  per_page?: number
}): Promise<UserFavoritesPayload> {
  const response = await request.get<UserFavoritesApiEnvelope>('/user/favorites', { params })
  const body = response.data
  if (!body?.success || !body.data) {
    throw new Error(body?.message || 'Could not load favorites')
  }
  return body.data
}
