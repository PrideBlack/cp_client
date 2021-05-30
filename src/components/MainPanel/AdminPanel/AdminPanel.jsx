import React from 'react';
import './AdminPanel.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
    const history = useHistory();
    return (
        <div className="admin_panel_back">
            <button className="btn_add_student" onClick={() => history.push('/user-add')}>
                Добавить студента
            </button>
            <button className="btn_add_block" onClick={() => history.push('/block-add')}>
                Создать блок с задачами
            </button>
            <button className="btn_add_block" onClick={() => history.push('/blocks')}>
                Блоки
            </button>
            <button className="btn_add_group" onClick={() => history.push('/group-add')}>
                Создать учебную группу
            </button>
            <button className="btn_add_group" onClick={() => history.push('/groups')}>
                Учебные группы
            </button>
            <button
                className="btn_refresh_table"
                onClick={() =>
                    axios.get('http://localhost:8080/user/parse-user').then((res) => alert(res.data.message))
                }>
                Обновить таблицу
            </button>
        </div>
    );
};
export default AdminPanel;
