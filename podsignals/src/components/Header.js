import React, {useState, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {Link} from 'react-router-dom'
// import logo from '../assets/images/logo.svg'

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
        minWidth: 10,
        marginLeft: '25px'
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
        backgroundColor: theme.palette.common.red
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
        zIndex: theme.zIndex.modal + 1
    }
}))

export default function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
// this useMediaQuery function tells us the size of the vp, thats how we can start building a responsive webapp
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

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

    const menuOptions = [
        {name: "Podcasts", link: "/podcasts", activeIndex: 1, selectedIndex: 0},
        {name: "Alerts", link: "/alerts", activeIndex: 1, selectedIndex: 1},
        {name: "Mentions", link: "/mentions", activeIndex: 1, selectedIndex: 2},
    ]

    const routes = [
        {name: "Home", link:"/", activeIndex: 0},
        {name: "Podcasts", link:"/podcasts", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopUp: anchorEl ? true : undefined, mouseOver: e => handleMenuClick(e)  },
        {name: "Signin", link:"/signin", activeIndex: 2},
        {name: "About us", link:"/about", activeIndex: 3},
        {name: "Contact", link:"/contact", activeIndex: 4},
    ]

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
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


    }, [props.value, menuOptions, props.selectedIndex, routes, props])
    const tabs = (
        <React.Fragment>
            <Tabs value={props.value}
                  onChange={handleTabChange}
                  className={classes.tabContainer}
            >
                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />

                ))}
            </Tabs>
            <Button component={Link} to='/estimate' onClick={()=> props.setValue(5)} variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
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
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{root: classes.menuItem}}
                        onClick={(event) => {handleMenuItemClick(event, i); props.setValue(1); handleMenuClose()}}
                        selected={i===props.selectedIndex && props.value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={()=> setOpenDrawer(false)}
                onOpen={()=> setOpenDrawer(true)}
                classes={{paper: classes.drawer}} >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map(route =>(
                        <ListItem
                            onClick={()=> {setOpenDrawer(false); props.setValue(route.activeIndex)}}
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
                    <ListItem classes={{root: classes.drawerItemEstimate}} onClick={() => {setOpenDrawer(false); props.setValue(5)}} divider button component={Link} to='/estimate' selected={props.value  === 5}>
                        <ListItemText disableTypography className={classes.drawerItem}>Free estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer}onClick={()=> setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar disableGutters>
                        {/*<Button component={Link} to='/' disableRipple onClick={() => props.setValue(0)}className={classes.logoContainer} >*/}
                        {/*    <img src={logo} alt='company logo' className={classes.logo}/>*/}
                        {/*</Button>*/}
                        {matchesSM ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}