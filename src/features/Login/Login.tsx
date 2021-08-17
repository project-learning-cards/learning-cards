import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {NavLink, Redirect} from "react-router-dom";
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {HeaderEnterApp} from "../../components/HeaderEnterApp/HeaderEnterApp";
import {MainActionButton} from "../../components/MainActionButton/MainActionButton";
import { emailValidation, PasswordValidation } from "../../utils/validation";
import { UrlPath } from "../Navbar/Header";
import { loginUserTC, setServerErrorMessageLogin } from "./login-reducer";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const isLogIn = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const serverErrorMessage = useSelector<AppStateType, string>(state => state.login.error)

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("")

    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
        setErrorEmailMessage("")
        serverErrorMessage && dispatch(setServerErrorMessageLogin(""))
    }
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageLogin(""))
        setErrorPasswordMessage("")
    }

    const checkLoginUser = () => {
        if (!emailValidation(emailValue)) {
            setErrorEmailMessage("Incorrect email")
        } else if (!PasswordValidation(passwordValue)) {
            setErrorPasswordMessage("Minimum 8 characters")
        } else {
            dispatch(loginUserTC(emailValue, passwordValue))
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setServerErrorMessageLogin(''))
        }
    }, [dispatch])


    if (isLogIn) {
        return <Redirect to={UrlPath.PROFILE}/>
    }
    const disabledBtnSubmit = !emailValue || !passwordValue

    return (
        <div className={s.authPageContainer}>
            <HeaderEnterApp title={"Sign In"}/>

            <div className={s.emailPasswordLoginContainer}>
                <InputContainer
                    title={"Email"}
                    typeInput={"email"}
                    value={emailValue}
                    changeValue={changeEmailValue}
                    errorMessage={errorEmailMessage}
                />
                <InputContainer
                    title={"Password"}
                    typeInput={"password"}
                    value={passwordValue}
                    changeValue={changePasswordValue}
                    errorMessage={errorPasswordMessage}
                />

                <div className={s.forgotPasswordBtn}>
                    <NavLink to={UrlPath.PASSWORD_RECOVERY}>Forgot Password</NavLink>
                </div>
            </div>

            <div className={s.btnFooterLoginContainer}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>
                <div className={s.blueBtnContainer}>
                    <MainActionButton actionClick={checkLoginUser}
                                disabledBtnSubmit={disabledBtnSubmit}
                                loadingStatus={loadingStatus}
                                title={"login"}
                    />
                </div>
                <p className={s.DifferentAccountBtn}>Don't have an account</p>
                <NavLink to={UrlPath.REGISTRATION} className={s.footerBtn}>Sing Up</NavLink>
            </div>
        </div>
    )
}

