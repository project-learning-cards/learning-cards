import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './redux-store';
import '../assets/i18n/i18n';
import { Header } from '../components/Header/Header';
import s from './App.module.scss';
import { Routes } from '../components/routes/Routes';
import { AuthStatusEnum, AuthUser } from '../features/Login/login-reducer';
import { Redirect, useLocation } from 'react-router-dom';
import { PATH } from '../components/routes/Pages';
import { PreloaderForApp } from '../components/Preloader/Preloader';

const App = () => {
  const authStatus = useSelector<AppStateType, AuthStatusEnum>((state) => state.login.authStatus);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (authStatus === AuthStatusEnum.unknown) dispatch(AuthUser());
  }, [dispatch, authStatus]);

  if (authStatus === AuthStatusEnum.unknown) return <PreloaderForApp />;
  if (authStatus === AuthStatusEnum.notAuthorized && pathname !== PATH.LOGIN) return <Redirect to={PATH.LOGIN} />;

  return (
    <div className={s.wrapper}>
      <div className={authStatus !== AuthStatusEnum.authorized ? s.headerBlock : s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
