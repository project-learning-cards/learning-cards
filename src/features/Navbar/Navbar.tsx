import React from "react";
import s from './Navbar.module.scss';
import { NavLink } from "react-router-dom";

export const RoutePath = {
    REGISTRATION: '/registration',
    LOGIN: '/login',
    PASSWORD_RECOVERY: '/password-recovery',
    SET_NEW_PASSWORD: '/set-new-password/:resetPasswordToken',
    PROFILE: '/profile',
    PACKS_LIST: '/packs-list',
    LEARNING_CARDS: '/learning-cards',
    NEW_PASSWORD: '/new-password/:token',
    PASSWORD_RECOVERY_CHECK_EMAIL: '/password-recovery-check-email/:email',
    CARDS_LIST: '/cards-list/:id'
}


export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={RoutePath.PROFILE} activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item + "" + s.active}>
                <NavLink to={RoutePath.LOGIN} activeClassName={s.activeLink}>login</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/new-password" activeClassName={s.activeLink}>new password</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to={RoutePath.PASSWORD_RECOVERY} activeClassName={s.activeLink}>password recovery</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/password-recovery-check-email" activeClassName={s.activeLink}>check email</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to={RoutePath.REGISTRATION} activeClassName={s.activeLink}>registration</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/test-components" activeClassName={s.activeLink}>test components</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to={RoutePath.PACKS_LIST} activeClassName={s.activeLink}>packs list</NavLink>
            </div>
        </nav>
    )
}