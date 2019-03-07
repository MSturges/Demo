import gql from "graphql-tag";

const ADD_FAVORITE_MUTATION = gql`
  mutation addFavoriteCatPic($url: String!) {
    addFavoriteCatPic(url: $url) {
      id
    }
  }
`;
export default ADD_FAVORITE_MUTATION;
