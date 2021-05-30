import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormControl, Grid, Link } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const Block = (props) => {
    const [problems, setProblems] = useState([]);
    const [nameProblem, setNameProblem] = useState('');
    const [link, setLink] = useState('');
    const [theme, setTheme] = useState(null);
    const history = useHistory();

    const addProblem = () => {
        axios
            .post('http://localhost:8080/task', {
                idTheme: props.match.params.id,
                name: nameProblem,
                link: link,
            })
            .then(() => {
                setTheme((prev) => ({
                    ...prev,
                    tasks: [
                        ...prev.tasks,
                        {
                            name: nameProblem,
                            link: link,
                        },
                    ],
                }));
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/theme?id=${props.match.params.id}`)
            .then((res) => res.data)
            .then((res) => {
                setTheme(res);
            });
    }, [props.match.params.id]);

    return (
        <Grid container spacing={2} direction={'column'}>
            <Grid item>
                <Paper elevation={2}>
                    <Grid container direction={'column'} spacing={2}>
                        <Grid item container justify={'center'}>
                            <TextField
                                label="Name problem"
                                value={nameProblem}
                                onChange={(x) => setNameProblem(x.target.value)}
                            />
                        </Grid>
                        <Grid item container justify={'center'}>
                            <TextField label="Link" value={link} onChange={(x) => setLink(x.target.value)} />
                        </Grid>
                        <Grid item container justify={'center'}>
                            <Button variant="contained" onClick={() => addProblem()}>
                                Создать
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {theme && (
                <Grid item container spacing={2} direction={'column'}>
                    {theme.tasks.map((x) => (
                        <Grid item key={x.name}>
                            <Paper elevation={2} style={{ padding: '1rem' }}>
                                <h1>{x.name}</h1>
                                <Link target="_blank" href={x.link}>
                                    {x.link}
                                </Link>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default Block;
