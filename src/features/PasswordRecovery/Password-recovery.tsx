import React, { ChangeEvent, useEffect, useState } from "react";
import s from './Password-recovery.module.scss'
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputContainer } from "../../components/InputContainer/InputContainer";
import { HeaderEnterApp } from "../../components/HeaderEnterApp/HeaderEnterApp";
import { MainActionButton } from "../../components/MainActionButton/MainActionButton";
import { AppStateType } from "../../App/redux-store";
import { emailValidation } from "../../utils/validation";
import { UrlPath } from "../Navbar/Header";
import { passwordRecoveryThunk, setServerErrorMessageRecovery, setSuccess } from "./password-recovery-reducer";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>("hardtruenew39@gmail.com")
    const [error, setError] = useState<string>("")
    const disabledBtnSubmit = !email

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.passwordRecovery.loadingRequest)
    const success = useSelector<AppStateType, boolean>(state => state.passwordRecovery.success)
    const serverErrorMessage = useSelector<AppStateType, string>(state => state.passwordRecovery.error)

    const sendLetter = () => {
        !emailValidation(email) ?
            setError("Incorrect email")
            :
            dispatch(passwordRecoveryThunk(email))
    }

    useEffect(() => {
        return () => {
            dispatch(setSuccess(false))
            dispatch(setServerErrorMessageRecovery(""))
        }
    }, [])

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setEmail(event.currentTarget.value)
        serverErrorMessage && dispatch(setServerErrorMessageRecovery(""))
        if (emailValidation(event.currentTarget.value)) {
            setError("")
        }
    }

    if (success) {
        return <Redirect to={`/password-recovery-check-email/${email}`} />
    }

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <HeaderEnterApp title={"Forgot your password?"} />
                <div className={s.main}>
                    <InputContainer
                        placeholder={"Email"}
                        changeValue={inputEmail}
                        errorMessage={error}
                        typeInput={"email"}
                        value={email}
                    />
                    <p className={s.textAction}>Enter your email address and we will send you further instructions</p>
                    <div className={s.authBtn}>
                        <span className={s.errorMessage}>{serverErrorMessage}</span>
                        <div className={s.authMainBtn}>
                            <MainActionButton
                                title={"Send Instructions"}
                                actionClick={sendLetter}
                                disabledBtnSubmit={disabledBtnSubmit}
                                loadingStatus={loadingStatus}
                            />
                        </div>
                    </div>
                </div>
                <div className={s.footer}>
                    <span className={s.text}>Did you remember your password?</span>
                    <NavLink to={UrlPath.LOGIN} className={s.footerBtn}>Try logging in</NavLink>
                </div>
            </div>
        </div>
    )
}