import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { addCard, deleteCard, getCardsList } from "./cardsList-reducer";
import { AppStateType } from "../../App/redux-store";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { AuthUser } from "../Login/login-reducer";
import { Preloader } from "../../components/Preloader/Preloader";
import { ProfileResponseType } from "../Profile/profile-reducer";
import { PATH } from "../../components/routes/Pages";
import { TableContainer } from "../table/TableContainer";
import { CardType } from "../../api/api";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import s from './CardsList.module.scss'
import { InputContainer } from "../../components/InputContainer/InputContainer";
export const CardsList = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { t } = useTranslation()
    const isAuth = useSelector<AppStateType, boolean>(state => state.login.logIn)
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success)
    const packName = useSelector<AppStateType, string>(state => state.cardsList.packName)
    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cardsList.arrayCard)
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (!profile._id) {
            dispatch(AuthUser())
        } else {
            dispatch(getCardsList({ cardPack_id: id }))
        }
    }, [dispatch, id, profile._id])
    const handleCancel = () => {
        setShowModal(false)
    }
    const onSaveHandler = () => {
        const payload = {
            card: {
                cardsPack_id: id,
                question,
                answer
            }
        }
        dispatch(addCard(payload))
        setQuestion('')
        setAnswer('')
        handleCancel()
    }
    const questionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const answerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const titles = useMemo(() => {
        if (cards && cards[0]?.user_id === profile._id) {
            return [t('question'), t('answer'), t('last_update'), t('grade'), t('actions')]
        } else {
            return [t('question'), t('answer'), t('last_update'), t('grade')]
        }
    }, [cards, profile._id]);


    if (!isAuth) {
        return <Redirect to={PATH.LOGIN} />
    }

    if (!success) {
        return <Preloader />
    }

    const deleteCardFun = (id: string, cardPack_id: string) => {
        dispatch(deleteCard({ id, cardPack_id }))
    }

    return (
        <div className={s.wrapper}>
            {showModal &&
                <Modal width={600} title={'Add card'} visible={showModal}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={onSaveHandler}>
                            Save
                        </Button>
                    ]}>
                    <div style={{ height: '150px' }}>
                        <InputContainer
                            title={""}
                            placeholder={"Question"}
                            changeValue={questionOnChange}
                            errorMessage={""}
                            typeInput={"text"}
                            value={question}
                        />
                        <InputContainer
                            title={""}
                            placeholder={"answer"}
                            changeValue={answerOnChange}
                            errorMessage={""}
                            typeInput={"text"}
                            value={answer}
                        />
                    </div>
                </Modal>}
            <div className={s.header}>pack title: {packName}</div>
            <TableContainer type={"card"} deleteCardFun={deleteCardFun} cards={cards} titles={titles} />
            <div className={s.footer}>
                <button onClick={() => setShowModal(true)}>add card</button>
                <NavLink to={PATH.PACKS_LIST}>back to packs</NavLink>
            </div>
        </div>
    )
}