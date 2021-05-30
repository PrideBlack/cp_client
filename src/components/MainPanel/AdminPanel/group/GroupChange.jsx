import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Title } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b, selector) {
    return a.filter((value) => (selector ? b.map(selector) : b).indexOf(selector ? selector(value) : value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export const GroupChange = (props) => {
    const classes = useStyles();
    const [checkedThemes, setCheckedThemes] = React.useState([]);
    const [checkedUsers, setCheckedUsers] = React.useState([]);
    const [name, setName] = useState('');
    const [isFetch, setFetch] = useState(false);
    const [isLoadThemes, setLoadThemes] = useState(false);
    const [isLoadUsers, setLoadUsers] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [themes, setThemes] = useState([]);
    const [users, setUsers] = useState([]);
    const [leftThemes, setLeftThemes] = useState([]);
    const [leftUsers, setLeftUsers] = useState([]);
    const [rightThemes, setRightThemes] = useState([]);
    const [rightUsers, setRightUsers] = useState([]);
    const history = useHistory();

    const leftThemesChecked = intersection(checkedThemes, leftThemes);
    const rightThemesChecked = intersection(checkedThemes, rightThemes);
    const leftUsersChecked = intersection(checkedUsers, leftUsers);
    const rightUsersChecked = intersection(checkedUsers, rightUsers);

    const handleToggleThemes = (value) => () => {
        const currentIndex = checkedThemes.indexOf(value);
        const newChecked = [...checkedThemes];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedThemes(newChecked);
    };

    const numberOfCheckedThemes = (items) => intersection(checkedThemes, items).length;

    const handleToggleAllThemes = (items) => () => {
        if (numberOfCheckedThemes(items) === items.length) {
            setCheckedThemes(not(checkedThemes, items));
        } else {
            setCheckedThemes(union(checkedThemes, items));
        }
    };

    const handleCheckedRightThemes = () => {
        setRightThemes(rightThemes.concat(leftThemesChecked));
        setLeftThemes(not(leftThemes, leftThemesChecked));
        setCheckedThemes(not(checkedThemes, leftThemesChecked));
    };

    const handleCheckedLeftThemes = () => {
        setLeftThemes(leftThemes.concat(rightThemesChecked));
        setRightThemes(not(rightThemes, rightThemesChecked));
        setCheckedThemes(not(checkedThemes, rightThemesChecked));
    };

    const handleToggleUsers = (value) => () => {
        const currentIndex = checkedUsers.indexOf(value);
        const newChecked = [...checkedUsers];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedUsers(newChecked);
    };

    const numberOfCheckedUsers = (items) => intersection(checkedUsers, items).length;

    const handleToggleAllUsers = (items) => () => {
        if (numberOfCheckedThemes(items) === items.length) {
            setCheckedUsers(not(checkedUsers, items));
        } else {
            setCheckedUsers(union(checkedUsers, items));
        }
    };

    const handleCheckedRightUsers = () => {
        setRightUsers(rightUsers.concat(leftUsersChecked));
        setLeftUsers(not(leftUsers, leftUsersChecked));
        setCheckedUsers(not(checkedUsers, leftUsersChecked));
    };

    const handleCheckedLeftUsers = () => {
        setLeftUsers(leftUsers.concat(rightUsersChecked));
        setRightUsers(not(rightUsers, rightUsersChecked));
        setCheckedUsers(not(checkedUsers, rightUsersChecked));
    };

    const onSubmit = (e) => {
        e.stopPropagation();

        setFetch(true);
        if (props.id) {
            axios
                .patch('http://localhost:8080/training-group', {
                    id: props.id,
                    addTheme: not(rightThemes, themes, (x) => x.id).map((x) => x.id),
                    deleteTheme: not(themes, rightThemes, (x) => x.id).map((x) => x.id),
                    addUsers: not(rightUsers, users, (x) => x.id).map((x) => x.id),
                    deleteUsers: not(users, rightUsers, (x) => x.id).map((x) => x.id),
                })
                .then(() => {
                    history.goBack();
                    setFetch(false);
                });
        } else {
            axios.post('http://localhost:8080/training-group', { name }).then(() => {
                history.goBack();
                setFetch(false);
            });
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:8080/theme/all')
            .then((res) => res.data)
            .then((res) => {
                setLeftThemes(
                    res.map((x) => ({
                        id: x.id,
                        name: x.name,
                    })),
                );
                setLoadThemes(true);
            });

        axios
            .get('http://localhost:8080/user/all?role=USER')
            .then((res) => res.data)
            .then((res) => {
                setLeftUsers(
                    res.map((x) => ({
                        id: x.id,
                        fio: `${x.lastName} ${x.firstName} ${x.patronymic}`,
                    })),
                );
                setLoadUsers(true);
            });
    }, []);

    useEffect(() => {
        if (!isLoadThemes) return;
        if (!isLoadUsers) return;

        setLoad(true);
    }, [isLoadThemes, isLoadUsers]);

    useEffect(() => {
        if (!props.id) return;
        if (!isLoad) return;

        setFetch(true);
        axios.get(`http://localhost:8080/training-group?id=${props.id}`).then((res) => {
            setName(res.data.name);
            if (res.data.listTheme) {
                const rt = res.data.listTheme.map((x) => ({
                    id: x.id,
                    name: x.name,
                }));
                setRightThemes(rt);
                setLeftThemes((prevState) => not(prevState, rt, (x) => x.id));
                setThemes(rt);
            }
            if (res.data.listUser) {
                const ru = res.data.listUser.map((x) => ({
                    id: x.id,
                    fio: `${x.lastName} ${x.firstName} ${x.patronymic}`,
                }));
                setRightUsers(ru);
                setLeftUsers((prevState) => not(prevState, ru, (x) => x.id));
                setUsers(ru);
            }
            setFetch(false);
        });
    }, [props.id, isLoad]);

    const customListTheme = (title, items, selectorLabelList) => (
        <Card>
            <CardHeader
                avatar={
                    <Checkbox
                        onClick={handleToggleAllThemes(items)}
                        checked={numberOfCheckedThemes(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfCheckedThemes(items) !== items.length && numberOfCheckedThemes(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfCheckedThemes(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={`${selectorLabelList ? selectorLabelList(value) : value}`}
                            role="listitem"
                            button
                            onClick={handleToggleThemes(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedThemes.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${selectorLabelList ? selectorLabelList(value) : value}`}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    const customListUser = (title, items, selectorLabelList) => (
        <Card>
            <CardHeader
                avatar={
                    <Checkbox
                        onClick={handleToggleAllUsers(items)}
                        checked={numberOfCheckedUsers(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfCheckedUsers(items) !== items.length && numberOfCheckedUsers(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfCheckedUsers(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={`${selectorLabelList ? selectorLabelList(value) : value}`}
                            role="listitem"
                            button
                            onClick={handleToggleUsers(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedUsers.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${selectorLabelList ? selectorLabelList(value) : value}`}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <form noValidate autoComplete="off">
            {!props.id ? (
                <TextField disabled={isFetch} label="Название" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
                <h1 style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                    Название группы: <b>{name}</b>
                </h1>
            )}
            {props.id && (
                <>
                    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                        <Grid item>{customListTheme('Темы', leftThemes, (x) => `${x.id}. ${x.name}`)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRightThemes}
                                    disabled={leftThemesChecked.length === 0}
                                    aria-label="move selected right">
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeftThemes}
                                    disabled={rightThemesChecked.length === 0}
                                    aria-label="move selected left">
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>{customListTheme('Выбранные', rightThemes, (x) => `${x.id}. ${x.name}`)}</Grid>
                    </Grid>
                    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                        <Grid item>{customListUser('Пользователи', leftUsers, (x) => `${x.id}. ${x.fio}`)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRightUsers}
                                    disabled={leftUsersChecked.length === 0}
                                    aria-label="move selected right">
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeftUsers}
                                    disabled={rightUsersChecked.length === 0}
                                    aria-label="move selected left">
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>{customListUser('Выбранные', rightUsers, (x) => `${x.id}. ${x.fio}`)}</Grid>
                    </Grid>
                </>
            )}
            <Button variant="outlined" onClick={onSubmit} disabled={isFetch}>
                Сохранить
            </Button>
        </form>
    );
};
