export const login = /* GraphQL */ `
  mutation Login($clientId: String!) {
    login(clientId: $clientId) {
      token
    }
  }
`;

export const signup = /* GraphQL */ `
  mutation Signup($clientId: String!, $email: String!) {
    signup(clientId: $clientId, email: $email) {
      user {
        client_id
        email
      }
      token
    }
  }
`;

export const createAlert = /* GraphQL */ `
  mutation CreateAlert($clientId: String!, $type: String!, $keyword: String!) {
    createAlert(clientId: $clientId, type: $type, keyword: $keyword) {
      id
      client_id
      created_at
      type {
        id
        type
      }
      keyword
    }
  }
`;