import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk';
import {actionsLoginType, loginReducer} from "../features/Login/login-reducer";
import {
    actionsPasswordRecoveryType,
    passwordRecoveryReducer
} from "../features/PasswordRecovery/password-recovery-reducer";
import {
    actionsSetNewPasswordType,
    setNewPasswordReducer
} from "../features/EnterNewPassword/enter-new-password-reducer";
import {actionsProfileType, profileReducer} from "../features/Profile/profile-reducer";
import {actionsRegistrationType, registrationReducer} from "../features/Registration/regidtration-reducer";
import {actionPacksListType, packsListReducer} from "../features/PacksList/packsList-reducer";
import {actionCardsListType, cardsListReducer} from "../features/CardsList/cardsList-reducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    PasswordRecovery: passwordRecoveryReducer,
    newPassword: setNewPasswordReducer,
    profile: profileReducer,
    registration: registrationReducer,
    packsList: packsListReducer,
    cardsList: cardsListReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export type GetAppStateType = () => AppStateType;

type AppActionsType = actionsSetNewPasswordType
    | actionsLoginType
    | actionsPasswordRecoveryType
    | actionsProfileType
    | actionsRegistrationType
    | actionPacksListType
    | actionCardsListType

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