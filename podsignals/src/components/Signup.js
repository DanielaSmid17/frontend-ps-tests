import React, {useContext} from 'react';
import { Auth } from 'aws-amplify'
import Button from "@material-ui/core/Button";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    signupButton: {
        backgroundColor: '#4285F4',
        fontFamily: 'Raleway',
        color: "white",
        marginLeft: '1em',
        '&:hover': {
            backgroundColor: '#4285F4',
        }
    }
}))

function Signup(props) {
    const classes = useStyles()
    const theme = useTheme()
    let config = {
        headers: {
            authorization: "Bearer " + props.token,
        }}

    const checkUser = async () => {
       const user = await Auth.currentAuthenticatedUser()
        console.log(user)
        const token = user.signInUserSession.accessToken.jwtToken
        console.log(token)
        localStorage.setItem('token', token)
    }



    const checkToken = async () => {
        const data = await axios.get('https://flfjwco4u8.execute-api.us-east-2.amazonaws.com/test/hello?message=hello', config)
        console.log(data)
    }
    return (
        <Grid container direction='column'>
            <Grid item container direction='row' justify='center'>
                <Button className={classes.signupButton} onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>Sign in with Google</Button>
                <Button className={classes.signupButton} onClick={() => {
                    Auth.federatedSignIn();
                }}>Sign in</Button>
                <Button className={classes.signupButton} onClick={checkUser}>User</Button>
                <Button className={classes.signupButton} onClick={checkToken}>Check token</Button>
                <Button className={classes.signupButton} onClick={() => Auth.signOut()}>Sign out</Button>


            </Grid>
        </Grid>
    );
}

export default  Signup;