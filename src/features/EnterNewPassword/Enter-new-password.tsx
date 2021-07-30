import React, {ChangeEvent, useEffect, useState} from "react";
import s from './Enter-new-password.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {HeaderEnterApp} from "../../components/HeaderEnterApp/HeaderEnterApp";
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {MainActionButton} from "../../components/MainActionButton/MainActionButton";
import {AppStateType} from "../../App/redux-store";
import { PasswordValidation } from "../../utils/validation";
import { RoutePath } from "../Navbar/Navbar";
import { setNewPasswordThunk, setServerErrorMessage } from "./enter-new-password-reducer";

export const EnterNewPassword = () => {
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { token } = useParams<{token: string}>()

    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.newPassword.loadingRequest)
    const successResponse = useSelector<AppStateType, boolean>(state => state.newPassword.success)
    const serverErrorMessage = useSelector<AppStateType, string>(state => state.newPassword.error)

    const setNewPassword = () => {
        if (!PasswordValidation(password)) {
            setError('Minimum 8 characters')
        } else {
            dispatch(setNewPasswordThunk(password, token))
        }
    }

    const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
        setError('')
        serverErrorMessage && dispatch(setServerErrorMessage(''))
    }

    if (successResponse) {
        return <Redirect to={RoutePath.LOGIN}/>
    }

    return (
        <div className={s.containerNewPassword}>
            <HeaderEnterApp title={'Create new password'}/>

            <InputContainer
                title={'Password'}
                value={password}
                changeValue={inputPassword}
                errorMessage={error}
                typeInput={'password'}
            />

            <p className={s.textAction}>Create new password and we will send you further instructions to email</p>
            <div className={s.positionActionBtn}>
                <span className={s.errorMessageContainer}>{serverErrorMessage}</span>
                <div className={s.blueBtnContainer}>
                    <MainActionButton
                        loadingStatus={loadingStatus}
                        actionClick={setNewPassword}
                        disabledBtnSubmit={!password}
                        title={'Create new password'} />
                </div>
            </div>
        </div>
    )
}

