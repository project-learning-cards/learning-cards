import React from "react";
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/login" activeClassName={s.activeLink}>login</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/new-password" activeClassName={s.activeLink}>new password</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to="/password-recovery" activeClassName={s.activeLink}>password recovery</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/password-recovery-check-email" activeClassName={s.activeLink}>check email</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to="/registration" activeClassName={s.activeLink}>registration</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/test-components" activeClassName={s.activeLink}>test components</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to="/packs-list" activeClassName={s.activeLink}>packs list</NavLink>
            </div>
        </nav>
    )
}
