import React from "react";
import s from './TableContainer.module.scss'
import {CardType} from "../../api/api";
import {addCard} from "../CardsList/cardsList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {Button} from "antd";
import moment from "moment";
import {UrlPath} from "../Navbar/Header";
import {useHistory} from "react-router-dom";

type TableContainerCardsPropsType = {
    id: string
    user_id: string
    deleteCardFun: (id: string, cardPack_id: string)=> void
}

export const TableContainerCards = (props: TableContainerCardsPropsType) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cardsList = useSelector<AppStateType, Array<CardType>>(state => state.cardsList.arrayCard)


   /* const addCardFun = () => {
        dispatch(addCard({card: {cardsPack_id: props.id}}))
    }*/

    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                <th className={s.tableHeader}>{"QUESTION"}</th>
                <th className={s.tableHeader}>{"ANSWER"}</th>
                <th className={s.tableHeader}>{"GRADE"}</th>
                <th className={s.tableHeader}>{"LAST UPDATED"}</th>
                <th className={s.tableHeader}/>
            </tr>
            </thead>
            <tbody className={s.tableBody}>
            {cardsList.map((card) => (
                <tr key={card._id} className={s.row}>
                    <td className={s.tableCol}>{card.question}</td>
                    <td className={s.tableCol}>{card.answer}</td>
                    <td className={s.tableCol}>{card.grade}</td>
                    <td className={s.tableCol}>{moment(card.updated).format('DD.MM.YYYY')}</td>
                    <td>
                    {(props.user_id === card.user_id) &&
                    <>
                        <Button type="primary" danger onClick={() => props.deleteCardFun(card._id, card.cardsPack_id)}>DELETE</Button>
                        <Button onClick={() => history.push(UrlPath.EDIT_CARD_NAME + card._id)}
                                style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                        >EDIT</Button>
                    </>
                    }</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}