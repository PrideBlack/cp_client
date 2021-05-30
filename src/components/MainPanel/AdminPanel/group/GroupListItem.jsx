import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Star } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export const GroupListItem = (props) => {
    const history = useHistory();

    return (
        <ListItem button onClick={() => history.push(`/group-change/${props.group.id}`)}>
            <ListItemIcon>
                <Star />
            </ListItemIcon>
            <ListItemText primary={props.group.name} />
        </ListItem>
    );
};
