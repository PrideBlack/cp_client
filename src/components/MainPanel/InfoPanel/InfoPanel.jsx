import React from 'react';
import './InfoPanel.css';
import { useSelector } from 'react-redux';

const InfoPanel = () => {
    const firstName = useSelector((state) => state.user.infoUser?.firstName);
    const lastName = useSelector((state) => state.user.infoUser?.lastName);
    const middleName = useSelector((state) => state.user.infoUser?.patronymic);
    const handle = useSelector((state) => state.user.infoUser?.handle);
    const role = useSelector((state) => state.user.infoUser?.role);
    return (
        <div className="info_panel_back">
            <div>Имя: {lastName}</div>
            <div>Фамилия: {firstName}</div>
            <div>Отчество: {middleName}</div>
            <div>Роль: {role}</div>
            <div>CodeForces handle: {handle}</div>
        </div>
    );
};

export default InfoPanel;
