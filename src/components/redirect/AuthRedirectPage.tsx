import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStatusType } from "../../App/app-reducer";
import { AppStateType } from "../../App/redux-store";
import { PreloaderForApp } from "../Preloader/Preloader";
import { PATH } from "../routes/Pages";

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type AuthRedirectPagePropsType = DivPropsType & {}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {
        children,
        ...restProps
    }
) => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const initializing = useSelector<AppStateType, AppStatusType>(state => state.app.appStatus)

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN} />;
    if (initializing === "loading") return <PreloaderForApp />
    return (
        <>
            <div {...restProps}>
                {children}
            </div>
        </>
    );
});

export default AuthRedirectPage;
