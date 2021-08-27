import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo} from "react";
import {deleteCard, getCardsList} from "./cardsList-reducer";
import {AppStateType} from "../../App/redux-store";
import {Redirect, useParams} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../components/Preloader/Preloader";
import SearchName from "../search/SearchName";
import {ProfileResponseType} from "../Profile/profile-reducer";
import {PATH} from "../../components/routes/Pages";
import {TableContainer} from "../table/TableContainer";
import {CardType} from "../../api/api";
import {useTranslation} from "react-i18next";

export const CardsList = () => {
    const {t} = useTranslation()
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success)
    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cardsList.arrayCard)

    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (!profile._id) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({cardPack_id: id}))
        }
    }, [dispatch, id, profile._id])

    const titles = useMemo(() => {
        if (cards && cards[0]?.user_id === profile._id) {
            return [ t('question'), t('answer'), t('last_update'), t('grade'), t('actions')]
        } else {
            return [t('question'), t('answer'), t('last_update'), t('grade')]
        }
    }, [cards, profile._id]);


    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    if (!success) {
        return <Preloader/>
    }

    const deleteCardFun = (id: string, cardPack_id: string) => {
        dispatch(deleteCard({id, cardPack_id}))
    }

    return (
        <div>
            <SearchName user_id={profile._id}/>
            <TableContainer type={"card"} deleteCardFun={deleteCardFun} cards={cards} titles={titles}/>
            {/*<TableContainerCards id={id} user_id={profile._id} deleteCardFun={deleteCardFun}/>*/}
        </div>
    )
}