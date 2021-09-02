import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Registration.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../App/redux-store';
import { setRegistration, setRegistrationAC, setServerErrorMessageRegistration } from './regidtration-reducer';
import { Redirect } from 'react-router-dom';
import { InputContainer } from '../../components/InputContainer/InputContainer';
import { HeaderEnterApp } from '../../components/HeaderEnterApp/HeaderEnterApp';
import { MainActionButton } from '../../components/MainActionButton/MainActionButton';
import { emailValidation, PasswordValidation } from '../../utils/validation';
import { PATH } from '../../components/routes/Pages';

export const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const [errorEmailMessage, setErrorEmailMessage] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const disabledBtnSubmit = !email || !password || !checkPassword;

  const dispatch = useDispatch();
  const loadingStatus = useSelector<AppStateType, boolean>((state) => state.registration.loadingRequest);
  const isRegistration = useSelector<AppStateType, boolean>((state) => state.registration.isRegistration);
  const serverErrorMessage = useSelector<AppStateType, string>((state) => state.registration.error);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorEmailMessage('');
    setEmail(e.currentTarget.value);
    serverErrorMessage && dispatch(setServerErrorMessageRegistration(''));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPasswordMessage('');
    setPassword(e.currentTarget.value);
    serverErrorMessage && dispatch(setServerErrorMessageRegistration(''));
  };

  const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPasswordMessage('');
    setCheckPassword(e.currentTarget.value);
    serverErrorMessage && dispatch(setServerErrorMessageRegistration(''));
  };

  const onRegistration = () => {
    if (!emailValidation(email)) {
      setErrorEmailMessage('Incorrect email');
    } else if (!PasswordValidation(password)) {
      setErrorPasswordMessage('Minimum 8 characters');
    } else if (password !== checkPassword) {
      setErrorPasswordMessage('Enter the same password');
    } else {
      dispatch(setRegistration(email, password));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setServerErrorMessageRegistration(''));
      dispatch(setRegistrationAC(false));
    };
  }, [dispatch]);

  if (isRegistration) {
    return <Redirect to={PATH.LOGIN} />;
  }

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <HeaderEnterApp title={'Sign Up'} />
        <div className={s.main}>
          <InputContainer
            title={'Email'}
            typeInput={'email'}
            value={email}
            changeValue={onChangeEmail}
            errorMessage={errorEmailMessage}
          />
          <InputContainer
            title={'password'}
            typeInput={'password'}
            value={password}
            changeValue={onChangePassword}
            errorMessage={errorPasswordMessage}
          />
          <InputContainer
            title={'Confirm password'}
            typeInput={'password'}
            value={checkPassword}
            changeValue={onChangeCheckPassword}
            errorMessage={errorPasswordMessage}
          />
        </div>

        <div className={s.footer}>
          <span className={s.errorMessageContainer}>{serverErrorMessage}</span>

          <div className={s.footerBtns}>
            <span className={s.btnCancel} onClick={goBack}>
              Cancel
            </span>
            <div className={s.blueBtnContainer}>
              <MainActionButton
                actionClick={onRegistration}
                disabledBtnSubmit={disabledBtnSubmit}
                title={'Register'}
                loadingStatus={loadingStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
