import Auth from './components/authorization/Auth';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPanelRoute from './components/MainPanel/MainPanelRoute';
import Container from '@material-ui/core/Container';
import React from 'react';

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    return (
        <Router>
            <Container maxWidth="sm">{!isAuth ? <Auth /> : <MainPanelRoute />}</Container>
        </Router>
    );
}

export default App;
