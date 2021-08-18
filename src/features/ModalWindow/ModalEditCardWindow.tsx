import React, {ChangeEvent, useState} from "react";
import {Button, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateCard} from "../CardsList/cardsList-reducer";
import {AppStateType} from "../../App/redux-store";
import {CardType} from "../../api/api";


export const ModalEditCardWindow = () => {
    const {cardId}= useParams<{ cardId: string }>()
    const [showEditModal, setShowEditModal] = useState<boolean>(true);
    const dispatch = useDispatch()


    const cardsList = useSelector<AppStateType, Array<CardType>>(state => state.cardsList.arrayCard)
    let card = cardsList.filter(c => c._id === cardId)
    let CardQuestion = card[0].question
    let CardAnswer = card[0].answer
    const [newQuestion, setNewQuestion] = useState<string>(CardQuestion)
    const [newAnswer, setNewAnswer] = useState<string>(CardAnswer)

    const changeCardQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const changeCardAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }

    const handleCancel = () => {
        window.history.go(-1);
        setShowEditModal(false)
    }

    const updatePack = () => {
        dispatch(updateCard(cardId, newQuestion, newAnswer))
    }
/*    if (!success) {
        return <Preloader/>
    }*/

    return (
        <Modal width={600} title={'Card info'} visible={showEditModal} onCancel={handleCancel}
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
                    title={"Question"}
                    placeholder={"enter your question"}
                    changeValue={changeCardQuestionHandler}
                    errorMessage={""}
                    typeInput={"text"}
                    value={newQuestion}
                />
                <InputContainer
                    title={"Answer"}
                    placeholder={"enter your answer"}
                    changeValue={changeCardAnswerHandler}
                    errorMessage={""}
                    typeInput={"text"}
                    value={newAnswer}
                />
            </div>
        </Modal>
    )
}