import React from "react";

const GroupButton = (props) => {
    const idGroup = props.id
    const nameGroup = props.name
    return (
        <button>{nameGroup}</button>
    )
}

export default GroupButton