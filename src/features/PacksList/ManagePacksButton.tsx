import React, {useState} from "react";
import {MainActionButton} from "../../components/MainActionButton/MainActionButton";
import {ModalWindowUpdate} from "../../components/ModalWindow/ModalWindowUpdate";
import { Button } from 'antd';

type ManageButtonPropsType = {
    _id: string
    deletePackFun: (id: string) => void
}

export const ManagePacksButton: React.FC<ManageButtonPropsType> = (props) => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    const updatePack = () => {
        setShowModalUpdate(true)
    }

    return (
        <>
            <td>
                <Button type="primary" danger onClick={() => props.deletePackFun(props._id)}>DELETE</Button>
                <Button onClick={updatePack}>EDIT</Button>
                <Button onClick={updatePack}>LEARN</Button>
            </td>

            <ModalWindowUpdate packId={props._id} showModal={showModalUpdate} setShowModal={setShowModalUpdate} />
        </>
    )
}