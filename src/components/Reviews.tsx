import { Badge, Card, Col, Form, ListGroup } from "react-bootstrap";
import Message from "./Message";
import { Review } from "../interfaces/campgrounds";
import Rating from "./Rating";
import { ApolloError } from "@apollo/client/errors";
import Loader from "./Loader";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW, UPDATE_REVIEW } from "../graphql/reviewGraph/Mutation";
import { GET_CAMPGROUND, GET_CAMPGROUNDS } from "../graphql/campground/Query";
import moment from "moment";

type ReviewProp = {
  reviews: Review[];
  loading: boolean;
  error: ApolloError | undefined;
  userId: number;
  campId: number;
};

function Reviews({ reviews, loading, error, userId, campId }: ReviewProp) {
  const [updateReview, { loading: revLoading, error: revErr }] = useMutation(
    UPDATE_REVIEW,
    {
      refetchQueries: [
        { query: GET_CAMPGROUND, variables: { campId } },
        { query: GET_CAMPGROUNDS },
      ],
    }
  );
  const [deleteReview, { loading: deleteRevLoading, error: deleteRevErr }] =
    useMutation(DELETE_REVIEW, {
      refetchQueries: [
        { query: GET_CAMPGROUND, variables: { campId } },
        { query: GET_CAMPGROUNDS },
      ],
    });

  const [update, setUpdate] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [updateUserId, setUpdateUserId] = useState<null | number>(null);
  console.log(updateUserId);

  const handleUpdate = (i: number, review_id: string) => {
    setUpdateUserId(i);
    setUpdate(true);
    if (update && i === updateUserId) {
      setUpdate(false);
      setUpdateUserId(null);
      updateReview({ variables: { input: { comment, rating, review_id } } });
    }
  };

  return (
    <Col className="mt-4">
      <Card style={{ overflowY: "auto", maxHeight: "50vh" }}>
        <Card.Header className="review-card">
          <h4>Reviews</h4>
        </Card.Header>

        {reviews.length === 0 && <Card.Body>No Reviews</Card.Body>}
        <ListGroup variant="flush">
          {reviews.map((review, i) => (
            <ListGroup.Item key={review.review_id}>
              <div className="d-flex  mt-1">
                <div className="w-100 d-flex">
                  <div className="d-flex justify-content-between">
                    <strong>{review.user.name} </strong>
                    {i !== updateUserId && (
                      <>
                        {/* <Rating value={review.rating} className="mx-3" /> */}
                        <p className="px-4">
                          <Badge bg="info">
                            {Math.round(review.rating)}
                            <i className="fas fa-star text-warning px-1" />
                          </Badge>
                        </p>
                        <p>
                          {moment(Number(review.created_at))
                            .startOf("day")
                            .fromNow()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-grow-1 d-flex">
                  {userId === Number(review.user_id) && (
                    <>
                      <button
                        onClick={() => {
                          handleUpdate(i, review.review_id);
                        }}
                        className="btn btn-sm btn-outline-warning  mx-2"
                      >
                        {update && i === updateUserId ? "Update" : "Edit"}
                      </button>
                      {!update && (
                        <button
                          onClick={() =>
                            deleteReview({
                              variables: { reviewId: review.review_id },
                            })
                          }
                          className="btn btn-sm btn-outline-danger  mx-2"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                  {update && i === updateUserId && (
                    <button
                      onClick={() => {
                        setUpdateUserId(null);
                        setUpdate(false);
                      }}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {revLoading ? (
                <Loader />
              ) : update && i === updateUserId ? (
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={review.rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="rating-input mb-3"
                    style={{ width: "30%" }}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
              ) : null}

              {update && updateUserId === i ? (
                <Form.Group controlId="comment" className="mt-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="rating-input"
                  ></Form.Control>
                </Form.Group>
              ) : (
                <p className="text-white">{review.comment}</p>
              )}
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            {loading && <Loader />}
            {error && <Message variant="danger">{error.message}</Message>}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default Reviews;
