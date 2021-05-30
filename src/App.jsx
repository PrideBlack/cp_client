import Auth from "./components/authorization/Auth";
import {useSelector} from "react-redux";
import MainPanel from "./components/MainPanel/MainPanel";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPanelRoute from "./components/MainPanel/MainPanelRoute";
import Container from '@material-ui/core/Container';

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    return (
        <Router>
            <Container maxWidth="sm">
                {!isAuth ? <Auth/> : <MainPanelRoute/>}
            </Container>
        </Router>
    )
}

export default App;
