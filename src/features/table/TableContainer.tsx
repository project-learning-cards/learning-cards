import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from './TableContainer.module.scss'
import {CardsPackType} from "../../api/api";
import {UrlPath} from "../Navbar/Header";
import {Button} from 'antd';
import moment from "moment";
import {ModalWindowUpdate} from "../../components/ModalWindow/ModalWindowUpdate";

type TableContainerPropsType = {
    packs: Array<CardsPackType>
    deletePackFun: (pack_id: string) => void
    updateCardsPackName: (data: { cardsPack: { _id: string; name?: string; } }) => void
    user_id?: string
}


export const TableContainer = (props: TableContainerPropsType) => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const updatePack = () => {
        setShowModalUpdate(true)
    }

    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                <th className={s.tableHeader}>{"NAME"}</th>
                <th className={s.tableHeader}>{"CARDS COUNT"}</th>
                {/*<th className={s.tableHeader}>{"RATING"}</th>
                <th className={s.tableHeader}>{"GRADE"}</th>*/}
                <th className={s.tableHeader}>{"LAST UPDATED"}</th>
                <th className={s.tableHeader}>{"CRATED BY"}</th>
                <th className={s.tableHeader}>{"ACTIONS"} </th>
            </tr>
            </thead>
            <tbody className={s.tableBody}>
            {props.packs.map((pack) => (
                <tr key={pack._id} className={s.row}>
                    <td className={s.tableCol}>
                        <Button type="link" size="large">
                            <NavLink to={`${UrlPath.CARDS_LIST}` + pack._id}>{pack.name}</NavLink>
                        </Button>
                    </td>
                    <td className={s.tableCol}>{pack.cardsCount}</td>
                    {/* <td className={s.tableCol}>{pack.rating}</td>
                    <td className={s.tableCol}>{pack.grade}</td>*/}
                    <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
                    <td className={s.tableCol}>{pack.user_name}</td>
                    <td>
                        {(props.user_id) &&
                        <>
                            <Button type="primary" danger onClick={() => props.deletePackFun(pack._id)}>DELETE</Button>
                            <Button style={{backgroundColor: "#D9D9F1", border: "none"}}
                                    onClick={updatePack}>EDIT</Button>
                        </>
                        }
                        <Button style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                                onClick={updatePack}>LEARN</Button>
                    </td>


                    <ModalWindowUpdate packId={pack._id} showModal={showModalUpdate} setShowModal={setShowModalUpdate}/>


                </tr>
            ))}
            </tbody>
        </table>
    )
}
