import React, {ChangeEvent, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../../App/redux-store";
import s from "./PersonalInformation.module.scss";
import {updateProfile} from "../profile-reducer";
import {InputContainer} from "../../../components/InputContainer/InputContainer";
import {UrlPath} from "../../Navbar/Header";
import {Avatar, Button, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";

type PersonalInformationPropsType = {
    onClick: () => void
    avatar: string
    name: string
}

export const PersonalInformation = React.memo((props: PersonalInformationPropsType) => {
    const loadingStatus = useSelector<AppStateType, boolean>(state => state.registration.loadingRequest)
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState<string>(props.name)
    const [errorNickName, setErrorNickName] = useState<string>('')

    // -------------------------- FOR UPLOADING ---------------------- //
    const [file, setFile] = useState<any>();
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
    let disabledBtnSubmit = newName === props.name || !fileURL  // нужно решить этот момент
    const onSaveInformation = () => {
        if (!newName) {
            setErrorNickName("Incorrect nick name")
        } else if (!fileURL) {
            setErrorNickName("Need to upload file")
        } else {
            dispatch(updateProfile(file64, newName));
            closeModelWindow();
        }
    }


    if (!isAuth) return <Redirect to={UrlPath.LOGIN}/>

    return (
        <Modal width={600} title={'Personal information'} visible onCancel={closeModelWindow}
               footer={[
                   <Button key="back" onClick={closeModelWindow}>
                       Return
                   </Button>,
                   <Button disabled={disabledBtnSubmit} key="submit" type="primary" onClick={onSaveInformation} loading={loadingStatus}>
                       Save
                   </Button>
               ]}>
            <div style={{height: 'auto'}}>
                <div className={s.avatarBlock}>
                    <div>
                        <Avatar style={{borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: '50%'}} src={props.avatar} size={200} icon={<UserOutlined />}/>
                    </div>
                    <input
                        ref={inRef}
                        type={'file'}
                        style={{display: 'none'}}
                        onChange={upload}
                    />
                    <Button size={"small"} onClick={() => inRef && inRef.current && inRef.current.click()}
                            style={{backgroundColor: "#D9D9F1", border: "none", marginTop: '10px'}}
                    >Add</Button>
                    <div >
                        {fileURL && <div >
                            <img src={fileURL} alt={'file'}/>
                            {file && file.name}
                        </div>}
                    </div>
                </div>
                <InputContainer
                    title={"Nick name"}
                    typeInput={"text"}
                    value={newName}
                    changeValue={onChangeName}
                    errorMessage={errorNickName}
                    placeholder={'enter your nick name'}
                />
            </div>
        </Modal>








        /*
          <div className={s.profilePageContainer}>
              <>
                  <div className={s.modalBackground} onClick={closeModelWindow}>
                  </div>
                  <div className={s.modalMessage}>
                      <div className={s.modalMessageContainer}>
                          <h2>Personal information</h2>
                          <div className={s.avatarBlock}>
                              <img className={s.avatar} src={props.avatar ? props.avatar : ""} alt="user_photo" />
                              <input
                                  ref={inRef}
                                  type={'file'}
                                  style={{ display: 'none' }}
                                  onChange={upload}
                              />
                              <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
                              <div className={s.addedFilesContainer}>
                                  {fileURL && <div className={s.addedFiles}>
                                      <img className={s.avatarURL} src={fileURL} alt={'file'} />
                                      {file && file.name}
                                  </div>}
                              </div>


                          </div>
                      </div>
                  </div>
              </>
          </div>*/
    )
})