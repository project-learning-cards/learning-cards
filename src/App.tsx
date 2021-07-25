import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Profile} from "./components/profile/Profile";
import {Error404} from "./common/Error404/Error404";
import {EnterNewPassword} from "./components/enterNewPassword/Enter-new-password";
import {PasswordRecovery} from "./components/passwordRecovery/Password-recovery";
import {Registration} from "./components/registration/Registration";
import {Navbar} from "./components/navbar/Navbar";
import {CheckEmail} from "./components/passwordRecovery/ChekEmail";
import {PacksList} from "./components/packsList/PacksList";
import { CardsList } from './components/cardsList/CardsList';
import {useSelector} from "react-redux";
import {AppStateType} from "./state/redux-store";

function App() {
  const auth = true
  return (
      <div className="App">
        <Navbar />
        <main className={'mainContainer'}>
          <Switch>
            <Route exact path={'/'} render={() => <Profile/>}/>
            <Route path={'/learning-cards/'} render={() => <div>Hi!</div>}/>
            <Route exact path={'/login'} render={() => <Login/>}/>
            <Route path={'/profile'} render={() => <Profile/>}/>
            <Route path={'/new-password/:token'} render={() => <EnterNewPassword/>}/>
            <Route exact path={'/password-recovery'} render={() => <PasswordRecovery/>}/>
            <Route path={'/password-recovery-check-email/:email'} render={() => <CheckEmail/>}/>
            <Route exact path={'/registration'} render={() => <Registration/>}/>
            <Route exact path={'/packs-list'} render={() => <PacksList/>}/>
            <Route exact path={'/cards-list/:id'} render={() => <CardsList/>}/>
            <Route path={'*'} render={() => <Error404/>}/>
          </Switch>
        </main>
      </div>
  );
}

export default App;
