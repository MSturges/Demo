import gql from "graphql-tag";
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      jwt
    }
  }
`;
export default LOGIN_MUTATION;
