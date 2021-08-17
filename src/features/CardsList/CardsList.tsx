import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteCard, getCardsList} from "./cardsList-reducer";
import {AppStateType} from "../../App/redux-store";
import {Redirect, useParams} from "react-router-dom";
import {AuthUser} from "../Login/login-reducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {UrlPath} from '../Navbar/Header';
import {TableContainerCards} from "../table/TableContainerCards";
import SearchName from "../search/SearchName";
import {setSearchValueAC} from "../search/search-reducer";
import {ProfileResponseType} from "../Profile/profile-reducer";

export const CardsList = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success)
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>()

    const [, setShowModalAdd] = useState<boolean>(false)

    const setSearch = (value: string) => {
        dispatch(setSearchValueAC(value))
    }

    useEffect(() => {
        if (!profile._id) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({ cardPack_id: id }))
        }
    }, [dispatch, id, profile._id])


    if (!isAuth) {
        return <Redirect to={UrlPath.LOGIN} />
    }

    if (!success) {
        return <Preloader />
    }

    const deleteCardFun = (id: string, cardPack_id: string) => {
        dispatch(deleteCard({id, cardPack_id}))
    }

    return (
        <div>
            <SearchName setSearch={setSearch}
                        setShowModalAdd={setShowModalAdd}
                        user_id={profile._id}
                        />
        <TableContainerCards id={id} user_id={profile._id} deleteCardFun={deleteCardFun}/>
        </div>
    )
}