import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag'
import {useGQLQuery} from "./utils/useGQLQuery";

const get_countries = gql`
    query{
      getAllMentions {
        date
        mention
        total_mentions
        pod
        episode
        time
      }
    }
`;

function Dashboard() {
    const [mentions, setMentions] = useState([])

    const { data, isLoading, error } =  useGQLQuery('countries', get_countries)


    return (
        <div>podcasts</div>

    );
}

export default Dashboard;