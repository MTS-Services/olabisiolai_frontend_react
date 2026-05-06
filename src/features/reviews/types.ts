export type ReviewImage = {
  id: number;
  image_path: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  created_at: string;
};

export type ReviewUser = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone: string;
};

export type ReviewBusinessInfo = {
  id: number;
  business_name: string;
  vendor?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  category?: {
    id: number;
    name: string;
  };
};

export type ReviewDto = {
  id: number;
  display_name: string;
  full_name: string;
  is_anonymous: boolean;
  rating: number;
  rating_label: string;
  review_text: string;
  is_approved: boolean;
  is_flagged: boolean;
  flag_reason: string | null;
  user: ReviewUser | null;
  business_info: ReviewBusinessInfo;
  images: ReviewImage[];
  created_at: string;
  updated_at: string;
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
