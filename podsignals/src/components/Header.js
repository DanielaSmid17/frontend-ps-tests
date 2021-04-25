import React, {useState} from "react";
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

const useStyles = makeStyles(theme => ({
    appBar: {
        color: theme.palette.common.red,
        height: '3em',
        zIndex: theme.zIndex.modal + 1,
        maxHeight: '1em'
    },
    tabContainer: {
        marginLeft: "auto",
        alignItems: 'center'
    },
    tab: {
        ...theme.typography.tab,
        justifyItems: "center",
        marginTop: '.5em',
    }
}))


export default function Header() {
    const [value, setValue] = useState(0)

    const classes = useStyles()
    const theme = useTheme()

    const headerOptions = [
        {name: 'Home', link: '/', activeIndex: 1},
        {name: 'Podcasts', link: '/podcasts', activeIndex: 2},
        {name: 'About us', link: '/about', activeIndex: 3},
        {name: 'Contact us', link: '/contact', activeIndex: 4},

    ]

    const handleHeaderChange = (e, newIndex) => {
        
    }

  /*  const tabs = (
        <React.Fragment>
            <Tabs>
                {headerOptions.map(() => (
                <Tab className={classes.tab}
                     component={link}
                     onMouseOver
                     label={name}
                     />
                ))}
            </Tabs>
        </React.Fragment>
    )*/


    return(
        <AppBar position='fixed' color='primary'>
            <ToolBar disableGutters onChange={handleHeaderChange}>
                <Tabs value={value} className={classes.tabContainer}>
                    <Tab className={classes.tab} label='Home' value={value} />
                    <Tab className={classes.tab} label='Podcast' value={value} />
                    <Tab className={classes.tab} label='About us' value={value} />
                    <Tab className={classes.tab} label='Contact' value={value} />
                </Tabs>
            </ToolBar>
        </AppBar>
    )

}