import { gql } from "@apollo/client";

export const Register_User = gql`
  mutation RegisterUser($input: RegisterUserInput) {
    registerUser(input: $input) {
      user_id
      name
      email
      token
    }
  }
`;
export const Login_User = gql`
  mutation LoginUser($input: LoginUserInput) {
    loginUser(input: $input) {
      user_id
      name
      email
      token
    }
  }
`;
