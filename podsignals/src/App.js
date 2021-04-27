import React, {useState} from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './components/ui/Theme'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [value, setValue] = useState(0)
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                <Switch>
                    <Route exact path='/dashboard' render={(props) =>  <Dashboard {...props} setValue={setValue} setSelectedIndex={setSelectedIndex} />} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>


    );
}

export default App;