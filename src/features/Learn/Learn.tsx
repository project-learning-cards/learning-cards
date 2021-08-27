import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCardsList, gradeCardTC} from "../CardsList/cardsList-reducer";
import {AppStateType} from "../../App/redux-store";
import {CardType} from "../../api/api";
import {getRandomCard} from "./random";
import {Button, Modal} from 'antd';
import SuperRadio from "../../components/SuperRadio/SuperRadio";
import s from './Learn.module.scss'
import {Preloader} from "../../components/Preloader/Preloader";

const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

type LearnPropsType = {
    showLearnModal: boolean
    setShowLearnModal: (showLearnModal: boolean) => void
    cardPackId: string
}

export const Learn = (props: LearnPropsType) => {
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success);
    const {arrayCard} = useSelector((state: AppStateType) => state.cardsList)
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
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


    useEffect(() => {
        if (first) {
            dispatch(getCardsList({cardPack_id: props.cardPackId}));
            setFirst(false);
        }
        if (arrayCard.length > 0) setCard(getRandomCard(arrayCard));

        return () => {
        }
    }, [dispatch, props.cardPackId, arrayCard, first]);

    const onNext = (grade: number, id: string) => {
        setIsChecked(false)
        dispatch(gradeCardTC(grade, id))
        if (arrayCard.length > 0) {
            setCard(getRandomCard(arrayCard));
        } else {

        }
    }
    /*  if (success) {
          return <Preloader/>
      }*/

    const handleCancel = () => {
        props.setShowLearnModal(false)
    }

    return (
        <Modal centered width={600} title={`Learn cards`} visible onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Return
                   </Button>,
                   !isChecked && <Button key="submit" type="primary" onClick={() => setIsChecked(true)}>
                       Show answer
                   </Button>,
                   isChecked && <Button key="submit" type="primary" onClick={() => onNext(grade, card._id)}>
                       Next
                   </Button>
               ]}>
            <div style={isChecked ? {height: 'auto', fontSize: '16px'} : {height: '150px', fontSize: '16px'}}>
                <div style={isChecked ? {marginBottom: '15px'} : {alignItems: 'center', textAlign: 'center'}}>
                    <b>Question:</b> {card.question}
                </div>
                {isChecked && (
                    <div className={s.answerBlock}>
                        <div style={{marginBottom: '15px'}}><b>Answer:</b> {card.answer}
                            <hr style={{opacity: '0.3'}}/>
                        </div>

                        <div className={s.answer}>
                            <b>Rate yourself:</b>
                            <SuperRadio name={'radio'}
                                        value={grade}
                                        options={grades}
                                        onChangeOption={setGrade}/>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}