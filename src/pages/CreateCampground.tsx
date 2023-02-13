CreateCampground;
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import cities from "../constants/cities";
import useUser from "../hooks/useUser";
import { useMutation } from "@apollo/client";
import { CREATE_CAMP } from "../graphql/campground/Mutation";

function CreateCampground() {
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();
  const [createCamp, { loading, error }] = useMutation(CREATE_CAMP, {
    update() {
      setUploading(true);
    },
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

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
          Please <Link to="/login">sign in</Link> to write a review{" "}
        </Message>
      </div>
    );
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const input = {
      title: name,
      price: Number(price),
      location,
      description: description.replace(/'/g, "\\'"),
      image,
      user_id: Number(user.id),
      created_at: new Date().toISOString().split("T")[0],
    };

    console.log(input);

    createCamp({ variables: { input } });
  };
  console.log(description.replace(/[<>*()',?]/g, "\\$&"));

  console.log(new Date().toISOString().split("T")[0]);

  return (
    <>
      <Container className=" my-4">
        <Link to="/campgrounds" className="btn btn-light">
          Go Back
        </Link>
      </Container>

      <FormContainer>
        <h2 className="text-warning">Create Campground</h2>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {error && <Alert variant="danger">{error?.message}</Alert>}
            {uploading && (
              <Alert variant="warning-outline">Succesfully created</Alert>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter Title"
                  className="mb-3"
                >
                  <Form.Control
                    type="name"
                    placeholder="Enter title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>
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
                    <option value={city + ", " + state}>
                      {city + ", " + state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="price" className="my-3">
                <FloatingLabel
                  controlId="price"
                  label="Enter Price"
                  className="mb-3"
                >
                  <Form.Control
                    className="rating-input"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="description">
                <FloatingLabel
                  controlId="description"
                  label="Enter description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="image" className="my-3">
                <FloatingLabel
                  controlId="description"
                  label="Enter image url"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Button type="submit" variant="outline-warning" className="mt-3">
                Create
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default CreateCampground;
