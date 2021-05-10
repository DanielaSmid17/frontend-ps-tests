import React, {useState} from 'react';
import AddAlertDialog from "./AddAlertDialog";


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

    }

}))

const alertsOptions = [
    {keyword: 'Google', type: 'SMS', created: '12.02.21'},
    {keyword: 'Decathlon', type: 'Email', created: '28.11.20'},
    {keyword: 'Playtika', type: 'Email', created: '7.09.20'},
    {keyword: 'Adidas', type: 'SMS', created: '21.05.20'},
    {keyword: 'Strauss', type: 'SMS', created: '30.03.20'},
]
const alertHeaders = ['Keyword', 'Alert type', 'Created on']


function Alerts(props) {

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogClickOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = (value) => {
        setOpenDialog(false);
    };

    const classes = useStyles()
    const theme = useTheme()
    const matchesMD = theme.breakpoints.down('md')
    const matchesSM = theme.breakpoints.down('sm')

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
                        {alertsOptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((alert) =>(
                            <TableRow>
                                <TableCell><Checkbox name="checkedC" size={matchesSM ? 'small' : 'medium'} /></TableCell>
                                <TableCell className={classes.tableCell}>{alert.keyword}</TableCell>
                                <TableCell className={classes.tableCell}>{alert.type} </TableCell>
                                <TableCell className={classes.tableCell}>{alert.created}</TableCell>
                            </TableRow>))}
                    </TableBody>
                </TableContainer>
            </Table>
        </React.Fragment>
    )

    const alertButtons = (
        <React.Fragment>
            <Grid item container direction='row' lg style={{marginTop: '2em', width:'50%'}} justify='center'>
                <Grid item>
                    <Button className={classes.alertButton} onClick={handleDialogClickOpen} style={{backgroundColor: theme.palette.secondary.dark, color: 'white'}}>Add<AddIcon style={{fontSize: 'small', color: 'white'}}/></Button>
                </Grid>
                <Grid item>
                    <Button className={classes.alertButton} style={{backgroundColor: theme.palette.primary.dark, color: 'white'}}>Delete<RemoveIcon style={{fontSize: 'small', color: 'white'}} /></Button>
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
                <Grid item container direction='row' style={{marginTop: '2em', width:'40%'}}>
                    <Grid item>
                        {alertsTable}
                    </Grid>
                    <Grid item>
                        {alertButtons}
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
                    </Grid>
                </Grid>

            </Hidden>
            <AddAlertDialog  open={openDialog} onClose={handleDialogClose} />
        </Grid>

    );
}

export default Alerts;