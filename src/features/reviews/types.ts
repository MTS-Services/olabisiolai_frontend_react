export type ReviewImage = {
  id: number;
  url: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
};

export type ReviewBusiness = {
  id: number;
  business_name: string;
};

export type ReviewDto = {
  id: number;
  reviewer_name: string;
  is_anonymous: boolean;
  rating: number;
  review_text: string;
  is_approved: boolean;
  is_flagged?: boolean;
  flag_reason?: string | null;
  business: ReviewBusiness;
  images: ReviewImage[];
  created_at: string;
};

export type ReviewPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ReviewStatistics = {
  total_reviews: number;
  approved_reviews: number;
  flagged_reviews: number;
  average_rating: number;
  rating_distribution: {
    '5_star': number;
    '4_star': number;
    '3_star': number;
    '2_star': number;
    '1_star': number;
  };
};
