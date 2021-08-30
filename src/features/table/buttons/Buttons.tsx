import React, { ChangeEvent, useEffect, useState } from "react";
import s from '../TableContainer.module.scss'
import { Button, Modal } from 'antd';
import { useTranslation } from "react-i18next";
import { InputContainer } from "../../../components/InputContainer/InputContainer";
import { Learn } from "../../Learn/Learn";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updatePackTitle } from "../../PacksList/packsList-reducer";
import { AppStateType } from "../../../App/redux-store";
import { ProfileResponseType } from "../../Profile/profile-reducer";
import { updateCard } from "../../CardsList/cardsList-reducer";

type TableContainerPropsType = {
    user_id: string | undefined
    userId: string
    id: string
    packName?: string
    cardsPackId?: string
    type: 'pack' | 'card'
    answer?: string
    question?: string
    deleteCardFun?: (id: string, cardPack_id: string) => void
    deletePackFun?: (pack_id: string) => void
}

export const Buttons = (props: TableContainerPropsType) => {
    const profile = useSelector<AppStateType, ProfileResponseType>(state => state.profile.profile)
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [question, setQuestion] = useState(props.question);
    const [answer, setAnswer] = useState(props.answer);
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
        dispatch(updatePackTitle(props.id, newName))
        setShowEditPackModal(false)
    }

    useEffect(() => {
        setNewName(props.packName!)
    }, [props.packName]);

    useEffect(() => {
        setAnswer(props.answer);
        setQuestion(props.question)
    }, [props.answer, props.question]);
    const handleCancel2 = () => {
        setShowModal(false)
    }
    const onSaveHandler2 = () => {
        dispatch(updateCard(props.id, props.cardsPackId!, question!, answer!))
        setQuestion('')
        setAnswer('')
        handleCancel2()
    }
    const questionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const answerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    return (
        <div>
            {props.type === 'pack' &&
                <>
                    <div className={s.btnsWrapper}>
                        {props.user_id === props.userId && <>
                            <DeleteTwoTone onClick={() => props.deletePackFun!(props.id)} />
                            <EditTwoTone onClick={() => {
                                setShowEditPackModal(true)
                            }
                            } />
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
                    {showModal &&
                        <Modal width={600} title={'Edit card'} visible={showModal}
                            onCancel={handleCancel2}
                            footer={[
                                <Button key="back" onClick={handleCancel2}>
                                    Return
                                </Button>,
                                <Button key="submit" type="primary" onClick={onSaveHandler2}>
                                    Save
                                </Button>
                            ]}>
                            <div style={{ height: '150px' }}>
                                <InputContainer
                                    title={""}
                                    placeholder={"Question"}
                                    changeValue={questionOnChange}
                                    errorMessage={""}
                                    typeInput={"text"}
                                    value={question!}
                                />
                                <InputContainer
                                    title={""}
                                    placeholder={"answer"}
                                    changeValue={answerOnChange}
                                    errorMessage={""}
                                    typeInput={"text"}
                                    value={answer!}
                                />
                            </div>
                        </Modal>}
                    {profile._id === props.userId && <div className={s.btnsWrapper}>
                        <DeleteTwoTone onClick={() => props.deleteCardFun!(props.id, props.cardsPackId!)} />
                        <EditTwoTone onClick={() => {
                            setShowModal(true)
                        }
                        } />
                    </div>}
                </>
            }
        </div>)
}