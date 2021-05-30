import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupListItem } from './GroupListItem';
import List from '@material-ui/core/List';

export const ListGroups = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/training-group/all')
            .then((res) => res.data)
            .then((res) => {
                setList(res);
            });
    }, []);

    return (
        <List component="nav" aria-label="secondary mailbox folders">
            {list.map((x) => (
                <GroupListItem key={x.id} group={x} />
            ))}
        </List>
    );
};
