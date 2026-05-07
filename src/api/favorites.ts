import { request } from '@/api/request';

export interface FavoriteToggleResponse {
  success: boolean;
  message: string;
  data: {
    favorited: boolean;
    business_info_id: number;
  };
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
