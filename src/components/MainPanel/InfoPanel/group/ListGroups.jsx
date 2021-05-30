import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Star } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const ListGroups = () => {
    const group = useSelector((state) => state.user.infoUser?.group);
    const history = useHistory();

    if (!group) return <></>;

    return (
        <List component="nav" aria-label="secondary mailbox folders">
            {group.map((x) => (
                <ListItem key={x.id} button onClick={() => history.push(`/group/${x.id}`)}>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText primary={x.name} />
                </ListItem>
            ))}
        </List>
    );
};
