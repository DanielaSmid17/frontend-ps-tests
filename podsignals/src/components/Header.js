import React, {useState, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {Link} from 'react-router-dom'


function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        //weather or not there is a little delay
        disableHysteresis: true,
        // how does does the user have to go in order to trigger the scroll
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down('md')]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]:{
            height: '7em'
        },
        [theme.breakpoints.down('xs')]:{
            height: "5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 5,
        marginLeft: '25px',
        marginTop: '.5em'
    },
    button: {
        ...theme.typography.button,
        borderRadius: '50px',
        marginRight: "25px",
        marginLeft: "50px",
        Height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu: {
        backgroundColor: theme.palette.common.red,
        color: "white",
        borderRadius: 0
    },
    menuItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
        color: 'white'

    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.red,
        zIndex: 1009
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.pink,
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        }
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1,
        height: '5em'
    },
    avatar: {
        fontFamily: 'Raleway',
        marginTop: '.5em'
    }
}))

export default function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
// this useMediaQuery function tells us the size of the vp, thats how we can start building a responsive webapp
    const matches = useMediaQuery(theme.breakpoints.down("md"))


    const [openDrawer, setOpenDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openMenu, setOpenMenu] = useState(false)


    const handleTabChange = (e, newValue) => {
        props.setValue(newValue)
    }

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }

    const handleMenuClose = (e) =>{
        setAnchorEl(true)
        setOpenMenu(false)

    }

    const handleMenuItemClick = (e, i) =>{
        setAnchorEl(null)
        setOpenMenu(true)
        props.setSelectedIndex(i)
    }

    const profileOptions = [
        {name: "Profile", link: "/profile", activeIndex: 5, selectedIndex: 0},
        {name: "Account", link: "/account", activeIndex: 5, selectedIndex: 1},
    ]

    const routes = [
        {name: "Dashboard", link:"/dashboard", activeIndex: 0},
        {name: "Profile", link:"/profile", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopUp: anchorEl ? true : undefined, mouseOver: e => handleMenuClick(e)  },
        {name: "Mentions", link:"/mentions", activeIndex: 2},
        {name: "Alerts", link:"/about", activeIndex: 3},
        {name: "API", link:"/contact", activeIndex: 4},
    ]

    useEffect(() => {
        [...profileOptions, ...routes].forEach(route => {
            switch(window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex)
                        if(route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                default:
                    break;
            }
        })


    }, [props.value, profileOptions, props.selectedIndex, routes, props])
    const tabs = (
        <React.Fragment>
            <Tabs value={props.value}
                  onChange={handleTabChange}
                  className={classes.tabContainer}
            >
                <Grid container direction='row' alignItems='center' style={{marginRight: '2em'}}>
                    <Avatar className={classes.avatar}>DS</Avatar>
                        <Tab
                            key='1'
                            className={classes.tab}
                            component={Link}
                            to='/profile'
                            label='Profile'
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup={anchorEl ? true : undefined}
                            onMouseOver={ e => handleMenuClick(e)}
                        />


                </Grid>
            </Tabs>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                classes={{paper: classes.menu}}
                MenuListProps={{onMouseLeave: handleMenuClose}}
                elevation={0}
                style={{zIndex: 1302}}
                keepMounted>
                {profileOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{root: classes.menuItem}}
                        onClick={(event) => {handleMenuItemClick(event, i); props.setValue(2); handleMenuClose()}}
                        selected={i===props.selectedIndex && props.value === 2}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <Drawer
                variant="permanent"
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open
                onClose={()=> setOpenDrawer(false)}
                onOpen={()=> setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
                style={{zIndex: 1009}}>
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map(route =>(
                        <ListItem
                            key={route.link}
                            onClick={()=> {
                                props.setValue(route.activeIndex); props.setSelectedIndex(undefined)
                            }}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            classes={{selected: classes.drawerItemSelected}}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>{route.name}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar disableGutters>
                        {tabs}
                    </Toolbar>
                    <Toolbar>
                        {drawer}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}