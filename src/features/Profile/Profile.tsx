import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../App/redux-store";
import {AuthUser, logOutUser} from "../Login/login-reducer";
import s from "./Profile.module.scss";
import {PersonalInformation} from "./PersonalInformation";
import {ProfileResponseType} from "./profile-reducer";
import {PacksList} from "../PacksList/PacksList";
import {UrlPath} from "../Navbar/Header";


export const Profile = () => {

    const [editModeProfile, setEditModeProfile] = useState<boolean>(false)

    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const dispatch = useDispatch()

    const closeModelWindow = () => setEditModeProfile(false)

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        }
    }, [dispatch, idUser, loadingRequest])

    const logOut = () => {
        dispatch(logOutUser())
    }

    if (!isAuth) return <Redirect to={UrlPath.LOGIN} />
    return (
       <div className={s.profilePageContainer}>
            <div className={s.profileContainer}>
                <div className={s.profileAboutYou}>
                    <img src={profile.avatar && profile.avatar ? profile.avatar : ''} alt="user_photo" />
                    <div>{profile.name && profile.name}</div>
                    <div>{profile.email && profile.email}</div>
                    <div>I am Front-end developer</div>
                    <div>public card packs count: {profile.publicCardPacksCount && profile.publicCardPacksCount}</div>
                    <div>
                        <button className={s.btnEdit} onClick={() => setEditModeProfile(true)}>Edit profile</button>
                        <button className={s.btnLogout} onClick={logOut}>log out</button>
                    </div>
                </div>
                <div className={s.numberOfCards}>Number of cards</div>
            </div>
            <div className={s.profilePacksList}>
                <h2>My packs list</h2>
                {
                    profile._id && <PacksList user_id={profile._id} />
                }

            </div>
            {editModeProfile && <PersonalInformation onClick={closeModelWindow} name={profile.name}
                avatar={profile.avatar} />
            }
        </div>
    )
}