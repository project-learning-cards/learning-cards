import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {CardsPackType, CardType} from "../../api/api";
import {Button} from 'antd';
import moment from "moment";
import {PATH} from "../../components/routes/Pages";
import {Buttons} from "./buttons/Buttons";
import {Table} from "./Table";
import s from "../../components/Header/Header.module.scss";
import { useDispatch } from "react-redux";
import { setPackName } from "../CardsList/cardsList-reducer";

type TableContainerPropsType = {
    type: 'card' | 'pack'
    packs?: Array<CardsPackType>
    deletePackFun?: (pack_id: string) => void
    user_id?: string
    success?: boolean
    deleteCardFun?: (id: string, cardPack_id: string) => void
    cards?: Array<CardType>
    titles: Array<string>
}

export const TableContainer = (props: TableContainerPropsType) => {
    const dispatch = useDispatch()
    const onCardsClick = (name: string) => {
        dispatch(setPackName(name))
    }
   /* const {t} = useTranslation()
    const [showEditPackModal, setShowEditPackModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>('')*/

   /* const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }*/

  /*  const handleCancel = () => {
        setShowEditPackModal(false)
    }*/

    const array = [];

    if (props.packs) {
        for (let i = 0; i < props.packs.length; i++) {
            let arr = []
            arr.push(<Button type="link" size="large"><NavLink
                to={`${PATH.CARDS_LIST}` + props.packs[i]._id} onClick={() => onCardsClick(props.packs![i].name)}>{props.packs[i].name.length > 25 ? props.packs[i].name.slice(0, 25) + '...' : props.packs[i].name}</NavLink></Button>)
            /*<NavLink onClick={onCardsClick} className={`${s.link} + ${!choosen ? s.chosenBtn : s.MainBtn}`}
            to={PATH.PACKS_LIST}>{t('packs_lists')}
        </NavLink>
            */

            arr.push(props.packs[i].cardsCount)
            arr.push(moment(props.packs[i].updated).format('DD.MM.YYYY'))
            arr.push(props.packs[i].user_name.length > 25 ? props.packs[i].user_name.slice(0, 25) + '...' : props.packs[i].user_name)
            arr.push(
                <Buttons user_id={props.user_id}
                         userId={props.packs[i].user_id}
                         id={props.packs[i]._id}
                         packName={props.packs[i].name}
                         type={'pack'}
                         deletePackFun={props.deletePackFun}
                />
            )
            array.push(arr)
        }
    }

    if (props.cards) {
        for (let i = 0; i < props.cards.length; i++) {
            let arr = []
            arr.push(props.cards[i].question.length > 25 ? props.cards[i].question.slice(0, 25) + '...' : props.cards[i].question)
            arr.push(props.cards[i].answer.length > 25 ? props.cards[i].answer.slice(0, 25) + '...' : props.cards[i].answer)
            arr.push(props.cards[i].grade)
            arr.push(moment(props.cards[i].updated).format('DD.MM.YYYY'))
            arr.push(
                <Buttons user_id={props.user_id}
                         userId={props.cards[i].user_id}
                         id={props.cards[i]._id}
                         answer={props.cards[i].answer}
                         type={'pack'}
                         question= {props.cards[i].question}
                         deleteCardFun= {props.deleteCardFun}
                />
            )
            array.push(arr)
        }
    }


    return (
        <Table items={array} titles={props.titles}/>
    )
}


/*(<>
            {props.success ? <PreloaderForApp/> :
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
                                    <NavLink to={`${PATH.CARDS_LIST}` + pack._id}>{pack.name}</NavLink>
                                </Button>
                            </td>
                            <td className={s.tableCol}>{pack.cardsCount}</td>
                            <td className={s.tableCol}>{moment(pack.updated).format('DD.MM.YYYY')}</td>
                            <td className={s.tableCol}>{pack.user_name}</td>
                            <td className={s.tableCol} style={{marginRight: '10px'}}>
                                {(props.user_id === pack.user_id) &&
                                <>
                                    <Button type="primary" danger
                                            onClick={() => props.deletePackFun?.(pack._id)}>{t('delete')}</Button>
                                    <Button onClick={() => setShowEditPackModal(true)}
                                            style={{backgroundColor: "#D9D9F1", border: "none", marginLeft: '0'}}
                                    >{t('edit')}</Button>
                                </>
                                }


                                {showEditPackModal &&
                                <Modal width={600} title={'Pack info'} visible={showEditPackModal}
                                       onCancel={handleCancel}
                                       footer={[
                                           <Button key="back" onClick={handleCancel}>
                                               Return
                                           </Button>,
                                           <Button key="submit" type="primary" onClick={() => {/!*
                                            dispatch(updatePackTC(pack._id, newName))*!/
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

                                <Button className={s.learnButton}
                                        onClick={()=> setShowLearnModal(true)}>{t('learn')}</Button>



                            </td>
                        </tr>
                    ))}
                    {showLearnModal && <Learn showLearnModal={showLearnModal} packId={''} setShowLearnModal={setShowLearnModal}/>}

                    </tbody>
                </table>
            }
        </>
    )
}*/


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
