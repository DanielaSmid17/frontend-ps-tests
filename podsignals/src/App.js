import React, {useEffect, useState} from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './components/ui/Theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
    const [mentions, setMentions] = useState([])
    const [userToken, setUserToken] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            setUserToken(token)
        }

    }, [])
    console.log(mentions)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [value, setValue] = useState(0)
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                <Switch>
                    <Route exact path='/dashboard' render={(props) =>  <Dashboard {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                    <Route exact path='/signup' render={(props) =>  <Signup {...props} mentions={mentions} setValue={setValue} setSelectedIndex={setSelectedIndex} token={userToken}/>} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>


    );
}

export default App;