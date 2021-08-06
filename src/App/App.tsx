import React from 'react';
import "antd/dist/antd.css"
import {Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {Error404} from "../components/Error404/Error404";
import {EnterNewPassword} from "../features/EnterNewPassword/Enter-new-password";
import {PasswordRecovery} from "../features/PasswordRecovery/Password-recovery";
import {Registration} from "../features/Registration/Registration";
import {Header, UrlPath} from "../features/Navbar/Header";
import {CheckEmail} from "../features/PasswordRecovery/ChekEmail";
import {PacksList} from "../features/PacksList/PacksList";
import {CardsList} from "../features/CardsList/CardsList";
import {useSelector} from 'react-redux';
import {AppStateType} from "./redux-store"
import {AppStatusType} from "./app-reducer";
import {PreloaderForApp} from "../components/Preloader/Preloader";
import {Layout} from "antd";


function App() {
    const {Content, Footer} = Layout;

    const initialization = useSelector<AppStateType, AppStatusType>(state => state.app.appStatus)

    if (initialization === "loading") return <PreloaderForApp/>
    return (
        <Layout>
            <Header/>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                    <Switch>
                        <Route exact path={"/"} render={() => <Profile/>}/>
                        <Route path={UrlPath.LEARNING_CARDS} render={() => <div>Hi!</div>}/>
                        <Route exact path={UrlPath.LOGIN} render={() => <Login/>}/>
                        <Route path={UrlPath.PROFILE} render={() => <Profile/>}/>
                        <Route path={UrlPath.NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
                        <Route exact path={UrlPath.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                        <Route path={UrlPath.PASSWORD_RECOVERY_CHECK_EMAIL} render={() => <CheckEmail/>}/>
                        <Route exact path={UrlPath.REGISTRATION} render={() => <Registration/>}/>
                        <Route exact path={UrlPath.PACKS_LIST} render={() => <PacksList/>}/>
                        <Route exact path={UrlPath.CARDS_LIST} render={() => <CardsList/>}/>
                        <Route path={'*'} render={() => <Error404/>}/>
                    </Switch>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>MAP ©2021 All Right Reserved</Footer>
        </Layout>


    );
}

export default App;
