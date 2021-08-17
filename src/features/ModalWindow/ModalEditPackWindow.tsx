import React, {ChangeEvent, useState} from "react";
import {Button, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {CardsPackType} from "../../api/api";
import {updatePackTC} from "../PacksList/packsList-reducer";



export const ModalEditPackWindow = () => {
    const {packId}= useParams<{ packId: string }>()
    const [showEditModal, setShowEditModal] = useState<boolean>(true);
    const dispatch = useDispatch()

    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)

    let pack = packsList.filter(p => p._id === packId)
    let packName = pack[0].name
    const [newName, setNewName] = useState<string>(packName)

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const handleCancel = () => {
        window.history.go(-1);
        setShowEditModal(false)
    }

    const updatePack = () => {
           dispatch(updatePackTC(packId, newName))
    }


/*    if (!success) {
        return <Preloader/>
    }*/

    return (
        <Modal width={600} title={'Pack info'} visible={showEditModal} onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Return
                   </Button>,
                   <Button key="submit" type="primary" onClick={updatePack}>
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
        </Modal>
    )
}