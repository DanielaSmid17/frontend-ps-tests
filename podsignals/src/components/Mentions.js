import React from 'react';
import MentionsTable from "./MentionsTable";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


function Mentions(props) {
    return (
        <Grid container alignItems='center' style={{marginTop: '5em', marginLeft: '6em', width: '90%'}}>
            <Grid item container direction='column' alignItems='center'>
                <Grid item style={{marginBottom: '1em'}}>
                    <Typography variant='h3'>All mentions</Typography>
                </Grid>
                <Grid item>
                    <MentionsTable mentions={props.mentions} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Mentions;