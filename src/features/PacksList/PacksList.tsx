import s from "./ProfilePack.module.scss";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {AppStateType} from "../../App/redux-store";
import {CardsPackType, GetPacksAPIParamsType} from "../../api/api";
import {Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {PreloaderForApp} from "../../components/Preloader/Preloader";
//import {Pagination} from "../../components/Pagination/Pagination";
import {ModalWindowAdd} from "../../components/ModalWindow/ModalWindowAdd";
import {UrlPath} from '../Navbar/Header';
import {deletePack, getPackList, setPageNumberAC, updatePackTC} from './packsList-reducer';
import SearchName from "../search/SearchName";
import {setSearchValueAC} from "../search/search-reducer";
import {TableContainer} from "../table/TableContainer";
import {Button, Pagination, Typography} from 'antd'
import {SuperDoubleRangeContainer} from "../search/SuperDoubleRangeContainer";
import {ProfileResponseType} from "../Profile/profile-reducer";


export const PacksList = () => {
    const {Title} = Typography;

    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);
    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)
    const pages = useSelector<AppStateType, number>(state => state.packsList.page)
    const pagesCount = useSelector<AppStateType, number>(state => state.packsList.pageCount)
    const minFilter = useSelector<AppStateType, number>(state => state.search.min)
    const maxFilter = useSelector<AppStateType, number>(state => state.search.max)
    const {
        page = pages, pageCount = pagesCount, min = minFilter, max = maxFilter, packName, sortPacks
    } = useSelector<AppStateType, GetPacksAPIParamsType>(state => state.packsList);
    const dispatch = useDispatch();

    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
    const [id, setId] = useState<string>('')


    const onPageChangedHandler = useCallback((currentPage: number): void => {
        dispatch(setPageNumberAC(currentPage))
    }, [dispatch])

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        } else {
            getPrivatePacks()
        }
    }, [dispatch, id, pages, pagesCount, sortPacks, minFilter, maxFilter, packName, idUser, loadingRequest])

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}))
    }

    const updateCardsPackName = ( id: string, packName: string) => {
        dispatch(updatePackTC(id, packName))
    }

    const getPrivatePacks = () => {
        if (id) {
            dispatch(getPackList({pageCount, min, max, page, packName, user_id: id}))
        } else {
            dispatch(getPackList({pageCount, min, max, page, packName}))
        }
    }

    const setSearch = (value: string) => {
        dispatch(setSearchValueAC(value))
    }

    if (!isAuth) {
        return <Redirect to={UrlPath.LOGIN}/>
    }

    if (!success) {
        return <PreloaderForApp/>
    }

    return (

        <div className={s.profilePageContainer}>
            <div className={s.filterBlock}>
                <div><Title level={4}>Show packs cards</Title></div>
                <div>

                    <Button type={ id ? 'primary' : 'dashed'} onClick={() => setId(idUser)}>MY</Button>
                    <Button type={ id ? 'dashed' : 'primary'} onClick={() => setId('')}>ALL</Button>
                </div>
                <div>
                    <div><Title level={4}>Number of cards</Title></div>
                    <SuperDoubleRangeContainer/>
                </div>
            </div>

            <div className={s.profilePacksList}>
                <Title style={{textAlign: 'center', margin: '24px 0 24px 0'}} level={2}>Packs list {id ? profile.name + "'s" : ""}</Title>


                <div>
                    <div className={s.flex}>
                        <div>
                            <SearchName setSearch={setSearch}
                                        setShowModalAdd={setShowModalAdd}
                                        user_id={id}/>
                        </div>

                        <TableContainer packs={packsList}
                                        deletePackFun={deletePackFun}
                                        updateCardsPackName={updateCardsPackName}
                                        user_id={id}

                        />
                        <Pagination style={{textAlign: 'center'}}
                                    defaultCurrent={page}
                                    total={cardPacksTotalCount}
                                    onChange={onPageChangedHandler}
                                    defaultPageSize={pageCount}
                                    pageSizeOptions={['15']}/>
                    </div>
                    <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd}/>
                </div>
            </div>
        </div>
    )
}
