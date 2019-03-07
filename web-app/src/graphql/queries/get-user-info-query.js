import gql from "graphql-tag";

const GET_USER_INFO_QUERY = gql`
  query($userId: String!) {
    user(userId: $userId) {
      favoriteCatPics {
        id
        url
      }
    }
  }
`;

export default GET_USER_INFO_QUERY;
