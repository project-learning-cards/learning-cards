import React, {ChangeEvent, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import s from './TableContainer.module.scss'
import {CardsPackType} from "../../api/api";
import {UrlPath} from "../Navbar/Header";
import {Button, Modal} from 'antd';
import moment from "moment";
import { useTranslation } from "react-i18next";
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {updatePackTC} from "../PacksList/packsList-reducer";
import {useDispatch} from "react-redux";

type TableContainerPropsType = {
    packs: Array<CardsPackType>
    deletePackFun: (pack_id: string) => void
    user_id: string
}


export const TableContainer = (props: TableContainerPropsType) => {
    const history = useHistory()
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [showEditPackModal, setShowEditPackModal] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>('')
    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const handleCancel = () => {
        setShowEditPackModal(false)
    }
    return (
        <table className={s.tableContainer}>
            <thead className={s.tableHeader}>
            <tr>
                <th className={s.tableHeader}>{t('name_2')}</th>
                <th className={s.tableHeader}>{t('cards_count')}</th>
                <th className={s.tableHeader}>{t('last_update')}</th>
                <th className={s.tableHeader}>{t('created')}</th>
                <th className={s.tableHeader}>{t('actions')} </th>
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
                        <td className={s.tableCol}>
                            {(props.user_id) &&
                            <>
                                <Button type="primary" danger
                                        onClick={() => props.deletePackFun(pack._id)}>{t('delete')}</Button>
                                {/*<Button onClick={() => history.push(UrlPath.EDIT_PACK_NAME + pack._id)}
                                        style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                                >{t('edit')}</Button>*/}
                                <Button onClick={() => setShowEditPackModal(true)}
                                        style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                                >{t('edit')}</Button>
                            </>
                            }


                            {showEditPackModal && <Modal width={600} title={'Pack info'} visible={showEditPackModal} onCancel={handleCancel}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>
                                            Return
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={() => {
                                            dispatch(updatePackTC(pack._id, newName))
                                            setShowEditPackModal(false)
                                        }}>
                                            Save
                                        </Button>
                                    ]}>
                                <div style={{height: '150px'}}>
                                    <InputContainer
                                        title={"Name"}
                                        placeholder={"New pack name"}
                                        changeValue={changePackNameHandler}
                                        errorMessage={""}
                                        typeInput={"text"}
                                        value={newName}
                                    />
                                </div>
                            </Modal>}






                            <Button onClick={() => history.push(UrlPath.LEARN_CARDS + pack._id)}
                                    style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                            >{t('learn')}</Button>
                        </td>
                    </tr>
            ))}
            </tbody>
        </table>
    )
}













/*

{ props.user_id === 'fakeId' ?

    props.packs.filter(pack=> pack.cardsCount > 0).map((pack) => (

        <tr key={pack._id} className={s.row}>
            <td className={s.tableCol}>
                <Button type="link" size="large">
                    <NavLink to={`${UrlPath.CARDS_LIST}` + pack._id}>{pack.name}</NavLink>
                </Button>
            </td>
            <td className={s.tableCol}>{pack.cardsCount}</td>
            <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
            <td className={s.tableCol}>{pack.user_name}</td>
            <td className={s.tableCol}>
                {(props.user_id) &&
                <>
                    <Button type="primary" danger
                            onClick={() => props.deletePackFun(pack._id)}>DELETE</Button>
                    <Button onClick={() => history.push(UrlPath.EDIT_PACK_NAME + pack._id)}
                            style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                    >EDIT</Button>
                </>
                }
                <Button onClick={() => history.push(UrlPath.LEARN_CARDS + pack._id)}
                        style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                >LEARN</Button>
            </td>
        </tr> )) :


    props.packs.map((pack) => (
        <tr key={pack._id} className={s.row}>
            <td className={s.tableCol}>
                <Button type="link" size="large">
                    <NavLink to={`${UrlPath.CARDS_LIST}` + pack._id}>{pack.name}</NavLink>
                </Button>
            </td>
            <td className={s.tableCol}>{pack.cardsCount}</td>
            <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
            <td className={s.tableCol}>{pack.user_name}</td>
            <td className={s.tableCol}>
                {(props.user_id) &&
                <>
                    <Button type="primary" danger
                            onClick={() => props.deletePackFun(pack._id)}>DELETE</Button>
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

    ))}*/
