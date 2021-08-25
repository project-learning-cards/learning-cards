import React, {ChangeEvent, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../../App/redux-store";
import s from "./PersonalInformation.module.scss";
import {updateProfile} from "../profile-reducer";
import {InputContainer} from "../../../components/InputContainer/InputContainer";
import {Button, Image, Modal, Switch} from "antd";
import {useTranslation} from "react-i18next";
import {PATH} from "../../../components/routes/Pages";

type PersonalInformationPropsType = {
    onClick: () => void
    avatar: string
    name: string
}

export const PersonalInformation = React.memo((props: PersonalInformationPropsType) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const [newName, setNewName] = useState<string>(props.name)
    const [errorNickName, setErrorNickName] = useState<string>('')
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const [checked, setChecked] = useState(true)


    const onLanguageChange = () => {
        if (checked) {
            setChecked(false)
            i18n.changeLanguage('ru')
        } else {
            setChecked(true)
            i18n.changeLanguage('en')
        }
    }

    // -------------------------- FOR UPLOADING ---------------------- //
    const [, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const inRef = useRef<HTMLInputElement>(null);
    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
            reader.onloadend = () => {
                setFile64(reader.result);
            };
            reader.readAsDataURL(newFile);
        }
    };
    //------------------------------------------------------------------//

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const closeModelWindow = () => {
        props.onClick()
    }
    let disabledBtnSubmit = !newName
    const onSaveInformation = () => {
        if (!newName) {
            setErrorNickName("Incorrect nick name")
        } else {
            dispatch(updateProfile({avatar: file64, name: newName}));
            closeModelWindow();
        }
    }

    if (!isAuth) return <Redirect to={PATH.LOGIN}/>

    return (
        <Modal centered width={600} title={ t('personal_information') } visible onCancel={closeModelWindow}
               footer={[
                   <Button key="back" onClick={closeModelWindow}>
                       {t('return')}
                   </Button>,
                   <Button disabled={disabledBtnSubmit} key="submit" type="primary" onClick={onSaveInformation}>
                       {t('save')}
                   </Button>
               ]}>
            <div className={s.information}>
                <div className={s.avatarBlock}>
                    <div>
                        <Image className={s.imagesPI}
                            src={fileURL ? fileURL : props.avatar}
                        />
                    </div>
                    <input className={s.inputStyleAdd}
                        ref={inRef}
                        type={'file'}
                        onChange={upload}
                    />
                    <Button className={s.buttonAdd} size={"small"} onClick={() => inRef && inRef.current && inRef.current.click()}>  {t('add')}</Button>
                </div>
                <div className={s.inputStyleNickName}>
                    <InputContainer
                        title={t("nick_name")}
                        typeInput={"text"}
                        value={newName}
                        changeValue={onChangeName}
                        errorMessage={errorNickName}
                        placeholder={'enter your nick name'}
                    />
                </div>
                <div className={s.changeLanguage}>
                    <Switch checkedChildren="English" unCheckedChildren="Русский" checked={checked} onClick={onLanguageChange} />
                </div>
            </div>
        </Modal>
    )
})