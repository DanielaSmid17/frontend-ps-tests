import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid'

import {useTheme, makeStyles} from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from '@material-ui/core/Button';

import  { API, graphqlOperation } from 'aws-amplify'
import { deleteAlert } from '../GraphQL/Mutations';
import jwt_decode from "jwt-decode";


const useStyles = makeStyles(theme => ({
    deleteButton: {
        fontFamily: 'Raleway',
        color: 'white',
        borderRadius: 50,
        height: 30,
        width: 70,
        fontSize: '.8em',
        backgroundColor: theme.palette.secondary.dark,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            height: 40,
            width: 120
        }
    },
    cancelButton: {
        fontFamily: 'Raleway',
        color: 'white',
        borderRadius: 50,
        height: 30,
        width: 70,
        fontSize: '.8em',
        marginLeft: '0.25em',
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            height: 40,
            width: 120
        }
    },
}))

function DeleteAlertsDialog(props) {
    const theme = useTheme()
    const classes = useStyles()
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const token = localStorage.getItem('tokenDB')
    const userPayload = jwt_decode(token)
    const clientId = userPayload.client_id
    const {alerts} = props

    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const deleteAlerts = async () => {

        try{
            const alertsDeleted = await API.graphql(graphqlOperation(deleteAlert, {id: alerts.toString()}))
            console.log(alertsDeleted)
            props.onClose(true)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <Dialog onClose={handleClose}
                 open={open}
                PaperProps={{style:
                        {paddingTop: matchesXS ? '1em' : '3em',
                            paddingBottom: matchesXS ? '1em' : '5em',
                            paddingLeft: matchesXS ? 0 : matchesSM ? '5em' : matchesMD ? '8em' : '10em',
                            paddingRight: matchesXS ? 0 : matchesSM ? '5em' : matchesMD ? '8em' : '10em'}}}
                style={{zIndex: 1302}}
                fullScreen={matchesXS}>
            <DialogContent>
                <Grid container direction='column' justify='center'>
                <Grid item>
                    <Typography variant='body2'>Are you sure you want to delete these alerts?</Typography>
                </Grid>
                    
                        <Grid item container justify='center' style={{marginTop: '.5em'}}>
                        <Button
                                variant='contained'
                                className={classes.deleteButton}
                                onClick={deleteAlerts}
                            >
                                Delete
                            </Button>
                            <Button
                                variant='contained'
                                className={classes.cancelButton}
                                onClick={()=> props.onClose(true)}
                            >
                                Cancel
                            </Button>

                        </Grid>
                    </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteAlertsDialog;