import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPanel from './MainPanel';
import AddUser from './AdminPanel/addUser/AddUser';
import AddBlock from './AdminPanel/add-block/AddBlock';
import ListBlocks from './AdminPanel/ListBlocks';
import Block from './AdminPanel/Block';
import React from 'react';
import { ListGroups } from './AdminPanel/group/ListGroups';
import { GroupChange } from './AdminPanel/group/GroupChange';
import { GroupView } from './InfoPanel/group/GroupView';

const MainPanelRoute = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MainPanel />
                    </Route>
                    <Route path="/group/:id" render={(e) => <GroupView id={e.match.params.id} />} />
                    <Route path="/user-add">
                        <AddUser />
                    </Route>
                    <Route path="/block-add">
                        <AddBlock />
                    </Route>
                    <Route path="/blocks">
                        <ListBlocks />
                    </Route>
                    <Route path="/block/:id" component={Block} />
                    <Route path="/group-change/:id" render={(e) => <GroupChange id={e.match.params.id} />} />
                    <Route path="/group-add">
                        <GroupChange />
                    </Route>
                    <Route path="/groups">
                        <ListGroups />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default MainPanelRoute;
