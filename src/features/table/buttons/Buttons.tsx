import React, { ChangeEvent, useEffect, useState } from "react";
import s from '../TableContainer.module.scss'
import { Button, Modal } from 'antd';
import { useTranslation } from "react-i18next";
import { InputContainer } from "../../../components/InputContainer/InputContainer";
import { Learn } from "../../Learn/Learn";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updatePackTitle } from "../../PacksList/packsList-reducer";

type TableContainerPropsType = {
    user_id: string | undefined
    userId: string
    id: string
    packName?: string
    type: 'pack' | 'card'
    answer?: string
    question?: string
    deleteCardFun?: (id: string, cardPack_id: string) => void
    deletePackFun?: (pack_id: string) => void
}

export const Buttons = (props: TableContainerPropsType) => {
    const { t } = useTranslation()
    const [showEditPackModal, setShowEditPackModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const [newName, setNewName] = useState(props.packName!)
    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const dispatch = useDispatch();
    const handleCancel = () => {
        setShowEditPackModal(false)
    }
    const onSaveHandler = () => {
        debugger
        dispatch(updatePackTitle(props.id, newName))
        setShowEditPackModal(false)
    }

    useEffect(() => {
        setNewName(props.packName!)
    }, [props.packName]);
    return (
        <div>
            {props.type === 'pack' &&
                <>
                    <div className={s.btnsWrapper}>
                        {props.user_id === props.userId && <>
                            <DeleteTwoTone onClick={() => props.deletePackFun!(props.id)} />
                            <EditTwoTone onClick={() => {
                                console.log(props.packName);
                                setShowEditPackModal(true)} 
                            }/>
                        </>}
                        <Button className={s.learnButton}
                            onClick={() => setShowLearnModal(true)}>{t('learn')}</Button>
                    </div>

                    {showEditPackModal &&
                        <Modal width={600} title={'Pack info'} visible={showEditPackModal}
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
                                    title={"Name"}
                                    changeValue={changePackNameHandler}
                                    errorMessage={""}
                                    typeInput={"text"}
                                    value={newName}
                                />
                            </div>
                        </Modal>}
                    {showLearnModal &&
                        <Learn showLearnModal={showLearnModal} cardPackId={props.id} setShowLearnModal={setShowLearnModal} />}
                </>
            }

            {props.type === 'card' &&
                <>
                    {props.user_id === props.userId && <div className={s.btnsWrapper}>
                        <Button type="primary" danger onClick={() => { }}>{t('delete')}</Button>
                        <Button onClick={() => { }}
                            style={{ backgroundColor: "#D9D9F1", border: "none", marginLeft: '0' }}
                        >{t('edit')}</Button>
                    </div>}






                </>
            }
        </div>)
}