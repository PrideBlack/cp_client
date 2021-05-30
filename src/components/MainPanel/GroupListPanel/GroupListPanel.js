import React from "react";
import GroupButton from "./GroupButton/GroupButton";
import {useSelector} from "react-redux";

const GroupListPanel = () => {
    const groupElements = useSelector(state => state.user.infoUser.group).map(group =>
        <li key={group.id}>
            <GroupButton id={group.id} name={group.name}/>
        </li>
    )
    return (
        <ul>
            {groupElements}
        </ul>
    )
}

export default GroupListPanel