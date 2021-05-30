import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddUser = () => {
    const classes = useStyles();
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [handle, setHandle] = useState("")
    const [role, setRole] = useState("")
    const history = useHistory("")

    const create = () => {
        axios.post("http://localhost:8080/registration", {
            login,
            password,
            email,
            firstName,
            lastName,
            patronymic,
            handle,
            role,
        }).then((x) => {
            history.goBack();
        })
    }

    return <div>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="standard-basic"
                label="Login"
                value={login}
                onChange={(x) => setLogin(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="password"
                value={password}
                onChange={(x) => setPassword(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="email"
                value={email}
                onChange={(x) => setEmail(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="firstName"
                value={firstName}
                onChange={(x) => setFirstName(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="lastName"
                value={lastName}
                onChange={(x) => setLastName(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="patronymic"
                value={patronymic}
                onChange={(x) => setPatronymic(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="handle"
                value={handle}
                onChange={(x) => setHandle(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="role"
                value={role}
                onChange={(x) => setRole(x.target.value)}
            />
            <Button variant="contained" onClick={() => create()}>Создать</Button>
        </form>
    </div>
}

export default AddUser