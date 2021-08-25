import s from "./PacksList.module.scss";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {GetPacksAPIParamsType} from "../../api/api";
import {Redirect} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {PreloaderForApp} from "../../components/Preloader/Preloader";
import {deletePack, updatePackListTC} from './packsList-reducer';
import SearchName from "../search/SearchName";
import {setSearchValueAC} from "../search/search-reducer";
import {TableContainer} from "../table/TableContainer";
import {Button, Pagination, Typography} from 'antd'
import {SuperDoubleRangeContainer} from "../search/SuperDoubleRangeContainer";
import {useTranslation} from "react-i18next";
import {usePackListSelector} from "./usePackListSelector";
import {PATH} from "../../components/routes/Pages";


export const PacksList = () => {
    const {Title} = Typography;
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)

    const {
        isAuth, idUser, success, loadingRequest, cardPacksTotalCount, packsList, page,
        pageCount, min, max, id, packName, sortPacks, searchName
    } = usePackListSelector()

    useEffect(() => {
        if (!idUser) {
            if (!loadingRequest) {
                dispatch(AuthUser())
            }
        }else {
            handleChangeParams({user_id: id})
        }
    }, [dispatch, sortPacks, min, max, packName, loadingRequest, sortPacks, searchName])





    const deletePackFun = (pack_id: string) => {
        dispatch(deletePack({id: pack_id}, idUser))
    }

    const handleChangeParams = (params: GetPacksAPIParamsType) => {
        dispatch(updatePackListTC({
            packName: searchName || '', sortPacks: sortPacks || '',
            page, pageCount, min, user_id: id, max, ...params
        }))
    }



    if (success) {
        return <PreloaderForApp/>
    }

    if (!isAuth) return <Redirect to={PATH.LOGIN}/>

    return (
        <div className={s.wrapper}>
            <div className={s.sidebar}>
                <div className={s.sidebarsBtns}>
                    <Title level={4}>{t('show_packs')}</Title>
                    <div>
                        <Button type={id ? 'primary' : 'dashed'}
                                onClick={() => handleChangeParams({user_id: idUser})}>{t('my')}</Button>
                        <Button type={id ? 'dashed' : 'primary'}
                                onClick={() => handleChangeParams({user_id: undefined, min: 0})}>{t('all')}</Button>
                    </div>
                </div>

                <div className={s.doubleRange}>
                    <div><Title level={4}>{t('number_cards')}</Title></div>
                    <SuperDoubleRangeContainer/>
                </div>
            </div>

            <div className={s.content}>
                <div className={s.header}>
                    <Title className={s.title} level={2}>{t('packs_list')}</Title>
                    <SearchName user_id={id || ''}/>
                </div>
                <div className={s.main}>
                    <TableContainer packs={packsList}
                                    deletePackFun={deletePackFun}
                                    user_id={id || ''}
                    />
                </div>
                <div className={s.footer}>
                    <Pagination style={{textAlign: 'center'}}
                                defaultCurrent={page}
                                total={cardPacksTotalCount}
                                onChange={(page) => handleChangeParams({page})}
                                defaultPageSize={pageCount}
                                pageSizeOptions={['15']}/>
                </div>
            </div>
           {/* <ModalWindowAdd showModal={showModalAdd} setShowModal={setShowModalAdd}/>*/}
        </div>
    )
}
