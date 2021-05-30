import React from "react";
import './AdminPanel.css'
import { useHistory } from "react-router-dom";

const AdminPanel = () => {
    const history = useHistory()
    return (
        <div className="admin_panel_back">
            <button className="btn_add_student" onClick={() => history.push("/user-add")}>Добавить студента</button>
            <button className="btn_add_block" onClick={() => history.push("/block-add")}>Создать блок с задачами</button>
            <button className="btn_add_block" onClick={() => history.push("/blocks")}>Блоки</button>
            <button className="btn_add_group">Создать учебную группу</button>
            <button className="btn_refresh_table">Обновить таблицу</button>
        </div>
    )
}
export default AdminPanel