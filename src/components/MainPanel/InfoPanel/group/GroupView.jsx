import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Link } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export const GroupView = (props) => {
    const [table, setTable] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/training-group?id=${props.id}`)
            .then((res) => res.data)
            .then((res) => {
                setTable(res);
            });
    }, [props.id]);

    if (!table) return <></>;

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Grid container justify={'center'}>
                <h1>{table.name}</h1>
                <Grid item container spacing={2}>
                    {table.listTheme.map((x) => {
                        return (
                            <Grid item key={x.id}>
                                <Paper>
                                    <Grid container justify={'center'}>
                                        <Typography
                                            className={classes.title}
                                            variant="h6"
                                            id="tableTitle"
                                            component="div">
                                            {x.name}
                                        </Typography>
                                        <TableContainer>
                                            <Table className={classes.table} aria-label="simple table" size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Пользователь</TableCell>
                                                        {x.listTask.map((y) => {
                                                            return (
                                                                <TableCell key={y.id} align="right">
                                                                    <Link target="_blank" href={y.link}>
                                                                        {y.name}
                                                                    </Link>
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {x.listUser.map((y) => (
                                                        <TableRow key={y.name}>
                                                            <TableCell component="th" scope="row">
                                                                {y.lastName} {y.firstName} {y.patronymic}
                                                            </TableCell>
                                                            {y.listAttempt.map((z, index) => (
                                                                <>
                                                                    <TableCell key={index} align="right">
                                                                        <span
                                                                            onMouseEnter={handlePopoverOpen}
                                                                            onMouseLeave={handlePopoverClose}>
                                                                            {z &&
                                                                                `${z.result ? '+' : '-'} ${
                                                                                    z.numberOfAttempts
                                                                                }`}
                                                                        </span>
                                                                    </TableCell>
                                                                    {z && (
                                                                        <Popover
                                                                            id="mouse-over-popover"
                                                                            className={classes.popover}
                                                                            classes={{
                                                                                paper: classes.paper,
                                                                            }}
                                                                            open={open}
                                                                            anchorEl={anchorEl}
                                                                            anchorOrigin={{
                                                                                vertical: 'bottom',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            transformOrigin={{
                                                                                vertical: 'top',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            onClose={handlePopoverClose}
                                                                            disableRestoreFocus>
                                                                            <Typography>{z.language}</Typography>
                                                                        </Popover>
                                                                    )}
                                                                </>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};
