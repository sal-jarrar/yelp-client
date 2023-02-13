import { FormEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Button, Col, Fade, Form, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from "react-router";
import Reviews from "../components/Reviews";
import Message from "../components/Message";
import useUser from "../hooks/useUser";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CAMPGROUND, GET_CAMPGROUNDS } from "../graphql/campground/Query";
import Loader from "../components/Loader";
import { Campground as Camp } from "../interfaces/campgrounds";
import { ADD_REVIEW } from "../graphql/reviewGraph/Mutation";
import DeleteCampModal from "../components/DeleteCampModal";

function Campground() {
  const { campId } = useParams();
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);
  const id = Number(campId) || 1;
  const { data, loading, error } = useQuery(GET_CAMPGROUND, {
    variables: { campId: id },
  });

  const [addReview, { loading: revLoading, error: revErr }] = useMutation(
    ADD_REVIEW,
    {
      refetchQueries: [
        { query: GET_CAMPGROUND, variables: { campId: id } },
        { query: GET_CAMPGROUNDS },
      ],
    }
  );
  const { user } = useUser();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addReview({
      variables: {
        input: {
          comment,
          rating,
          user_id: user?.id,
          camp_id: campId,
          created_at: new Date().toISOString().split("T")[0],
        },
      },
    });
  };

  const campground: Camp = data && data.campground;

  const toggle = () => setShow(!show);

  useEffect(() => {
    setTimeout(() => {
      setFade(true);
    }, 300);
  }, []);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error.message}</Message>;
  if (!campground) {
    return (
      <>
        <h1>No Data</h1>
      </>
    );
  }
  if (user && user.id) {
    console.log(Number(user.id) === Number(campground?.user?.user_id));
  }

  const userID = Number(campground.user.user_id);
  const authId = Number(user?.id);

  return (
    <Layout showFooter={true}>
      <div className="d-flex">
        <div className="flex-grow-1">
          <Link className="btn btn-outline-dark  my-4" to="/campgrounds">
            Go Back
          </Link>
        </div>
        {user
          ? authId === userID && (
              <>
                <Link
                  className="btn btn-outline-warning mx-2 my-4"
                  to={`/campground/${campId}/edit`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-outline-danger  my-4"
                  onClick={toggle}
                >
                  Delete
                </button>
              </>
            )
          : null}
      </div>

      <>
        {/* <Meta title={product.name} /> */}
        <Row>
          <Col md={6}>
            <div className="d-flex flex-column">
              <div>
                <img
                  src={campground.image}
                  alt={campground.title}
                  className="img-camp"
                />
              </div>
              <div
                className="review-form"
                style={{ width: "550px", marginTop: "24px" }}
              >
                <h4>Write a Customer Review</h4>
                {user ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="rating-input"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
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
                    <Form.Group>
                      <Button
                        disabled={revLoading || loading}
                        type="submit"
                        variant="outline-warning"
                        size="lg"
                        className="mt-3"
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <Message variant="warning">
                    Please <Link to="/login">sign in</Link> to write a review{" "}
                  </Message>
                )}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="review-card">
                <h4>{campground.title}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={campground.rating}
                  reviewsNum={campground.reviews.length}
                />
              </ListGroup.Item>
              <ListGroup.Item>${campground.price}</ListGroup.Item>
              <ListGroup.Item>{campground.location}</ListGroup.Item>
              <Fade in={fade}>
                <ListGroup.Item>{campground.description}</ListGroup.Item>
              </Fade>
              <ListGroup.Item className="text-warning-emphasis text-opacity-75 fst-italic fs-6">
                {campground.user.name}
              </ListGroup.Item>
            </ListGroup>

            <Reviews
              reviews={campground.reviews}
              loading={revLoading}
              error={revErr}
              userId={authId}
              campId={id}
            />
          </Col>
        </Row>
      </>
      <DeleteCampModal show={show} handleClose={toggle} campId={id} />
    </Layout>
  );
}

export default Campground;
