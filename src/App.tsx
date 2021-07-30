import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Profile} from "./components/profile/Profile";
import {Error404} from "./common/Error404/Error404";
import {EnterNewPassword} from "./components/enterNewPassword/Enter-new-password";
import {PasswordRecovery} from "./components/passwordRecovery/Password-recovery";
import {Registration} from "./components/registration/Registration";
import {Navbar, RoutePath} from "./components/navbar/Navbar";
import {CheckEmail} from "./components/passwordRecovery/ChekEmail";
import {PacksList} from "./components/packsList/PacksList";
import { CardsList } from './components/cardsList/CardsList';
import {useSelector} from "react-redux";
import {AppStateType} from "./state/redux-store";

function App() {
  return (
      <div className="App">
        <Navbar />
        <main className={'mainContainer'}>
          <Switch>
            <Route exact path={'/'} render={() => <Profile/>}/>
            <Route path={RoutePath.LEARNING_CARDS} render={() => <div>Hi!</div>}/>
            <Route exact path={RoutePath.LOGIN} render={() => <Login/>}/>
            <Route path={RoutePath.PROFILE} render={() => <Profile/>}/>
            <Route path={RoutePath.NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
            <Route exact path={RoutePath.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
            <Route path={RoutePath.PASSWORD_RECOVERY_CHECK_EMAIL} render={() => <CheckEmail/>}/>
            <Route exact path={RoutePath.REGISTRATION} render={() => <Registration/>}/>
            <Route exact path={RoutePath.PACKS_LIST} render={() => <PacksList/>}/>
            <Route exact path={RoutePath.CARDS_LIST} render={() => <CardsList/>}/>
            <Route path={'*'} render={() => <Error404/>}/>
          </Switch>
        </main>
      </div>
  );
}

export default App;
