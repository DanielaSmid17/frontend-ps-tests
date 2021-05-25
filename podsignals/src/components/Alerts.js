import React, {useState, useEffect} from 'react';
import AddAlertDialog from "./AddAlertDialog";
import DeleteAlertsDialog from "./DeleteAlertsDialog";


import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from '@material-ui/core/TableHead'
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


import jwt_decode from "jwt-decode";
import { CSVLink } from "react-csv";


import { API, graphqlOperation } from 'aws-amplify'
import { getAlertsByUser } from '../GraphQL/Queries';




const useStyles = makeStyles(theme => ({
    alertButton: {
        fontSize: '16px',
        fontFamily: 'Raleway',
        marginLeft: '0.75em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px'
        }
    },
    tableCell: {
        fontFamily: "Raleway",
        fontWeight: 700,
        fontSize: '20px',
        [theme.breakpoints.down('md')]: {
            fontSize: '17px'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px'
        },

    },
    dataButton: {
        fontSize: '12px',
        fontFamily: 'Raleway',
        marginLeft: '0.75em',
    }

}))

const alertHeaders = ['Keyword', 'Alert type', 'Created on']
  

function Alerts(props) {
    const classes = useStyles()
    const theme = useTheme()
    const matchesMD = theme.breakpoints.down('md')
    const matchesSM = theme.breakpoints.down('sm')

    const token = localStorage.getItem('tokenDB')
    const userPayload = jwt_decode(token)
    const clientId = userPayload.client_id


    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [alerts, setAlerts] = useState([])
    const [alertsToRemove, setAlertsToRemove] = useState([])

    const fetchAlerts = async () => {
        try{
            const alertsFetch = await API.graphql(graphqlOperation(getAlertsByUser, {clientId: clientId}))
            const alertsList = alertsFetch.data.getAlertsByUser
            setAlerts(alertsList)
        } catch(err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchAlerts()
    }, [openDeleteDialog, openCreateDialog])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleCreateDialogClickOpen = () => {
        setOpenCreateDialog(true);
    };

    const handleCreateDialogClose = () => {
        setOpenCreateDialog(false);
    };
    const handleDeleteDialogClickOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClickClose = () => {
        setOpenDeleteDialog(false);
    };

    

    const handleCheckBoxChange = e => {
        let alertsToRemoveCopy = [...alertsToRemove]
        if(alertsToRemoveCopy.includes(e.target.id)) {
            const index = alertsToRemoveCopy.indexOf(e.target.id)
            alertsToRemoveCopy.splice(index, 1)
        } else {
        alertsToRemoveCopy.push(e.target.id)
        }
        setAlertsToRemove(alertsToRemoveCopy)
        console.log(alertsToRemove)
    }



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const alertsTable = (
        <React.Fragment>
            <Table style={{width: matchesSM ? 200 :  matchesMD ? 400 : 500}}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Checkbox size={matchesSM ? 'small' : 'medium'} /></TableCell>
                            {alertHeaders.map((option) => (
                                <TableCell className={classes.tableCell} style={{color: theme.palette.secondary.dark}}>{option}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alerts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((alert) =>(
                            <TableRow key={alert.id}>
                                <TableCell><Checkbox name="checkedC" onChange={handleCheckBoxChange} id={alert.id} size={matchesSM ? 'small' : 'medium'} /></TableCell>
                                <TableCell className={classes.tableCell}>{alert.keyword}</TableCell>
                                <TableCell className={classes.tableCell}>{alert.type} </TableCell>
                                <TableCell className={classes.tableCell}>{alert.created_at.split('T')[0]}</TableCell>
                            </TableRow>))}
                    </TableBody>
                </TableContainer>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={props.mentions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{fontFamily: 'Raleway'}}
            />
        </React.Fragment>
    )

    const alertButtons = (
        <React.Fragment>
            <Grid item container direction='row' lg style={{marginTop: '1em', width: 168}} justify='center'>
                <Grid item>
                    <Button className={classes.alertButton} onClick={handleCreateDialogClickOpen} style={{backgroundColor: theme.palette.secondary.dark, color: 'white'}}>Add<AddIcon style={{fontSize: 'small', color: 'white'}}/></Button>
                </Grid>
                <Grid item>
                    <Button className={classes.alertButton} onClick={handleDeleteDialogClickOpen} style={{backgroundColor: theme.palette.primary.dark, color: 'white'}} disabled={alertsToRemove.length === 0}>Delete<RemoveIcon style={{fontSize: 'small', color: 'white'}} /></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )

    const dataButtons = (
        <React.Fragment>
        <Grid item container direction='row' lg style={{marginTop: '1em', width: 168}} justify='center'>
            <Grid item>
                <Button className={classes.dataButton}  style={{backgroundColor: theme.palette.secondary.light, color: 'white'}}>Import<ArrowDownwardIcon style={{fontSize: 'small', color: 'white'}}/></Button>
            </Grid>
            <Grid item>
            <CSVLink data={alerts}><Button className={classes.dataButton}  style={{backgroundColor: theme.palette.primary.light, color: 'white', textDecoration: 'none'}}>Export<ArrowUpwardIcon style={{fontSize: 'small', color: 'white'}} /></Button></CSVLink>
            </Grid>
        </Grid>
    </React.Fragment>

    )


    return (
        <Grid container direction='column' alignItems='center' style={{width: '90%', marginLeft: matchesSM ? '1em' : '6em'}}>
            <Grid item style={{marginTop: matchesSM ? '2.5em' : undefined, marginLeft: matchesMD ? '4em' : undefined}}>
                <Typography variant='h3'>Your Alerts</Typography>
            </Grid>
            <Hidden mdDown>
                <Grid item container direction='row' justify='center' style={{marginTop: '2em'}}>
                    <Grid item>
                        {alertsTable}
                    </Grid>
                    <Grid item>
                        {alertButtons}
                        {dataButtons}
                    </Grid>

                </Grid>
            </Hidden>
            <Hidden lgUp>
                <Grid item container direction='column' alignItems='center'>
                    <Grid item>
                        {alertButtons}
                    </Grid>
                    <Grid item>
                        {alertsTable}
                        {dataButtons}
                    </Grid>
                </Grid>

            </Hidden>
            <AddAlertDialog  open={openCreateDialog} onClose={handleCreateDialogClose} />
            <DeleteAlertsDialog  open={openDeleteDialog} onClose={handleDeleteDialogClickClose} alerts={alertsToRemove} />
        </Grid>

    );
}

export default Alerts;