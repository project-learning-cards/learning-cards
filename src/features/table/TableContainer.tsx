import React from "react";
import {NavLink} from "react-router-dom";
import {ManagePacksButton} from "../PacksList/ManagePacksButton";
import s from './TableContainer.module.scss'
import {CardsPackType} from "../../api/api";
import {UrlPath} from "../Navbar/Header";
import {Button} from 'antd';
import moment from "moment";

type TableContainerPropsType = {
    packs: Array<CardsPackType>
    deletePackFun: (pack_id: string) => void
    updateCardsPackName: (data: { cardsPack: { _id: string; name?: string; } }) => void
    user_id?: string
}


export const TableContainer = (props: TableContainerPropsType) => {
    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                <th className={s.tableHeader}>{"NAME"}</th>
                <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                <th className={s.tableHeader}>{"RATING"}</th>
                <th className={s.tableHeader}>{"GRADE"}</th>
                <th className={s.tableHeader}>{"LAST UPDATED"}</th>
                <th className={s.tableHeader}>{"CREATED BY"}</th>
                {props.user_id && <th className={s.tableHeader}>{"ACTIONS"} </th>
                }
            </tr>
            </thead>
            <tbody className={s.tableBody}>
            {props.packs.map((pack) => (
                <tr key={pack._id} className={s.row}>
                    <td className={s.tableCol}>
                        <Button type="link" size="large" >
                            <NavLink to={`${UrlPath.CARDS_LIST}` + pack._id}>{pack.name}</NavLink>
                        </Button>
                       </td>
                    <td className={s.tableCol}>{pack.cardsCount}</td>
                    <td className={s.tableCol}>{pack.rating}</td>
                    <td className={s.tableCol}>{pack.grade}</td>
                    <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
                    <td className={s.tableCol}>{pack.user_name}</td>
                    {(props.user_id) && <ManagePacksButton _id={pack._id} deletePackFun={props.deletePackFun}/>}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
