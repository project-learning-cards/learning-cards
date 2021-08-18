import React, { useState } from "react";
import {Link} from "react-router-dom";
import {Col, Layout, Menu, Row, Switch, Typography} from "antd";
import {languages} from "../../assets/i18n/languages"
import i18next from "i18next"
import {useTranslation} from "react-i18next"

const { Title } = Typography;

export const UrlPath = {
    REGISTRATION: "/registration",
    LOGIN: "/login",
    PASSWORD_RECOVERY: "/password-recovery",
    SET_NEW_PASSWORD: "/set-new-password/:resetPasswordToken",
    PROFILE: "/profile",
    PACKS_LIST: "/packs-list",
    LEARNING_CARDS: "/learning-cards/",
    LEARN_CARDS: "/learn/",
    NEW_PASSWORD: "/new-password/:token",
    PASSWORD_RECOVERY_CHECK_EMAIL: "/password-recovery-check-email/:email",
    CARDS_LIST: "/cards-list/",
    EDIT_PACK_NAME: "/edit/"
}


export const Header = () => {
    const {t} = useTranslation()
    const [language, setLanguage] = useState<boolean>(true)
    const {Header} = Layout;

    const handleClick = () => {
        if (language) {
            setLanguage(false)
            i18next.changeLanguage(languages[1].code)
        } else {
            setLanguage(true)
            i18next.changeLanguage(languages[0].code)
        }
    }

    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <Row>
                <Col span={6}>
                    <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', zIndex: 2}}>
                        <Title style={{color: 'white'}} level={3}>{t('card_training')}</Title>
                    </div>
                </Col>
                <Col span={12}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{position: 'relative', display: 'flex',justifyContent: 'center'}}>
                        <Menu.Item key="1"><Link to={UrlPath.PACKS_LIST}>{t('packs_lists')}</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={UrlPath.PROFILE}>{t('profile')}</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={6}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', zIndex: 2, height: '100%'}}>
                        <Switch checkedChildren={languages[0].name} unCheckedChildren={languages[1].name} onClick={handleClick} checked={language} />
                    </div>
                </Col>
            </Row>

        </Header>

        /* <nav className={s.nav}>
             <div className={s.item}>
                 <NavLink to={UrlPath.PROFILE} activeClassName={s.activeLink}>Profile</NavLink>
             </div>
             <div className={s.item + "" + s.active}>
                 <NavLink to={UrlPath.LOGIN} activeClassName={s.activeLink}>login</NavLink>
             </div>
             {/!*<div className={s.item}>*!/}
             {/!*    <NavLink to="/new-password" activeClassName={s.activeLink}>new password</NavLink>*!/}
             {/!*</div>*!/}
             <div className={s.item}>
                 <NavLink to={UrlPath.PASSWORD_RECOVERY} activeClassName={s.activeLink}>password recovery</NavLink>
             </div>
             {/!*<div className={s.item}>*!/}
             {/!*    <NavLink to="/password-recovery-check-email" activeClassName={s.activeLink}>check email</NavLink>*!/}
             {/!*</div>*!/}
             <div className={s.item}>
                 <NavLink to={UrlPath.REGISTRATION} activeClassName={s.activeLink}>registration</NavLink>
             </div>
             {/!*<div className={s.item}>*!/}
             {/!*    <NavLink to="/test-components" activeClassName={s.activeLink}>test components</NavLink>*!/}
             {/!*</div>*!/}
             <div className={s.item}>
                 <NavLink to={UrlPath.PACKS_LIST} activeClassName={s.activeLink}>packs list</NavLink>
             </div>
         </nav>*/
    )
}
