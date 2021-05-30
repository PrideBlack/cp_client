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

const AddBlock = () => {
    const classes = useStyles();
    const [name, setName] = useState("")
    const history = useHistory()

    const create = () => {
        axios.post("http://localhost:8080/theme", {
            name,
        }).then((x) => {
            history.goBack();
        })
    }

    return <div>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="standard-basic"
                label="Name"
                value={name}
                onChange={(x) => setName(x.target.value)}
            />
            <Button variant="contained" onClick={() => create()}>Создать</Button>
        </form>
    </div>
}

export default AddBlock