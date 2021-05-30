import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const ListBlocks = () => {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        create();
    }, []);

    const create = () => {
        axios.get('http://localhost:8080/theme/all').then((x) => {
            setBlocks(x.data);
        });
    };

    return (
        <div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Blocks
                    </ListSubheader>
                }
                className={classes.root}>
                {blocks != null &&
                    blocks.map((x) => {
                        return (
                            <ListItem button onClick={() => history.push('/block/' + x.id)}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary={x.name} />
                            </ListItem>
                        );
                    })}
            </List>
        </div>
    );
};

export default ListBlocks;
