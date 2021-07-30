import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {Error404} from "../components/Error404/Error404";
import {EnterNewPassword} from "../features/EnterNewPassword/Enter-new-password";
import {PasswordRecovery} from "../features/PasswordRecovery/Password-recovery";
import {Registration} from "../features/Registration/Registration";
import {Navbar, RoutePath} from "../features/Navbar/Navbar";
import {CheckEmail} from "../features/PasswordRecovery/ChekEmail";
import {PacksList} from "../features/PacksList/PacksList";
import { CardsList } from '../features/CardsList/CardsList';
import {useSelector} from "react-redux";

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
