
export const getPodcastById = /* GraphQL */ `
  query GetPodcastById($id: ID!) {
    getPodcastById(id: $id) {
      id
      category {
        id
        category_name
      }
      category_id
      category_rank
      title
      publisher
      description
      website
      itunes_url
      logo
      rss
      page_link
    }
  }
`;


export const getTopOnePodcasts = /* GraphQL */ `
  query GetTopOnePodcasts {
    getTopOnePodcasts {
      id
      category {
        id
        category_name
      }
      category_id
      category_rank
      title
      publisher
      description
      website
      itunes_url
      logo
      rss
      page_link
    }
  }
`;

export const getByCatAndKey = /* GraphQL */ `
  query GetByCatAndKey($keyword: String!, $category: String!) {
    getByCatAndKey(keyword: $keyword, category: $category) {
      id
      category {
        id
        category_name
      }
      category_id
      category_rank
      title
      publisher
      description
      website
      itunes_url
      logo
      rss
      page_link
    }
  }
`;

export const getEvent = /* GraphQL */ `
  query getEvent {
    getEvent
  }
`;

export const getCategories = /* GraphQL */ `
  query GetCategories {
    getCategories {
      id
      category_name
    }
  }
`;

export const getAlertsByUser = /* GraphQL */ `
  query GetAlertsByUser($clientId: String!) {
    getAlertsByUser(clientId: $clientId) {
      id
      client_id
      created_at
      type
      keyword
    }
  }
`;