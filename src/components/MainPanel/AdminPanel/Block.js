import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {useHistory} from "react-router-dom";

const Block = (props) => {
    const [problems, setProblems] = useState([]);
    const [nameProblem, setNameProblem] = useState("")
    const [link, setLink] = useState("")
    const history = useHistory()

    const addProblem = () => {
        axios.post("http://localhost:8080/task", {
            idTheme: props.match.params.id,
            name: nameProblem,
            link: link
        }).then((x) => {
            history.goBack();
        })
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Name problem"
                value={nameProblem}
                onChange={(x) => setNameProblem(x.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Link"
                value={link}
                onChange={(x) => setLink(x.target.value)}
            />
            <Button variant="contained" onClick={() => addProblem()}>Создать</Button>
        </div>
    )
}

export default Block;