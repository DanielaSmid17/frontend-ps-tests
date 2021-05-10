import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
}))

function Podcasts(props) {
    const classes = useStyles()
    const theme = useTheme()

    const [podcasts, setPodcasts] = useState([])
    const getData=()=>{
        fetch('MOCK_DATA_PODCASTS.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                setPodcasts(myJson)
            });
    }
    useEffect(() => {
        getData()
        console.log(podcasts)
    }, [podcasts]);




    return (
        <Grid container direction='column' style={{width: '90%', marginLeft: '10em', marginTop: '10em'}}>
            <Grid item>
                <Typography variant='h3'>Podcasts</Typography>
            </Grid>
            <Grid item>
                <Typography variant='body1'>Advanced search</Typography>
            </Grid>
            <Grid item>
                <Card className={classes.root}>
                    <CardHeader title={podcasts.title} />

                </Card>

            </Grid>


        </Grid>
    );
}

export default Podcasts;