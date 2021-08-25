import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.scss';
import {useTranslation} from "react-i18next";
import {PATH} from "../routes/Pages";

type HeaderPropsType = {

}
export const Header: React.FC<HeaderPropsType> = ({ }) => {
    const {t,} = useTranslation()
    const [choosen, setChoosen] = useState(true)
/*    const [checked, setChecked] = useState(true)*/
    const onProfileClick = () => {
        setChoosen(true)
    }
    const onPacksListClick = () => {
        setChoosen(false)
    }
/*    const onLanguageChange = () => {
        if (checked) {
            setChecked(false)
            i18n.changeLanguage('ru')
        } else {
            setChecked(true)
            i18n.changeLanguage('en')
        }
    }*/
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                <h2>{t('MAP')}</h2>
            </div>
            <div
                className={choosen ? s.chosenBtn : s.MainBtn}
                onClick={onProfileClick}
            >
                <NavLink className={s.link} to={PATH.PROFILE}>{t('profile')}</NavLink></div>
            <div
                className={!choosen ? s.chosenBtn : s.MainBtn}
                onClick={onPacksListClick}
            ><NavLink className={s.link} to={PATH.PACKS_LIST}>{t('packs_lists')}</NavLink></div>
           {/* <div className={s.changeLanguage}>
                <Switch checkedChildren="English" unCheckedChildren="Русский" checked={checked} onClick={onLanguageChange} />
            </div>*/}
        </div>
    )
}