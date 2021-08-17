import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCardsList, gradeCardTC} from "../CardsList/cardsList-reducer";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../App/redux-store";
import {CardType} from "../../api/api";
import {Preloader} from "../../components/Preloader/Preloader";
import {getRandomCard} from "./random";
import {Button, Modal, Radio, RadioChangeEvent, Space} from 'antd';

const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

export const Learn = () => {
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success);
    const {id} = useParams<{ id: string }>();
    const {arrayCard} = useSelector((state: AppStateType) => state.cardsList)

    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true)
    const [grade, setGrade] = useState<any>(grades.indexOf(grades[0]) + 1)


    const [card, setCard] = useState<CardType>({
        answer: 'answer fake',
        question: 'question fake',
        cardsPack_id: '',
        grade: 0,
        rating: 0,
        shots: 0,
        type: 'card',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: 'fake'
    });

    const onRadioChange = (e: RadioChangeEvent) => {
        setGrade && setGrade(e.target.value)
    };


    useEffect(() => {
        if (first) {
            dispatch(getCardsList({cardPack_id: id}));
            setFirst(false);
        }
        if (arrayCard.length > 0) setCard(getRandomCard(arrayCard));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, arrayCard, first]);

    const onNext = (grade: number, id: string) => {
        setIsChecked(false)
        dispatch(gradeCardTC(grade, id))
        if (arrayCard.length > 0) {
            setCard(getRandomCard(arrayCard));
        } else {

        }
    }

    if (!success) {
        return <Preloader/>
    }

    const handleCancel = () => {
        window.history.go(-1);
        setIsModalVisible(false)
    }

    return (
        <Modal width={600} title={'Learn Cards'} visible={isModalVisible} onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Return
                   </Button>,
                   !isChecked && <Button key="submit" type="primary" onClick={() => setIsChecked(true)}>
                       Show answer
                   </Button>,
                   isChecked && <Button key="submit" type="primary" onClick={ () => onNext(grade, card._id)}>
                       Next
                   </Button>
               ]}>
            <div style={{height: '150px'}}>
                <div style={isChecked ? {marginBottom: '15px'} : {alignItems: 'center', textAlign: 'center'}}>
                    <b>Question:</b> {card.question}
                </div>
                {isChecked && (
                    <div style={{marginBottom: '68px', padding: '0px'}}>
                        <div style={{marginBottom: '15px'}}> <b>Answer:</b> {card.answer}</div>
                        <div>
                            <b>Rate yourself:</b>
                            <div style={{marginTop: '10px'}}>
                                {grades.map((g, i) => (
                                    <Radio.Group onChange={onRadioChange} >
                                        <Space direction="vertical">
                                            <Radio value={i}>{g}</Radio>
                                        </Space>
                                    </Radio.Group>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}