import React, {useEffect, useState} from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import Mentions from "./components/Mentions";
import Alerts from "./components/Alerts";
import Signin from "./components/Signin";
import Profile from './components/Profile'
import Podcasts from './components/Podcasts'


import { ThemeProvider } from '@material-ui/core/styles'
import theme from './components/ui/Theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import UserContext from "./context/UserContext";
import {Auth} from "aws-amplify";
import useMediaQuery from "@material-ui/core/useMediaQuery";



function App() {
    const [mentions, setMentions] = useState([])
    const [userToken, setUserToken] = useState('')
    const [user, setUser] = useState(null)
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

    const getData=()=>{
        fetch('MOCK_DATA.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                setMentions(myJson)
                console.log(myJson);
            });
    }

    const checkUser = async () => {
        let authorizedUser;
        authorizedUser = await Auth.currentAuthenticatedUser()
        if (!user) {
            setUser(authorizedUser)
        }
        return authorizedUser
    }

    const checkSizes = () => {
        if (matchesMD)
            console.log('medium')
        else if (matchesSM)
            console.log('small')
        else if (matchesXS)
            console.log('extra small')
        else
            console.log('lg')
    }


    useEffect(() => {
        getData()
        checkSizes()
        checkUser()
            .then(user => {
                console.log(user)
            }).catch(err => {
                console.log(err)
        })
        const token = localStorage.getItem('token')
        if(token) {
            setUserToken(token)
        }

    }, [user, matchesSM, matchesXS, matchesMD])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [value, setValue] = useState(0)
    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{user, setUser}}>
             <BrowserRouter>
                <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} user={user} setUser={setUser}/>
                <Switch>
                    <Route exact path='/dashboard' render={(props) =>  <Dashboard {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                    <Route exact path='/signup' render={(props) =>  <Signup {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} token={userToken} setUser={setUser}/>} />
                    <Route exact path='/mentions' render={(props) =>  <Mentions {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                    <Route exact path='/alerts' render={(props) =>  <Alerts {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                    {!user && <Route exact path='/signin' render={(props) =>  <Signin {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />}
                    <Route exact path='/profile' render={(props) =>  <Profile {...props} user={user} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                    <Route exact path='/podcasts' render={(props) =>  <Podcasts {...props} user={user} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                </Switch>
             </BrowserRouter>
            </UserContext.Provider>
        </ThemeProvider>


    );
}

export default App;