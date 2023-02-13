import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Alert, Button, Container, Form } from "react-bootstrap";
import cities from "../constants/cities";
import useUser from "../hooks/useUser";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CAMP } from "../graphql/campground/Mutation";
import { GET_CAMPGROUND, GET_CAMPGROUNDS } from "../graphql/campground/Query";

function CampgroundEdit() {
  const { campId } = useParams();
  const id = Number(campId) || 1;
  const { data, loading, error } = useQuery(GET_CAMPGROUND, {
    variables: { campId: id },
  });

  const [uploading, setUploading] = useState(false);
  const { user } = useUser();
  const [updateCamp, { loading: updateLoading, error: updateErr }] =
    useMutation(UPDATE_CAMP, {
      update() {
        setUploading(true);
      },
      refetchQueries: [
        { query: GET_CAMPGROUNDS },
        { query: GET_CAMPGROUND, variables: { campId: id } },
      ],
    });
  const [name, setName] = useState(data?.campground.title);
  const [price, setPrice] = useState(data?.campground.price);
  const [image, setImage] = useState(data?.campground.image);
  const [location, setLocation] = useState(data?.campground.location);
  const [description, setDescription] = useState(data?.campground.description);

  useEffect(() => {
    if (uploading)
      setTimeout(() => {
        setUploading(false);
      }, 1500);
  }, [uploading]);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Message variant="warning">
          Please <Link to="/login">sign in</Link> to update a campground{" "}
        </Message>
      </div>
    );
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const input = {
      camp_id: Number(id),
      title: name,
      price: Number(price),
      location,
      description: description.replace(/'/g, "\\'"),
      image,
      user_id: Number(user.id),
    };

    console.log(input);

    updateCamp({ variables: { input } });
  };
  //   console.log(description.replace(/[<>*()',?]/g, "\\$&"));
  if (error) return <Alert variant="danger">{updateErr?.message}</Alert>;
  return (
    <>
      <Container className=" my-4">
        <Link to="/campgrounds" className="btn btn-light">
          Go Back
        </Link>
      </Container>

      <FormContainer>
        <h2 className="text-warning">Update Campground</h2>

        {loading || updateLoading ? (
          <Loader />
        ) : (
          <>
            {updateErr && <Alert variant="danger">{updateErr?.message}</Alert>}
            {uploading && <Alert variant="warning">Succesfully Updated</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  as="select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Default select example"
                >
                  <option>Open this select menu</option>
                  {cities.map(({ city, state }) => (
                    <option value={city + "-" + state}>
                      {city + ", " + state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className="rating-input"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image" className="my-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="outline-warning" className="mt-3">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default CampgroundEdit;
