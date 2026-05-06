import { request } from '@/api/request';
import type { ReviewDto, ReviewPagination } from './types';

export type SubmitReviewPayload = {
  business_id: number;
  full_name: string;
  is_anonymous: boolean;
  rating: number;
  review_text: string;
  images?: File[];
};

export type FetchReviewsParams = {
  business_id: number;
  rating?: number;
  per_page?: number;
  page?: number;
};

export type FetchReviewsResult = {
  data: ReviewDto[];
  pagination: ReviewPagination;
};

export async function fetchPublicReviews(params: FetchReviewsParams): Promise<FetchReviewsResult> {
  const res = await request.get('/reviews', { params, skipAuthRedirect: true });
  const body = res.data as { data: ReviewDto[]; pagination: ReviewPagination };
  return {
    data: body.data ?? [],
    pagination: body.pagination,
  };
}

export async function submitReview(payload: SubmitReviewPayload): Promise<ReviewDto> {
  const formData = new FormData();
  formData.append('business_id', String(payload.business_id));
  formData.append('full_name', payload.is_anonymous ? 'Anonymous' : payload.full_name.trim());
  formData.append('is_anonymous', payload.is_anonymous ? '1' : '0');
  formData.append('rating', String(payload.rating));
  formData.append('review_text', payload.review_text.trim());
  (payload.images ?? []).forEach((file, i) => {
    formData.append(`images[${i}]`, file);
  });
  const res = await request.post('/reviews/store', formData, { skipAuthRedirect: true });
  return (res.data as { data: ReviewDto }).data;
}
