import React, {useState} from "react";
import './Auth.css'
import Input from "../../utils/Input/Input";
import {useDispatch} from "react-redux";
import {authorization} from "../../actions/user";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    return (
        <div className="auth_back">
            <div className="auth_header">Авторизация</div>
            <Input
                value={login}
                setValue={setLogin}
                type="text"
                placeholder="Логин"
            />
            <Input
                value={password}
                setValue={setPassword}
                type="password"
                placeholder="Пароль"
            />
            <button className="send_form" onClick={() => dispatch(authorization(login,password))}>Войти</button>
        </div>
    )
}

export default Auth