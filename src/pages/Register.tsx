import { useState, FormEvent, useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Register_User } from "../graphql/user/Mutation";

import useUser from "../hooks/useUser";

function Register() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [register, { loading, error }] = useMutation(Register_User, {
    update(_, { data: { registerUser: userData } }) {
      navigate("/");
      login(userData);
    },
  });
  console.log(error);
  const errorMessage =
    error?.message === "Response not successful: Received status code 400"
      ? "some error happened"
      : error?.message;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      register({
        variables: { input: { name, email, password } },
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }, [message]);

  return (
    <div className="welcome">
      <div className="form-wrapper" style={{ height: "39rem" }}>
        <h2 className="text-center">Register</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{errorMessage}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div>
            Already have an account?{" "}
            <Link className="register" to={"/login"}>
              <span>Login</span>
            </Link>
          </div>

          <Link className="register" to={"/"}>
            <div>Back to Home Page</div>
          </Link>

          <button className="text-white btn-form my-3">Submit</button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
