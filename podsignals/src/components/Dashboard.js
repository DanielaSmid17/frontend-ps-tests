import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag'
import {useGQLQuery} from "./utils/useGQLQuery";

import {makeStyles} from '@material-ui/core/styles'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    gridItem: {
        borderColor: '#A6A6A6',
        backgroundColor: '#A6A6A6'
    }

}))

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
    const classes = useStyles()
    const theme = useTheme()

    const [mentions, setMentions] = useState([])
    const { data, isLoading, error } =  useGQLQuery('countries', get_countries)


    return (
        <Grid container direction='column' style={{ height: '1000px', backgroundColor: 'black' }} >
            <Grid item container direction='row' lg style={{backgroundColor: 'white', marginLeft: '5em'}} justify='space-around' spacing={2}>
                <Grid item className={classes.gridItem} lg={6} style={{height: "200px"}}>
                    <Typography variant='h2'>
                        Mentions
                    </Typography>
                </Grid>
                <Grid item className={classes.gridItem} lg={5} style={{backgroundColor: 'pink', height: "200px"}}>mentions</Grid>
            </Grid>
            <Grid item container={classes.gridItem} lg style={{backgroundColor: 'pink', height: "200px"}} >
                table
            </Grid>
        </Grid>

    );
}

export default Dashboard;