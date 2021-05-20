import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
    updateButton: {
        backgroundColor: theme.palette.common.blue,
        borderRadius: '10%',
        color: theme.palette.secondary.dark,
        fontSize: '30px',
        marginTop: '.5em'
    },
    reset: {
        backgroundColor: '#A6A6A6',
        fontFamily: 'Raleway',
        fontSize: '10px',
        width: '20px'
    }

}))

function Profile(props) {

    const classes = useStyles()
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const [userInfo, setUserInfo] = useState({
        name: '', lastName: '', email: props.user.attributes.email, secretKey: 'ab45ne2i2nn2', plan: 'FREE'
    })
    const [showSecretKey, setShowSecretKey] = useState(false);
    const handleClickShowPassword = () => setShowSecretKey(!showSecretKey);
    const handleMouseDownPassword = () => setShowSecretKey(!showSecretKey);
    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name] : e.target.value})
    }



    return (
        <Grid container alignItems="center" direction='column' style={{width: matchesSM ? '76%' : '90%', marginLeft: '7em', marginTop: '4em'}}>
            <Grid item>
                <Typography variant='h3' style={{fontSize: matchesSM ? '35px' : undefined}}>Profile</Typography>
            </Grid>
                <Paper elevation={3} style={{paddingLeft: '3em', paddingRight: '3em', paddingBottom: '2em', paddingTop: '2em', marginTop: '2em', width: matchesSM ? '50%' : matchesMD ? '40%' : '30%'}}>
                    <Grid item container direction='column'>
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1' style={{fontSize: matchesSM ? '14px' : matchesMD ? '17px' : '20px', marginRight: '1em', marginBottom: '1em'}}>Name:</Typography>
                            <TextField size={matchesSM ? 'small' : undefined} name='name' onChange={handleChange} variant="outlined" value={userInfo.name} style={{width: 200, marginBottom: '1em', fontSize: '30px'}}/>
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1' style={{fontSize: matchesSM ? '14px' : matchesMD ? '17px' : '20px', marginRight: '1em', marginBottom: '1em'}}>Last name:</Typography>
                            <TextField  size={matchesSM ? 'small' : undefined} name='lastName' onChange={handleChange} variant="outlined" value={userInfo.lastName} style={{width: 200, marginBottom: '1em', fontSize: '20px'}}/>
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1' style={{fontSize: matchesSM ? '14px' : matchesMD ? '17px' : '20px', marginRight: '1em', marginBottom: '1em'}}>Email:</Typography>
                            <TextField size={matchesSM ? 'small' : undefined} name='email' onChange={handleChange} variant="outlined" value={userInfo.email} style={{width: 200, marginBottom: '1em', fontSize: '20px'}}/>
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1' style={{fontSize: matchesSM ? '14px' : matchesMD ? '17px' : '20px', marginRight: '1em', marginBottom: '1em'}}>Secret Key:</Typography>
                            <TextField
                                size={matchesSM ? 'small' : undefined}
                                variant="outlined"
                                type={showSecretKey ? "text" : "password"}
                                value={userInfo.secretKey}
                                style={{width: 200, marginBottom: '1em', fontSize: '20px'}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showSecretKey ? <VisibilityIcon style={{fontSize: 'small'}} /> : <VisibilityOffIcon style={{fontSize: 'small'}} />}
                                            </IconButton>
                                            {/*<Button className={classes.reset}>RESET</Button>*/}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1' style={{fontSize: matchesSM ? '14px' : matchesMD ? '17px' : '20px', marginRight: '1em', marginBottom: '1em'}}>Plan:</Typography>
                            <TextField size={matchesSM ? 'small' : undefined} variant="outlined" disabled value={userInfo.plan} style={{width: 200, marginBottom: '1em', fontSize: '20px', backgroundColor: '#C9E8BA', color:'#466934' }}/>
                        </Grid>
                        <Grid item align='center'>
                            <Button className={classes.updateButton}>
                                Update
                            </Button>
                        </Grid>

                    </Grid>
                </Paper>

        </Grid>
    );
}

export default Profile;