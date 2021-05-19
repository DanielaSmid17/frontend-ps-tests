import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from '@material-ui/core/Button';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
    createButton: {
        fontFamily: 'Raleway',
        color: 'white',
        borderRadius: 50,
        height: 45,
        width: 120,
        fontSize: '1.2rem',
        backgroundColor: theme.palette.secondary.light,
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
        height: 45,
        width: 120,
        fontSize: '1.2rem',
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
    formControl: {
        margin: theme.spacing(3),
    },
    checkBox: {
        fontFamily: 'Raleway',
    }

}))


function AddAlertDialog(props) {
    const theme = useTheme()
    const classes = useStyles()
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))



    const [keyWord, setKeyword] = useState('')
    const [alertType, setAlertType] = useState({
        email: false,
        sms: false,
        call: false,
    });

    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleAlertTypeChange = (event) => {
        setAlertType({ ...alertType, [event.target.name]: event.target.checked });
        console.log(alertType)
    };



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
                    <Grid item container direction='row'>
                        <Grid item >
                        <Typography variant='h3' style={{fontSize: '35px'}} gutterBottom>
                            Add Alert
                        </Typography>
                        </Grid>
                        <Grid item style={{marginTop: '0.20em', marginLeft: '1em'}}>
                            <NotificationsActiveIcon style={{fontSize: '30px', color: theme.palette.common.blue}}/>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginBottom: '0.5em', marginLeft: '1.25em'}}>
                        <Typography variant='h2' style={{fontSize: '18px'}}>Key Word</Typography>
                        <TextField
                            fullWidth
                            id='name'
                            value={keyWord}
                            onChange={(e) => setKeyword(e.target.value)}
                            label={<Typography variant='body1' style={{fontSize: '12px'}}>Type here your Key Word </Typography>}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <Typography variant='h2' style={{fontSize: '18px'}}>Alert type</Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={alertType.email} onChange={handleAlertTypeChange} name="email" />}
                                    label={<Typography variant='body2'>Email</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={alertType.sms} onChange={handleAlertTypeChange} name="sms" />}
                                    label={<Typography variant='body2'>SMS</Typography>}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={alertType.call} onChange={handleAlertTypeChange} name="call" />}
                                    label={<Typography variant='body2'>Phone Call</Typography>}
                                />
                            </FormGroup>
                            <FormHelperText style={{fontFamily: 'Raleway', fontWeight: 700}}>You can choose more than one</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                    <Grid item container direction='row'>
                        <Grid item >
                            <Button
                                variant='contained'
                                className={classes.createButton}
                            >
                                Create
                            </Button>

                        </Grid>
                        <Grid item>
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

export default AddAlertDialog;