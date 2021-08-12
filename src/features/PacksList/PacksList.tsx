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
import {deletePack, getPackList, setPageNumberAC, updatePack} from './packsList-reducer';
import SearchName from "../search/SearchName";
import {setSearchValueAC} from "../search/search-reducer";
import {TableContainer} from "../table/TableContainer";
import {Button, Pagination, Typography} from 'antd'
import {SuperDoubleRangeContainer} from "../search/SuperDoubleRangeContainer";
import {ProfileResponseType} from "../Profile/profile-reducer";


export const PacksList = (props: { user_id?: string }) => {
    const {Title} = Typography;

    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);
    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)
    const pages = useSelector<AppStateType, number | undefined>(state => state.packsList.packsParams.page)
    const pagesCount = useSelector<AppStateType, number | undefined>(state => state.packsList.packsParams.pageCount)
    const minFilter = useSelector<AppStateType, number>(state => state.search.min)
    const maxFilter = useSelector<AppStateType, number>(state => state.search.max)
    const {
        page = pages, pageCount = pagesCount, min = minFilter, max = maxFilter, packName, sortPacks
    } = useSelector<AppStateType, GetPacksAPIParamsType>(state => state.packsList.packsParams);
    const dispatch = useDispatch();

    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)
    const [id, setId] = useState<null | string>(null)


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
    }, [dispatch, page, pageCount, sortPacks, min, max, packName])

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}))
    }

    const updateCardsPackName = (data: { cardsPack:{ _id: string, name?: string } }) => {
        dispatch(updatePack(data))
    }

      const getPrivatePacks = () => {
          if (props.user_id) {
              dispatch(getPackList({ pageCount, min, max, page, packName, user_id: props.user_id }))
          } else {
              dispatch(getPackList({ pageCount, min, max, page, packName }))
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
                <Button style={{backgroundColor: "#D9D9F1", border: "none"}} onClick={()=> setId(idUser)}>MY</Button>
                <Button style={{backgroundColor: "#D9D9F1", border: "none"}} onClick={()=> setId(null)}>ALL</Button>
                </div>
            <div>
                <div><Title level={4}>Number of cards</Title></div>
                <SuperDoubleRangeContainer />
            </div>
            </div>

            <div className={s.profilePacksList}>
                <Title style={{textAlign: 'center', margin: '24px 0 24px 0'}} level={2}>Packs list {profile.name}'s</Title>



                <div>
                    <div className={s.flex}>
                        {props.user_id && <div className={s.private}>
                            <input type="checkbox" className="toggle_input" onChange={getPrivatePacks}
                                   checked={false} />
                            <label>private</label>
                        </div>}
                        <div>
                            <SearchName setSearch={setSearch}
                                        setShowModalAdd={setShowModalAdd}
                                        user_id={props.user_id}/>
                        </div>
                        <TableContainer packs={packsList}
                                        deletePackFun={deletePackFun}
                                        updateCardsPackName={updateCardsPackName}
                                        user_id={props.user_id}
                        />
                        <Pagination style={{textAlign: 'center'}}
                                    defaultCurrent={page}
                                    total={cardPacksTotalCount}
                                    onChange={onPageChangedHandler}
                                    defaultPageSize={pageCount}
                                    pageSizeOptions={['15']}/>
                        {/* <Pagination totalItemsCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            portionSize={10}
                            currentPage={page}
                            onPageChanged={onPageChangedHandler}
                />*/}
                    </div>
                    <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd}/>
                </div>
            </div>
        </div>
    )
}
