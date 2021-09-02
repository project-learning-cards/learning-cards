import React, { ChangeEvent, useState } from 'react';
import s from './Enter-new-password.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { HeaderEnterApp } from '../../components/HeaderEnterApp/HeaderEnterApp';
import { InputContainer } from '../../components/InputContainer/InputContainer';
import { MainActionButton } from '../../components/MainActionButton/MainActionButton';
import { AppStateType } from '../../App/redux-store';
import { PasswordValidation } from '../../utils/validation';
import { setNewPasswordThunk, setServerErrorMessage } from './enter-new-password-reducer';
import { PATH } from '../../components/routes/Pages';

export const EnterNewPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { token } = useParams<{ token: string }>();

  const dispatch = useDispatch();
  const loadingStatus = useSelector<AppStateType, boolean>((state) => state.newPassword.loadingRequest);
  const successResponse = useSelector<AppStateType, boolean>((state) => state.newPassword.success);
  const serverErrorMessage = useSelector<AppStateType, string>((state) => state.newPassword.error);

  const setNewPassword = () => {
    if (!PasswordValidation(password)) {
      setError('Minimum 8 characters');
    } else {
      dispatch(setNewPasswordThunk(password, token));
    }
  };

  const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setError('');
    serverErrorMessage && dispatch(setServerErrorMessage(''));
  };

  if (successResponse) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={'Create new password'} />
        <div className={s.main}>
          <InputContainer
            title={'Password'}
            value={password}
            changeValue={inputPassword}
            errorMessage={error}
            typeInput={'password'}
          />
          <p className={s.textAction}>Create new password and we will send you further instructions to email</p>
        </div>
        <div className={s.footer}>
          <span className={s.errorMessage}>{serverErrorMessage}</span>
          <div className={s.footerBtn}>
            <MainActionButton
              loadingStatus={loadingStatus}
              actionClick={setNewPassword}
              disabledBtnSubmit={!password}
              title={'Create new password'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
