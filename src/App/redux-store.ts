import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import {ActionsLoginType, loginReducer} from "../features/Login/login-reducer";
import {
    ActionsPasswordRecoveryType,
    passwordRecoveryReducer
} from "../features/PasswordRecovery/password-recovery-reducer";
import {
    ActionsSetNewPasswordType,
    setNewPasswordReducer
} from "../features/EnterNewPassword/enter-new-password-reducer";
import {ActionsProfileType, profileReducer} from "../features/Profile/profile-reducer";
import {ActionsRegistrationType, registrationReducer} from "../features/Registration/regidtration-reducer";
import {ActionPacksListType, packsListReducer} from "../features/PacksList/packsList-reducer";
import {ActionCardsListType, cardsListReducer} from "../features/CardsList/cardsList-reducer";
import { appReducer, IsInitializedType } from "./app-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    packsList: packsListReducer,
    cardsList: cardsListReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type GetAppStateType = () => AppStateType;

type AppActionsType = ActionsSetNewPasswordType
    | ActionsLoginType
    | ActionsPasswordRecoveryType
    | ActionsProfileType
    | ActionsRegistrationType
    | ActionPacksListType
    | ActionCardsListType
    | IsInitializedType

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

//@ts-ignore
window.store = store;