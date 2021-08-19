import React, { useEffect } from 'react';
import "antd/dist/antd.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from "./redux-store"
import '../assets/i18n/i18n';
import { Header } from '../components/Header/Header';
import s from './App.module.scss'
import { Routes } from '../components/routes/Routes';
import { AuthUser } from '../features/Login/login-reducer';
import { AppStatusType } from './app-reducer';


const App = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoggedIn) dispatch(AuthUser()) //отправить запрос ми если отсутствует id юзера
    }, []);

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    return (
        <div className={s.wrapper}>
            <div className={isLoggedIn ? s.header : s.headerBlock}>
                <Header />
            </div>
            <div className={s.content}>
                <Routes />
            </div>
        </div>
    );
}

export default App;
