import React, {useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Avatar from "@material-ui/core/Avatar";
import avatar from './ui/images/avatar.png'
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    table: {
        maxWidth: 1200,
        width: 900
    },
    iconButton: {
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    tableCell: {
        fontFamily: "Raleway",
        fontWeight: 700
    },
}))


function MentionsTable(props) {
    const classes = useStyles()
    const theme = useTheme()

    const [play, setPlay] = useState(false)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const tableHeaders = ["Date", "Mention", "Pod", "Episode", "Time", "Podcast", "Play"]

    const tableRows = (
        <React.Fragment>
            <TableRow>
                {tableHeaders.map((option) =>(
                    <TableCell className={classes.tableCell} style={{color: theme.palette.secondary.dark}}>{option}</TableCell>
                ))}
            </TableRow>
            {props.mentions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((mention) =>(
                <TableRow key={mention.index}>
                    <TableCell className={classes.tableCell}>{mention.date}</TableCell>
                    <TableCell className={classes.tableCell}>{mention.mention}</TableCell>
                    <TableCell className={classes.tableCell}><Grid item direction='row'><Avatar src={avatar} style={{height:'25px', width: '25px'}} />{mention.pod}</Grid> </TableCell>
                    <TableCell className={classes.tableCell}>{mention.episode}</TableCell>
                    <TableCell className={classes.tableCell}>{mention.time}</TableCell>
                    <TableCell className={classes.tableCell}>{mention.podcast}</TableCell>
                    <TableCell className={classes.tableCell}><Button className={classes.iconButton} style={{marginLeft: '-1em'}}>{!play ? <PlayArrowIcon style={{fontSize: 'small'}}/> : <PauseIcon style={{fontSize: 'small'}}/>}</Button></TableCell>
                </TableRow>
            ))}
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <TableContainer className={classes.table}>
                <Table>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.mentions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{fontFamily: 'Raleway'}}
            />
            </TableContainer>
        </React.Fragment>
    );
}

export default MentionsTable;