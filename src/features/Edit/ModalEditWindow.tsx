import React, {ChangeEvent, useState} from "react";
import {Button, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {CardsPackType} from "../../api/api";
import {updatePackTC} from "../PacksList/packsList-reducer";

type ModalEditWindowPropsType={
    // showEditModal: boolean
    /*packId: string*/
    // setShowEditModal: (showEditNodal: boolean) => void
    // updateCardsPackName: (packId: string, packName: string) => void
   /* packName: string*/
}

export const ModalEditWindow = (props: ModalEditWindowPropsType) => {
    const {packId}= useParams<{ packId: string }>()
    const dispatch = useDispatch()

    const packsList = useSelector<AppStateType, Array<CardsPackType>>(state => state.packsList.cardPacks)
    let pack = packsList.filter(p => p._id === packId)
    let packName = pack[0].name
    const [newName, setNewName] = useState<string>(packName)


    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const handleCancel = () => {
        // props.setShowEditModal(false)
    }

    const updatePack = () => {
        // props.updateCardsPackName(packId, newName
        dispatch(updatePackTC(packId, newName))
    }

/*    if (!success) {
        return <Preloader/>
    }*/

    return (
        <Modal width={600} title={'Pack info'} visible onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={()=> {}}>
                       Return
                   </Button>,
                   <Button key="submit" type="primary" onClick={updatePack}>
                       Save
                   </Button>
               ]}>
            <div style={{height: '150px'}}>
                <InputContainer
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