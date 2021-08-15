import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCardsList, gradeCardTC} from "../CardsList/cardsList-reducer";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../App/redux-store";
import {CardsPackType, CardType} from "../../api/api";
import {Preloader} from "../../components/Preloader/Preloader";
import {getRandomCard} from "./random";
import {Button, Modal} from 'antd';

const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

export const Learn = () => {

    const loadingStatus = useSelector<AppStateType, boolean>(state => state.packsList.success);
    const success = useSelector<AppStateType, boolean>(state => state.cardsList.success);
    const {id} = useParams<{ id: string }>();
    const {
        arrayCard,
        maxGrade,
        sortCards,
        minGrade,
        page,
        pageCount,
        searchCardQuestion
    } = useSelector((state: AppStateType) => state.cardsList)

    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
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
            dispatch(getCardsList({cardPack_id: id}));
            setFirst(false);
        }
        if (arrayCard.length > 0) setCard(getRandomCard(arrayCard));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, arrayCard, first]);

    const onNext = () => {
        setIsChecked(false);

        if (arrayCard.length > 0) {
            // dispatch
            setCard(getRandomCard(arrayCard));
        } else {

        }
    }

    const sendGrade = (grade: number) => {
        dispatch(gradeCardTC(grade, card._id))
    }
    if (!success) {
        return <Preloader/>
    }

    // const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    /*  const updatePack = () => {
          setShowModalUpdate(true)
      }*/
    const handleOk = () => {

    }

    const handleCancel = () => {
        window.history.go(-1);
    }

    return (
        <Modal title={'Learn Cards'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Return
                   </Button>,
                   <Button key="submit" type="primary" loading={loadingStatus} onClick={() => setIsChecked(true)}>
                       Show answer
                   </Button>
               ]}>
            <div>Question: {card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>Show answer</button>
            </div>
            <div>
                <button onClick={onNext}>next</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => sendGrade(i + 1)}>{g}</button>
                    ))}
                </>
            )}
        </Modal>
    )
}