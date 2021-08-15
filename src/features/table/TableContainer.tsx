import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import s from './TableContainer.module.scss'
import {CardsPackType} from "../../api/api";
import {UrlPath} from "../Navbar/Header";
import {Button, Modal} from 'antd';
import moment from "moment";

type TableContainerPropsType = {
    packs: Array<CardsPackType>
    deletePackFun: (pack_id: string) => void
    updateCardsPackName: (data: { cardsPack: { _id: string; name?: string; } }) => void
    user_id: string | null
}


export const TableContainer = (props: TableContainerPropsType) => {
    const history = useHistory()

    // const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    /*  const updatePack = () => {
          setShowModalUpdate(true)
      }*/
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
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
                                        <Button type="primary" danger
                                                onClick={() => props.deletePackFun(pack._id)}>DELETE</Button>
                                        <Button style={{backgroundColor: "#D9D9F1", border: "none"}}
                                                onClick={showModal}>EDIT</Button>
                                    </>
                                    }
                                    <Button onClick={()=> history.push(UrlPath.LEARN_CARDS + pack._id)} style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                                            >LEARN</Button>


                                </td>


                                {/*  <ModalWindowUpdate packId={pack._id} showModal={showModalUpdate} setShowModal={setShowModalUpdate}/>*/}
                                {/*<Modal  title={'Learn ' + pack.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                                </Modal>*/}


                            </tr>
                        ))}
                        </tbody>
                    </table>
                )
            }