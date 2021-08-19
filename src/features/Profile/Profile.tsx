import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../App/redux-store";
import {AuthUser, logOutUser} from "../Login/login-reducer";
import s from "./Profile.module.scss";
import {PersonalInformation} from "./ProfileInfo/PersonalInformation";
import {ProfileResponseType} from "./profile-reducer";
import {UrlPath} from "../Navbar/Header";
import {Avatar, Button, Pagination, Typography} from 'antd';
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {SuperDoubleRangeContainer} from "../search/SuperDoubleRangeContainer";
import {deletePack, getPackList, setPageNumberAC} from "../PacksList/packsList-reducer";
import SearchName from "../search/SearchName";
import {TableContainer} from "../table/TableContainer";
import {setSearchValueAC} from "../search/search-reducer";
import {CardsPackType} from "../../api/api";


export const Profile = () => {
    const {Title} = Typography
    const [editModeProfile, setEditModeProfile] = useState<boolean>(false)
    const id = ''

    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const searchName = useSelector<AppStateType, string>(state => state.search.search)
    const minFilter = useSelector<AppStateType, number>(state => state.search.min)
    const maxFilter = useSelector<AppStateType, number>(state => state.search.max)
    const page = useSelector<AppStateType, number>(state => state.packsList.page)
    const pageCount = useSelector<AppStateType, number>(state => state.packsList.pageCount)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount)

    const dispatch = useDispatch()

    const setSearch = (value: string) => {
        dispatch(setSearchValueAC(value))
    }

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}))
    }

    const onPageChangedHandler = useCallback((currentPage: number): void => {
        dispatch(setPageNumberAC(currentPage))
    }, [dispatch])

    const closeModelWindow = () => setEditModeProfile(false)

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        }
    }, [dispatch, idUser, loadingRequest])

    useEffect(() => {
        if (idUser) {
            dispatch(getPackList({
                pageCount, /*user_id: idUser,*/
                min: minFilter,
                max: maxFilter,
                packName: searchName
            }))
        }
    }, [dispatch, page, pageCount, minFilter, maxFilter, searchName])

    const logOut = () => {
        dispatch(logOutUser())
    }

    if (!isAuth) return <Redirect to={UrlPath.LOGIN}/>
    return (
        <div className={s.wrapper}>
            <div className={s.profileInfoBlock}>
                <div className={s.profileInfo}>
                    <div>
                        <Avatar size={100} src={profile.avatar} icon={<UserOutlined/>}/>
                    </div>
                    <div style={{float: 'left'}}>
                        <div><b>Name:</b> {profile.name && profile.name}</div>
                        <div><b>Email:</b> {profile.email && profile.email}</div>
                        <div><b>public card packs
                            count:</b> {profile.publicCardPacksCount && profile.publicCardPacksCount}</div>
                    </div>
                    <div>
                        <Button type="primary" size="small" onClick={() => setEditModeProfile(true)}>Edit
                            profile</Button>
                        <Button type="primary" size="small" danger onClick={logOut} icon={<PoweroffOutlined/>}
                                loading={loadingRequest}>log out</Button>
                    </div>
                </div>
                <div className={s.doubleRange}>
                    <div><Title level={4}>Number of cards</Title></div>
                    <SuperDoubleRangeContainer/>
                </div>
            </div>
            <div className={s.profilePacksList}>
                <div className={s.header}>
                    <Title className={s.title} level={2}>Packs list {profile.name}'s</Title>
                    <SearchName setSearch={setSearch}
                                user_id={id}/>
                </div>
                <div className={s.main}>
                    <TableContainer packs={packsList}
                                    deletePackFun={deletePackFun}
                                    user_id={id}

                    />
                </div>

                <Pagination style={{textAlign: 'center'}}
                            defaultCurrent={page}
                            total={cardPacksTotalCount}
                            onChange={onPageChangedHandler}
                            defaultPageSize={pageCount}
                            pageSizeOptions={['10']}/>
            </div>
            {editModeProfile && <PersonalInformation onClick={closeModelWindow} name={profile.name}
                                                     avatar={profile.avatar}/>
            }
        </div>
    )
}