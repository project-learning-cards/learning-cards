import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Login.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {NavLink, Redirect} from "react-router-dom";
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {HeaderEnterApp} from "../../components/HeaderEnterApp/HeaderEnterApp";
import {MainActionButton} from "../../components/MainActionButton/MainActionButton";
import {emailValidation, PasswordValidation} from "../../utils/validation";
import {loginUserTC, setServerErrorMessageLogin} from "./login-reducer";
import {PATH} from "../../components/routes/Pages";
import {Checkbox} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";

export const Login = () => {
    const [emailValue, setEmailValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const serverErrorMessage = useSelector<AppStateType, string>(state => state.login.error)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.logIn)

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

    const changeRememberMe = (e: CheckboxChangeEvent) => {
        setRememberMe(e.target.checked)
    }

    const checkLoginUser = () => {
        if (!emailValidation(emailValue)) {
            setErrorEmailMessage("Incorrect email")
        } else if (!PasswordValidation(passwordValue)) {
            setErrorPasswordMessage("Minimum 8 characters")
        } else {
            dispatch(loginUserTC(emailValue, passwordValue, rememberMe))
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setServerErrorMessageLogin(''))
        }
    }, [dispatch])

    const disabledBtnSubmit = !emailValue || !passwordValue
    if (isLoggedIn) return <Redirect to={PATH.PROFILE}/>
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <HeaderEnterApp title={"Sign In"}/>
                <div className={s.main}>
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

                        <Checkbox checked={rememberMe} onChange={changeRememberMe}>Remember me</Checkbox>

                        <div className={s.forgotPasswordBtn}>
                            <NavLink to={PATH.PASSWORD_RECOVERY}>Forgot Password</NavLink>
                        </div>
                    </div>
                    <div className={s.authBtn}>
                        <span className={s.errorMessage}>{serverErrorMessage}</span>
                        <div className={s.authMainBtn}>
                            <MainActionButton actionClick={checkLoginUser}
                                              disabledBtnSubmit={disabledBtnSubmit}
                                              loadingStatus={loadingStatus}
                                              title={"login"}
                            />
                        </div>
                    </div>
                </div>
                <div className={s.footer}>
                    <p className={s.text}>Don't have an account</p>
                    <NavLink to={PATH.REGISTRATION} className={s.footerBtn}>Sing Up</NavLink>
                </div>
            </div>
        </div>
    )
}

