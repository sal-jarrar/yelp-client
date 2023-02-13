export interface CampgroundProps {
  campground: Campground;
}

type User = {
  user_id: string;
  name: string;
};

export type Review = {
  review_id: string;
  user: User;
  camp_id: string;
  user_id: string;
  created_at: string;
  comment: string;
  rating: number;
};
export interface Campground {
  camp_id: number;
  name: string;
  location: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
  user: User;
}
