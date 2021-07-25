import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import {actionsLoginType, loginReducer} from "../components/login/login-reducer";
import {
    actionsPasswordRecoveryType,
    passwordRecoveryReducer
} from "../components/passwordRecovery/password-recovery-reducer";
import {
    actionsSetNewPasswordType,
    setNewPasswordReducer
} from "../components/enterNewPassword/enter-new-password-reducer";
import {actionsProfileType, profileReducer} from "../components/profile/profile-reducer";
import {actionsRegistrationType, registrationReducer} from "../components/registration/regidtration-reducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    PasswordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type GetAppStateType = () => AppStateType;

type AppActionsType = actionsSetNewPasswordType
    | actionsLoginType
    | actionsPasswordRecoveryType
    | actionsProfileType
    | actionsRegistrationType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))