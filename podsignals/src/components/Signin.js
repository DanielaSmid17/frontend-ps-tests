import React, {useState} from 'react';
import {Auth} from 'aws-amplify'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import Paper from'@material-ui/core/Paper'

import Popover from '@material-ui/core/Popover';

import googleIcon from '../components/ui/images/google-icon.svg'
import { API, graphqlOperation } from 'aws-amplify'
import { signup, login } from '../GraphQL/Mutations';




const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    googleButton: {
        color: theme.palette.secondary.dark,
        fontFamily: 'Raleway',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    }



}))


function Signin(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [formState, setFormState] = useState(
        {password: '', email: '', authCode: '', formType: 'signUp'})
    const username = formState.email
    const [userInfo, setUserInfo] = useState({clientId: '', email: ''})
    const [signUpError, setSignUpError] = useState('')
    const [signInError, setSignInError] = useState('')
    const [authorizationCodeError, setAuthorizationCodeError] = useState('')
    const [resendMessage, setResendMessage] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const onChange = e => {
        e.persist()
        setFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
    }

    const { formType } = formState
    const handleSignUp = async () => {
        const {email, password} = formState
        try{
        const signUpUser = await Auth.signUp({username: email, password, attributes: {email}})
        setUserInfo({clientId: signUpUser["user"]["pool"]["clientId"], email: signUpUser["user"]["username"], token: signUpUser["user"]['storage']['CognitoIdentityServiceProvider.v0nq04re4qj0csldjcah7vfr4.bb728f4b-11a6-44a0-b81e-57c03855e16c.accessToken']})
        setFormState(() => ({...formState, formType: 'confirmSignUp'}))
        setSignUpError('')
        } catch (err) {
            setSignUpError(err.message)
        }
    }

    const handleConfirmSignUp = async () => {
        const { authCode } = formState
        try{
        const success = await Auth.confirmSignUp(username, authCode)
        setFormState(() => ({ ...formState, formType: 'signIn' }))
        setAuthorizationCodeError('')
        setResendMessage('')
            if (success) {
                const {clientId, email} = userInfo
                try {
    
                  const userinDB = await API.graphql(graphqlOperation(signup, {clientId, email}))
                  console.log(userinDB)
                } catch (err) {
                    console.log('error:', err)
                }
            }
        } catch(err) {
            console.log('error confirm', err)
            setAuthorizationCodeError(err.message)
        }


    }

    const resendAuthorizationCode = async () => {
            try {
               await Auth.resendSignUp(formState.email);
                setResendMessage('Authorization code was sent successfully')
            } catch (err) {
                setAuthorizationCodeError(err)
                console.log('error resending code: ', err);
            }

    }


    const handleSignIn = async () => {
        const { email, password } = formState
        try {
        const signinUser = await Auth.signIn({ username: email, password })
        const clientId = signinUser.pool.clientId
            setFormState(() => ({...formState, password: '', email: '', authCode: ''}))
            if (signinUser) {
                setSignInError('')
                const tokenDB = await API.graphql(graphqlOperation(login, {clientId}))
                console.log(tokenDB)
                localStorage.setItem('tokenDB', tokenDB.data.login.token)
                window.location="/dashboard"

            }

        } catch (err){
            setSignInError(err.message)
            console.log(err)
        }


    }
    const signUpForm = (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography variant='h3' style={{fontSize: '30px'}}>Sign up</Typography>
                <FormGroup style={{marginBottom: '1em', marginTop: '1em'}}>
                    <TextField name='email' onChange={onChange}
                               label="Email"
                               aria-owns={open ? 'mouse-over-popover' : undefined}
                               aria-haspopup="true"
                               onMouseEnter={handlePopoverOpen}
                               onMouseLeave={handlePopoverClose} />
                    <TextField name='password' type='password' onChange={onChange}  placeholder='Password' label="Password" />
                </FormGroup>
                {signUpError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{signUpError}</Typography>}
                <FormHelperText  style={{fontFamily: 'Raleway', fontWeight: 700}}>Already have an account? <Button style={{backgroundColor:'white', color: theme.palette.secondary.dark}} onClick={() => setFormState(() => ({ ...formState, formType: 'signIn' })) }>Sign in</Button></FormHelperText>
                <Button onClick={handleSignUp} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Sign up</Button>
                <Typography variant={"body2"} style={{marginTop: '1em', marginBottom: '1em'}}>or</Typography>
                <Button className={classes.googleButton} onClick={()=> Auth.federatedSignIn({provider: 'Google'})}>Sign up with  <img style={{marginLeft: '.5em'}} src={googleIcon} alt='google icon' height='20 px' width='20px'/></Button>
            </FormControl>

        </React.Fragment>
    )

    const signIn = (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography variant='h3' style={{fontSize: '30px'}}>Sign in</Typography>
                <FormGroup style={{marginBottom: '1em', marginTop: '1em'}}>
                    <TextField name='username' onChange={onChange}  label='Username' style={{marginBottom: '1em', marginTop: '1em'}} />
                    <TextField name='password' type='password' onChange={onChange}  label="Password" style={{marginBottom: '1em'}} />
                </FormGroup>
                {signInError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{signInError}</Typography>}
                <FormHelperText style={{fontFamily: 'Raleway', fontWeight: 700}}>Don't have an account? <Button style={{backgroundColor:'white', color: theme.palette.secondary.dark}} onClick={() => setFormState(() => ({ ...formState, formType: 'signUp' })) }>Join now</Button></FormHelperText>
                <Button onClick={handleSignIn} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Sign in</Button>
            </FormControl>

        </React.Fragment>
    )
    const confirmationCode = (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography variant='h3' style={{fontSize: '30px'}}>Verify your account</Typography>
                <Typography variant='body2'>We just sent you a <span style={{fontWeight: 900}}>verification code</span> to <br /> the email you provided, please enter it here.</Typography>
                <FormGroup>
                    <TextField name='authCode' onChange={onChange}  placeholder='Authorization code' label="Authorization code" />
                </FormGroup>
                {authorizationCodeError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{authorizationCodeError}</Typography>}
                <FormHelperText>Didn't get a code? <Button onClick={resendAuthorizationCode} style={{backgroundColor:'white', color: theme.palette.secondary.dark, fontSize: '18px'}}>Resend code</Button></FormHelperText>
                {resendMessage && <Typography variant='body2' style={{color: theme.palette.secondary.dark}}>{resendMessage}</Typography>}
                <Button onClick={handleConfirmSignUp} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Confirm code</Button>
            </FormControl>

        </React.Fragment>
    )


    return (

        <Grid container style={{width: '90%', marginLeft: '7em'}}>
            <Grid item container justify='center' align='center' style={{marginTop: '5em'}}>
            <Paper elevation={3} style={{paddingLeft: '4em', paddingRight: '4em', paddingBottom:  '2em', paddingTop: '2em'}}>
             {formType === 'signUp' && (signUpForm)}
             {formType === 'confirmSignUp' && (confirmationCode)}
             {formType === 'signIn' && (signIn)}
            </Paper>
            </Grid>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>We will use this as your Username</Typography>
            </Popover>
        </Grid>
    );
}

export default Signin;