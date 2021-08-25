import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import {AuthUser, logOutUser} from "../Login/login-reducer";
import s from "./Profile.module.scss";
import {PersonalInformation} from "./ProfileInfo/PersonalInformation";
import {UrlPath} from "../Navbar/Header";
import {Avatar, Button, Pagination, Typography} from 'antd';
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {SuperDoubleRangeContainer} from "../search/SuperDoubleRangeContainer";
import {deletePack, setPageNumberAC, updatePackListTC} from "../PacksList/packsList-reducer";
import SearchName from "../search/SearchName";
import {TableContainer} from "../table/TableContainer";
import {setSearchValueAC} from "../search/search-reducer";
import {useTranslation} from "react-i18next";
import {useProfileSelector} from "./useProfileSelector";


export const Profile = () => {
    const {Title} = Typography;
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [editModeProfile, setEditModeProfile] = useState<boolean>(false)

    const {
        packsList, isAuth, idUser, loadingRequest, profile, searchName, min,
        max, page, pageCount, cardPacksTotalCount, id, packName, sortPacks
    } = useProfileSelector()

    const setSearch = (value: string) => {
        dispatch(setSearchValueAC(value))
    }

    const deletePackFun = (pack_id: string) => {
       /* dispatch(deletePack({id: pack_id}))*/
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
            dispatch(updatePackListTC({
                packName: packName || '', page, pageCount, max, sortPacks: sortPacks || '', min: 1
            }))


        }
    }, [dispatch,packName, page, pageCount, min, max, sortPacks, id,])

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
                        <div><b>{t('name')}:</b> {profile.name && profile.name}</div>
                        <div><b>{t('email')}:</b> {profile.email && profile.email}</div>
                        <div><b>{t('public_count')}:</b> {profile.publicCardPacksCount && profile.publicCardPacksCount}
                        </div>
                    </div>
                    <div>
                        <Button type="primary" size="small"
                                onClick={() => setEditModeProfile(true)}>{t('edit_profile')}</Button>
                        <Button type="primary" size="small" danger onClick={logOut} icon={<PoweroffOutlined/>}
                                loading={loadingRequest}>{t('logout')}</Button>
                    </div>
                </div>
                <div className={s.doubleRange}>
                    <div><Title level={4}>{t('number_cards')}</Title></div>
                    <SuperDoubleRangeContainer/>
                </div>
            </div>
            <div className={s.profilePacksList}>
                <div className={s.header}>
                    <Title className={s.title} level={2}>{t('packs_list_with_name', {name: profile.name})}</Title>
                    <SearchName setSearch={setSearch}
                                user_id={id || ''}/>
                </div>
                <div className={s.main}>
                    <TableContainer packs={packsList}
                                    deletePackFun={deletePackFun}
                                    user_id={id || ''}

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