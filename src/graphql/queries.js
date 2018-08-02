import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query {
    user {
      id,
      firstName,
      lastName,
      username,
      email,
      profilePic
    }
  }
`;