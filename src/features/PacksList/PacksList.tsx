import s from './PacksList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {AppStateType} from "../../App/redux-store";
import {CardsPackType, GetPacksAPIParamsType} from "../../api/api";
import {Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {PreloaderForApp} from "../../components/Preloader/Preloader";
import {Pagination} from "../../components/Pagination/Pagination";
import {ModalWindowAdd} from "../../components/ModalWindow/ModalWindowAdd";
import {UrlPath} from '../Navbar/Header';
import {deletePack, setPageNumberAC, updatePack} from './packsList-reducer';
import SearchName from "../search/SearchName";
import {setSearchValueAC} from "../search/search-reducer";
import {TableContainer} from "../table/TableContainer";


export const PacksList = (props: { user_id?: string }) => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const idUser = useSelector<AppStateType, string>(state => state.profile.profile._id)
    const success = useSelector<AppStateType, boolean>(state => state.packsList.success)
    const loadingRequest = useSelector<AppStateType, boolean>(state => state.login.loadingRequest)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsList.cardPacksTotalCount);
    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)

    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)

    const dispatch = useDispatch();


     const {
        page = 1, pageCount = 10, min = 0, max = 10, packName, sortPacks
    } = useSelector<AppStateType, GetPacksAPIParamsType>(state => state.packsList.packsParams);


    const onPageChangedHandler = useCallback((currentPage: number): void => {
        dispatch(setPageNumberAC(currentPage))
    }, [dispatch])

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        } /*else {
            getPrivatePacks()
        }*/
    }, [dispatch, page, pageCount, sortPacks, min, max, packName, idUser, loadingRequest])

    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}))
    }

    const updateCardsPackName = (data: { cardsPack:{ _id: string, name?: string } }) => {
        dispatch(updatePack(data))
    }

    /*  const getPrivatePacks = () => {
          if (props.user_id) {
              dispatch(getPackList({ pageCount, min, max, page, packName, user_id: props.user_id }))
          } else {
              dispatch(getPackList({ pageCount, min, max, page, packName }))
          }
      }*/

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
        <div>
            <div className={s.flex}>
                {/* {props.user_id && <div className={s.private}>
                    <input type="checkbox" className="toggle_input" onChange={getPrivatePacks}
                        checked={false} />
                    <label>private</label>
                </div>}*/}


                {/*  <div className={s.search}>
                    <div className={s.containerInputSearch}>
                        <InputContainer
                            placeholder={"Search"}
                            changeValue={changeSearch}
                            errorMessage={""}
                            typeInput={"text"}
                            value={searchTitle}
                        />
                        <button onClick={() => {
                            dispatch(setPackNameAC(''))
                        }}>X
                        </button>
                    </div>
                    <button onClick={setSearch}>SEARCH</button>
                </div>*/}

                <div>
                    <SearchName setSearch={setSearch}/>
                </div>
                <TableContainer packs={packsList}
                                deletePackFun={deletePackFun}
                                updateCardsPackName={updateCardsPackName}
                                user_id={props.user_id}
                                setShowModalAdd={setShowModalAdd}
                                   />

                <Pagination totalItemsCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            portionSize={10}
                            currentPage={page}
                            onPageChanged={onPageChangedHandler}
                />
            </div>
            <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd}/>
        </div>
    )
}
