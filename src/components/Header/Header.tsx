import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.scss';
import {useTranslation} from "react-i18next";
import {PATH} from "../routes/Pages";

type HeaderPropsType = {}

export const Header: React.FC<HeaderPropsType> = ({}) => {
    const {t,} = useTranslation()
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
                <h2>{t('MAP')}</h2>
            </div>
            <NavLink onClick={onProfileClick} className={`${s.link} + ${choosen ? s.chosenBtn : s.MainBtn}`}
                     to={PATH.PROFILE}>{t('profile')}
            </NavLink>
            <NavLink onClick={onPacksListClick} className={`${s.link} + ${!choosen ? s.chosenBtn : s.MainBtn}`}
                     to={PATH.PACKS_LIST}>{t('packs_lists')}
            </NavLink>
        </div>
    )
}