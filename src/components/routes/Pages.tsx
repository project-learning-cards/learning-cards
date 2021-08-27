import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { CardsList } from "../../features/CardsList/CardsList";
import { EnterNewPassword } from "../../features/EnterNewPassword/Enter-new-password";
import { Login } from "../../features/Login/Login";
import { PacksList } from "../../features/PacksList/PacksList";
import { PasswordRecovery } from "../../features/PasswordRecovery/Password-recovery";
import { Profile } from "../../features/Profile/Profile";
import { Registration } from "../../features/Registration/Registration";
import AuthRedirectPage from "../redirect/AuthRedirectPage";



export type PageType = {
    _id: number;
    title: string;
    path?: string;
    params?: string;
    exact?: boolean;
    page: ReactNode;
};

export const PATH = {
    REGISTRATION: "/registration",
    LOGIN: "/login",
    PASSWORD_RECOVERY: "/password-recovery",
    SET_NEW_PASSWORD: "/set-new-password",
    PROFILE: "/profile",
    PACKS_LIST: "/packs-list",
    LEARNING_CARDS: "/learning-cards/",
    LEARN_CARDS: "/learn/",
    NEW_PASSWORD: "/new-password/:token",
    PASSWORD_RECOVERY_CHECK_EMAIL: "/password-recovery-check-email/:email",
    CARDS_LIST: "/cards-list/",
    EDIT_PACK_NAME: "/edit-pack/",
    EDIT_CARD_NAME: "/edit-card/"

};

export const pages: PageType[] = [
    { _id: 0, title: "main", path: "/", exact: true, page: <Redirect to={PATH.PROFILE} /> },
    { _id: 1, title: "login", path: PATH.LOGIN, exact: true, page: <Login /> },
    { _id: 2, title: "register", path: PATH.REGISTRATION, exact: true, page: <Registration /> },
    { _id: 3, title: "forgot", path: PATH.PASSWORD_RECOVERY, exact: true, page: <PasswordRecovery /> },
    { _id: 4, title: "setPass", path: PATH.SET_NEW_PASSWORD, params: "/:resetPasswordToken", exact: true, page: <EnterNewPassword /> },
    {
        _id: 7, title: "profile", path: PATH.PROFILE, exact: true,
        page: <AuthRedirectPage><Profile /></AuthRedirectPage>
    },
    {
        _id: 8, title: "packs", path: PATH.PACKS_LIST, exact: true,
        page: <AuthRedirectPage><PacksList /></AuthRedirectPage>
    },
    {
        _id: 9, title: "cards", path: PATH.CARDS_LIST, params: ":id", exact: true,
        page: <AuthRedirectPage><CardsList /></AuthRedirectPage>
    },


    { _id: 9999, title: "error404", page: <div>error404</div> }
];
