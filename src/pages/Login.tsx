import { FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useMutation } from "@apollo/client";
import { Login_User } from "../graphql/user/Mutation";
import useUser from "../hooks/useUser";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(Login_User, {
    update(_, { data: { loginUser: userData } }) {
      navigate("/");
      login(userData);
    },
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    loginUser({ variables: { input: { email, password } } });
  };
  return (
    <div className="welcome">
      <div className="form-wrapper">
        <h2 className="text-center">Login</h2>
        {error && <Message variant="danger">{error.message}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <div>
            Don't have an account?{" "}
            <Link className="register" to={"/register"}>
              <span>Register</span>
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

export default Login;
