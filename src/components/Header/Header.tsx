import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UrlPath } from '../../features/Navbar/Header';
import s from './Header.module.scss'

type HeaderPropsType = {

}
export const Header: React.FC<HeaderPropsType> = ({ }) => {
    const [choosen, setChoosen] = useState(true)
    const onProfileClick = () => {
        setChoosen(true)
    }
    const onPacksListClick = () => {
        setChoosen(false)
    }
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                <h2>MAP</h2>
            </div>
            <div
                className={choosen ? s.chosenBtn : s.MainBtn}
                onClick={onProfileClick}
            >
                <NavLink className={s.link} to={UrlPath.PROFILE}>Profile</NavLink></div>
            <div
                className={!choosen ? s.chosenBtn : s.MainBtn}
                onClick={onPacksListClick}
            ><NavLink className={s.link} to={UrlPath.PACKS_LIST}>Packs list</NavLink></div>
        </div>
    )
}