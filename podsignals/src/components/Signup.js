import React, {useEffect} from 'react';
import {Auth} from 'aws-amplify'
import Button from "@material-ui/core/Button";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {authUrlBase} from './utils/urls.js'
import Typography from "@material-ui/core/Typography";



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
    let token = localStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const checkToken = async () => {
        try {
            const data = await axios.get('https://txyiugba0d.execute-api.us-east-2.amazonaws.com/v1/authorizer', config)
            console.log(data.data)

        } catch(err){
            console.log(err)
        }

    }

    const jsonConfig = JSON.stringify(config)

    const signin = () => {
        console.log('entro aca')
        Auth.federatedSignIn({provider: 'Google'});
    }

    const setUser = async () => {
        const user = await Auth.currentAuthenticatedUser()
        props.setUser(user)
        token = user.signInUserSession.accessToken.jwtToken
        console.log(user, token)
    }

    const checkLambda = async () => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const data = await axios.post(`${authUrlBase}/auth-access`,{}, config)
        alert(data.data.message)
    }

    useEffect(() =>{
        setUser()
    }, [])


    return (
        <Grid container direction='column' style={{marginTop: '4em'}}>
            <Grid item container direction='row' justify='center'>
                <Button className={classes.signupButton} onClick={signin}>Sign in with Google</Button>
                <Button className={classes.signupButton} onClick={() => {
                    Auth.federatedSignIn();
                }}>Sign in</Button>
                <Button className={classes.signupButton} onClick={() => setUser()}>User</Button>
                <Button className={classes.signupButton} onClick={checkToken}>Check token</Button>
                <Button className={classes.signupButton} onClick={() => {
                    Auth.signOut();
                    props.setUser('')
                }}>Sign out</Button>
                <Button className={classes.signupButton} onClick={checkLambda}>Check lambda</Button>

            </Grid>
        </Grid>
    );
}

export default  Signup;