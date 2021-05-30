import {Route} from "react-router-dom";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import MainPanel from "./MainPanel";
import AddUser from "./AdminPanel/addUser/AddUser";
import AddBlock from "./AdminPanel/add-block/AddBlock";
import ListBlocks from "./AdminPanel/ListBlocks";
import Block from "./AdminPanel/Block";

const MainPanelRoute = () => {
    return <div>
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPanel/>
                </Route>
                <Route path="/user-add">
                    <AddUser/>
                </Route>
                <Route path="/block-add">
                    <AddBlock/>
                </Route>
                <Route path="/blocks">
                    <ListBlocks/>
                </Route>
                <Route path="/block/:id" component={Block} />
            </Switch>
        </Router>
    </div>
}

export default MainPanelRoute