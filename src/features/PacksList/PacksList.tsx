import s from "./PacksList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { AppStateType } from "../../App/redux-store";
import { CardsPackType, GetPacksAPIParamsType } from "../../api/api";
import { Redirect } from "react-router-dom";
import { AuthUser } from "../Login/login-reducer";
import { PreloaderForApp } from "../../components/Preloader/Preloader";
import { ModalWindowAdd } from "../../components/ModalWindow/ModalWindowAdd";
import { UrlPath } from '../Navbar/Header';
import { deletePack, getPackList, setPageNumberAC } from './packsList-reducer';
import SearchName from "../search/SearchName";
import { setSearchValueAC } from "../search/search-reducer";
import { TableContainer } from "../table/TableContainer";
import { Button, Pagination, Typography } from 'antd'
import { SuperDoubleRangeContainer } from "../search/SuperDoubleRangeContainer";
import { ProfileResponseType } from "../Profile/profile-reducer";


export const PacksList = () => {
    const { Title } = Typography;

    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);
    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)
    const pages = useSelector<AppStateType, number>(state => state.packsList.page)
    const pageCount = useSelector<AppStateType, number>(state => state.packsList.pageCount)
    const minFilter = useSelector<AppStateType, number>(state => state.search.min)
    const maxFilter = useSelector<AppStateType, number>(state => state.search.max)
    const {
        page = pages, min = minFilter, max = maxFilter, packName, sortPacks
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
    }, [dispatch, id, pages, pageCount, sortPacks, minFilter, maxFilter, packName, idUser, loadingRequest])

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({ id: pack_id }))
    }


    const getPrivatePacks = () => {
        if (id) {
            dispatch(getPackList({ pageCount, min, max, page, packName, user_id: id }))
        } else {
            dispatch(getPackList({ pageCount, min, max, page, packName }))
        }
    }

    const setSearch = (value: string) => {
        dispatch(setSearchValueAC(value))
    }

    if (!isAuth) {
        return <Redirect to={UrlPath.LOGIN} />
    }

    if (!success) {
        return <PreloaderForApp />
    }

    return (
        <div className={s.wrapper}>
            <div className={s.sidebar}>
                <div className={s.sidebarsBtns}>
                    <Title level={4}>Show packs cards</Title>
                    <div>
                        <Button type={id ? 'primary' : 'dashed'} onClick={() => setId(idUser)}>MY</Button>
                        <Button type={id ? 'dashed' : 'primary'} onClick={() => setId('')}>ALL</Button>
                    </div>
                </div>

                <div className={s.doubleRange}>
                    <div><Title level={4}>Number of cards</Title></div>
                    <SuperDoubleRangeContainer />
                </div>
            </div>

            <div className={s.content}>
                <div className={s.header}>
                    <Title className={s.title} level={2}>Packs list</Title>
                    <SearchName setSearch={setSearch}
                        user_id={id} />
                </div>
                <div className={s.main}>
                    <TableContainer packs={packsList}
                        deletePackFun={deletePackFun}
                        user_id={id}
                    />
                </div>
                <div className={s.footer}>
                    <Pagination style={{ textAlign: 'center' }}
                        defaultCurrent={page}
                        total={cardPacksTotalCount}
                        onChange={onPageChangedHandler}
                        defaultPageSize={pageCount}
                        pageSizeOptions={['15']} />
                </div>
            </div>
            <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd} />
        </div>
    )
}
