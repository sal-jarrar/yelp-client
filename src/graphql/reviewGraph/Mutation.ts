import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
  mutation addReview($input: ReviewInput) {
    addReview(input: $input) {
      user {
        name
        user_id
      }
      camp_id
      user_id
      comment
      created_at
      rating
    }
  }
`;
export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: UpdateReviewInput) {
    updateReview(input: $input) {
      user {
        name
        user_id
      }
      camp_id
      user_id
      comment
      created_at
      rating
    }
  }
`;
export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID) {
    deleteReview(reviewId: $reviewId)
  }
`;
