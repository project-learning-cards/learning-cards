import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import s from './TableContainer.module.scss'
import {CardsPackType} from "../../api/api";
import {UrlPath} from "../Navbar/Header";
import {Button} from 'antd';
import moment from "moment";
import {ModalEditWindow} from "../Edit/ModalEditWindow";

type TableContainerPropsType = {
    packs: Array<CardsPackType>
    deletePackFun: (pack_id: string) => void
    updateCardsPackName: (id: string, packName: string) => void
    user_id: string
}


export const TableContainer = (props: TableContainerPropsType) => {
    const history = useHistory()
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const updateCardsPackName = (id: string, packName: string) => {
        props.updateCardsPackName && props.updateCardsPackName(id, packName)
    }


    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                <th className={s.tableHeader}>{"NAME"}</th>
                <th className={s.tableHeader}>{"CARDS COUNT"}</th>
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
                    <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
                    <td className={s.tableCol}>{pack.user_name}</td>
                    <td className={s.tableCol}>{pack._id}</td>
                    <td>
                        {(props.user_id) &&
                        <>
                            <Button type="primary" danger
                                    onClick={() => props.deletePackFun(pack._id)}>DELETE</Button>
                            {/*<Button onClick={() => setShowEditModal(true)}
                                    style={{backgroundColor: "#D9D9F1", border: "none"}}
                            >EDIT</Button>*/}
                            <Button onClick={() => history.push(UrlPath.EDIT_PACK_NAME + pack._id)}
                                    style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                            >EDIT</Button>
                        </>
                        }
                        <Button onClick={() => history.push(UrlPath.LEARN_CARDS + pack._id)}
                                style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                        >LEARN</Button>
                    </td>
                </tr>
            ))}
            </tbody>
           {/* {showEditModal && <ModalEditWindow
                                               showEditModal={showEditModal}

                                               setShowEditModal={setShowEditModal}
                                               updateCardsPackName={updateCardsPackName}/>}*/}
        </table>
    )
}