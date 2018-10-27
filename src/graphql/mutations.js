import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation(
        $firstName: String!
        $lastName: String!
        $username: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            username: $username
            authProvider: { email: { email: $email, password: $password } }
        ) {
            id
            firstName
            lastName
            username
            email
        }

        signinUser(email: { email: $email, password: $password }) {
            token
            user {
                id
            }
        }
    }
`;

export const UPDATE_USER_MUTATION = gql`
    mutation(
        $id: ID!
        $firstName: String!
        $lastName: String!
        $username: String!
    ) {
        updateUser(
            id: $id
            firstName: $firstName
            lastName: $lastName
            username: $username
        ) {
            id
            firstName
            lastName
            username
            email
            profilePic
        }
    }
`;

export const UPDATE_USER_PROFILE_PIC_MUTATION = gql`
    mutation($id: ID!, $profilePic: String!) {
        updateUser(id: $id, profilePic: $profilePic) {
            id
            firstName
            lastName
            username
            email
            profilePic
        }
    }
`;

export const SIGNIN_USER_MUTATION = gql`
    mutation SigninUserMutation($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password }) {
            token
            user {
                id
                firstName
                lastName
                username
                email
                profilePic
            }
        }
    }
`;
