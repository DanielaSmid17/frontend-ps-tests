import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag'
import {useGQLQuery} from "./utils/useGQLQuery";
import {dynamicSort} from "./utils/functions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MentionsTable from "./MentionsTable";
import LineChart from "./LineChart";



const useStyles = makeStyles(theme => ({
    gridItem: {
        backgroundColor: 'white'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    menuItem: {
        fontFamily: "Raleway",
        fontWeight: 800
    },
    tableComponent: {
        width: '20em',
        marginTop: '1em',
        marginBottom: '1em'
    },
    tableCell: {
        fontFamily: "Raleway",
        fontWeight: 700
    }

}))

const get_mentions = gql`
    query{
      getAllMentions {
        date
        mention
        total_mentions
        pod
        episode
        time
      }
    }
`;

function Dashboard(props) {
    const classes = useStyles()
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        sumTotalMentions(props)
    }, []);


    const [topMentions, setTopMentions] = useState([
        {mention: 'Oracle', total_mentions: 65},
        {mention: 'Coca-cola', total_mentions: 56},
        {mention: 'Lemonade', total_mentions: 50}
    ])
    const [totalMentions, setTotalMentions] = useState(0)

    const sumTotalMentions = () => {
        let sum = 0
        for (const mention in props.mentions) {
            sum += props.mentions[mention].total_mentions
        }
        console.log(sum)
        setTotalMentions(sum)

    }





    // const topThreeMentions = (mentions) => {
    //     const top = mentions.sort(dynamicSort("total_mentions")).slice(0, 3)
    //     console.log(top)
    //     setTopMentions(top)
    // }
    // topThreeMentions(props.mentions)


/*    const { data, isLoading, error } =  useGQLQuery('mentions', get_mentions)*/


    const [graphTime, setGraphTime] = useState(7)
    const [open, setOpen] = useState(false);

    const handleChange = e => {
        setGraphTime(e.target.value)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };





    return (
        <Grid container direction='column' style={{ height: '1000px', width: '92%'}} >
                <Grid item align='right' style={{marginRight: matchesMD ? '4em' : '12em', marginTop: '2em'}} >
                    <FormControl className={classes.formControl}  >
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={graphTime}
                            onChange={handleChange}
                            disableUnderline={true}
                            style={{fontFamily: "Raleway", backgroundColor: 'white', fontWeight: 650 }}
                        >
                            <MenuItem value={1} className={classes.menuItem}>Today</MenuItem>
                            <MenuItem value={3} className={classes.menuItem}>Last 3 days</MenuItem>
                            <MenuItem value={7} className={classes.menuItem}>Last 7 days</MenuItem>
                            <MenuItem value={30} className={classes.menuItem}>Last 30 days</MenuItem>
                        </Select>
                    </FormControl>
            </Grid>
            <Grid item container direction='row' style={{backgroundColor: 'white', marginLeft: '5em', marginTop: '2em'}} justify='center' spacing={2}>
                <Grid container direction='column' alignItems='center' lg style={{marginLeft: '2em', width: '100%'}} justify='center'>
                   <Grid item className={classes.gridItem} >
                      <Typography variant='h2'>
                         Mentions
                      </Typography>
                   </Grid>
                    <Grid item>
                        <LineChart />
                    </Grid>
                </Grid>
                <Grid container direction={"column"} align='center' lg>
                    <Grid item style={{marginBottom: '3em'}}>
                        <Typography variant='h3'>Total Mentions: <span style={{color: "black"}}>{totalMentions}</span></Typography>
                    </Grid>
                    <Grid item style={{marginRight: '11em'}}>
                        <Typography variant='h2'>Top 3 mentions</Typography>
                    </Grid>
                    <Grid item>
                        <TableContainer component={Paper} className={classes.tableComponent}>
                            <Table className={classes} aria-label="simple table">
                                <TableBody>
                                        <TableRow key='top 1'>
                                            <TableCell align="left" className={classes.tableCell}>{topMentions[0].mention}</TableCell>
                                            <TableCell align="left" className={classes.tableCell}>{topMentions[0].total_mentions}</TableCell>
                                        </TableRow>
                                    <TableRow key='top 2'>
                                        <TableCell align="left" className={classes.tableCell}>{topMentions[1].mention}</TableCell>
                                        <TableCell align="left" className={classes.tableCell}>{topMentions[1].total_mentions}</TableCell>
                                    </TableRow>
                                    <TableRow key='top 3'>
                                        <TableCell align="left" className={classes.tableCell}>{topMentions[2].mention}</TableCell>
                                        <TableCell align="left" className={classes.tableCell}>{topMentions[2].total_mentions}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                lg
                style={{ height: "200px", marginLeft: '7em', marginTop: '5em'}}
                justify='center'>
                <Grid item alignItems='center'>
                   <MentionsTable mentions={props.mentions} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;