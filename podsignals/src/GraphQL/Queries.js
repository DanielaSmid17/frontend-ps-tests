import {gql} from '@apollo/client'

export const getPodcastById = /* GraphQL */ `
  query getPodcastById($id: ID!) {
    getPodcastById(id: $id) {
      id
      category
      category_rank
      title
      publisher
      description
      website
      itunes_url
      logo
      rss
    }
  }
`;

export const getTopPodcasts = `
query TopPodcastsEachCategory {
getTopOnePodcasts {
    id
    title
    category
    category_rank
    description
    itunes_url
    logo
    publisher
    rss
    website
  }
}
`;

export const getPodcastsByKeyword = `
  query getPodcastsByKeyword($keyword: String!) {
    getPodcastsByKeyword(keyword: $keyword) {
      id
      title
      category
      category_rank
      description
      itunes_url
      logo
      publisher
      rss
      website
    }
  }
`;

export const getEvent = /* GraphQL */ `
  query getEvent {
    getEvent
  }
`;

export const getCategories = /* GraphQL */ `
  query getCategories {
    getCategories {
      category_name
    }
  }
`;