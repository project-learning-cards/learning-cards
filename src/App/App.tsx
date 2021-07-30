import React from 'react';
import s from './App.module.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {Error404} from "../components/Error404/Error404";
import {EnterNewPassword} from "../features/EnterNewPassword/Enter-new-password";
import {PasswordRecovery} from "../features/PasswordRecovery/Password-recovery";
import {Registration} from "../features/Registration/Registration";
import {Navbar, UrlPath} from "../features/Navbar/Navbar";
import {CheckEmail} from "../features/PasswordRecovery/ChekEmail";
import {PacksList} from "../features/PacksList/PacksList";
import { CardsList } from '../features/CardsList/CardsList';

function App() {
  return (
      <div className="App">
        <Navbar />
        <main className={s.mainContainer}>
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
        </main>
      </div>
  );
}

export default App;
