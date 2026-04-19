export type ReviewStatus = "approved" | "pending";

export type ReviewRow = {
  id: number;
  userName: string;
  userDate: string;
  business: string;
  rating: number;
  comment: string;
  /** Red flag icon beside comment (Figma: Ngozi row) */
  flagged: boolean;
  status: ReviewStatus;
  /** Long date for modal, e.g. April 1, 2024 at 02:30 PM */
  dateTimeLong: string;
};
