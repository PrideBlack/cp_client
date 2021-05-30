import React from "react";
import {useDispatch, useSelector} from "react-redux";
import AdminPanel from "./AdminPanel/AdminPanel";
import './MainPanel.css'
import {getUserInfoById} from "../../actions/user";
import {logout} from "../../reducers/userReducer";
import InfoPanel from "./InfoPanel/InfoPanel";
import GroupListPanel from "./GroupListPanel/GroupListPanel";

const MainPanel = () => {
    const id = useSelector(state => state.user.currentUser.user_id)
    const role = useSelector(state => state.user.currentUser.role)
    const dispatch = useDispatch()
    dispatch(getUserInfoById(id))
    return (
        <div className="panel_back">
            <InfoPanel/>
            {role === "ADMIN" && <AdminPanel/>}
            <button className="btn_logout" onClick={() => dispatch(logout())}>Выйти</button>
        </div>
    )
}

export default MainPanel