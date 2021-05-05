import React, {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";

import axios from 'axios'

const useStyles = makeStyles(theme => ({


}))


function Signin(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [formState, setFormState] = useState(
        {username: '', password: '', email: '', authCode: '', formType: 'signUp'})
    const [userInfo, setUserInfo] = useState({token: '', email: ''})
    const [signUpError, setSignUpError] = useState('')
    const [signInError, setSignInError] = useState('')
    const [authorizationCodeError, setAuthorizationCodeError] = useState('')

    const onChange = e => {
        e.persist()
        setFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
        console.log(formState)
    }
    const { formType } = formState

    const handleSignUp = async () => {
        const {username, email, password} = formState
        try{
        const signUpUser = await Auth.signUp({username, password, attributes: {email}})
        setUserInfo({...userInfo, token: signUpUser["user"]["pool"]["storage"]["token"], email: signUpUser["user"]["username"]})
        setFormState(() => ({...formState, formType: 'confirmSignUp'}))
        setSignUpError('')
        } catch (err) {
            setSignUpError(err.message)
        }
    }

    const handleConfirmSignUp = async () => {
        const { username, authCode } = formState
        try{
        const success = await Auth.confirmSignUp(username, authCode)
        setFormState(() => ({ ...formState, formType: 'signIn' }))
        setAuthorizationCodeError('')
            if (success) {
                const {token, email} = userInfo
                let config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                console.log(email, config)
                try {
                  const userinDB = await axios.post('https://ftjvbicmz3.execute-api.us-east-2.amazonaws.com/dev/signup', {email}, config)
                    console.log(userinDB)
                } catch (err) {
                    console.log(err)
                }
            }
        } catch(err) {
            console.log('error confirm', err)
            setAuthorizationCodeError(err.message)
        }


    }

    const resendAuthorizationCode = async () => {
            try {
                await Auth.resendSignUp(formState.username);
                console.log('code resent successfully');
            } catch (err) {
                console.log('error resending code: ', err);
            }

    }


    const handleSignIn = async () => {
        const { username, password } = formState
        try {
        const signinUser = await Auth.signIn({ username, password })
            setFormState(() => ({username: '', password: '', email: '', authCode: '', formType: 'signUp'}))
            setSignInError('')
            if (signinUser) {
                const token = signinUser["signInUserSession"]["idToken"]["jwtToken"]
                let config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = await axios.get('https://ftjvbicmz3.execute-api.us-east-2.amazonaws.com/dev/login', config)
                const responseToken = data.data
                if (responseToken){
                    localStorage.setItem('token', responseToken)
                    window.location='/dashboard'
                }
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
                <FormGroup>
                    <TextField name='username' onChange={onChange}  label="Username" />
                    <TextField name='email' onChange={onChange}  label="Email" />
                    <TextField name='password' type='password' onChange={onChange}  placeholder='Password' label="Password" />
                </FormGroup>
                {signUpError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{signUpError}</Typography>}
                <FormHelperText>Already have an account? <Button style={{backgroundColor:'white', color: theme.palette.secondary.dark}} onClick={() => setFormState(() => ({ ...formState, formType: 'signIn' })) }>Sign in</Button></FormHelperText>
                <Button onClick={handleSignUp} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Sign up</Button>
            </FormControl>

        </React.Fragment>
    )

    const signIn = (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography variant='h3' style={{fontSize: '30px'}}>Sign in</Typography>
                <FormGroup>
                    <TextField name='username' onChange={onChange}  placeholder='Username' label="Username" />
                    <TextField name='password' type='password' onChange={onChange}  placeholder='Password' label="Password" />
                </FormGroup>
                {signInError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{signInError}</Typography>}
                <FormHelperText>Don't have an account? <Button style={{backgroundColor:'white', color: theme.palette.secondary.dark}} onClick={() => setFormState(() => ({ ...formState, formType: 'signUp' })) }>Sign Up</Button></FormHelperText>
                <Button onClick={handleSignIn} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Sign in</Button>
            </FormControl>

        </React.Fragment>
    )
    const confirmationCode = (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography variant='h3' style={{fontSize: '18px'}}>Verification code</Typography>
                <Typography variant='body2'>We just sent you a <span style={{fontWeight: 900}}>verification code</span> to the email you provided, please enter it here.</Typography>
                <FormGroup>
                    <TextField name='authCode' onChange={onChange}  placeholder='Authorization code' label="Authorization code" />
                </FormGroup>
                {authorizationCodeError && <Typography variant='body2' style={{color: theme.palette.common.red}}>{authorizationCodeError}</Typography>}
                <FormHelperText>Didn't get a code? <Button onClick={resendAuthorizationCode} style={{backgroundColor:'white', color: theme.palette.secondary.dark, fontSize: '18px'}}>Resend code</Button></FormHelperText>
                <Button onClick={handleConfirmSignUp} style={{backgroundColor: theme.palette.primary.light, color: 'white', fontFamily: 'Raleway'}}>Confirm code</Button>
            </FormControl>

        </React.Fragment>
    )


    return (

        <Grid container style={{marginLeft: '40em', marginTop: '5em'}} >

            {formType === 'signUp' && (signUpForm)}

            {formType === 'confirmSignUp' && (confirmationCode)}

            {formType === 'signIn' && (signIn)}


        </Grid>
    );
}

export default Signin;