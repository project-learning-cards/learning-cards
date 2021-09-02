import React from 'react';
import { NavLink } from 'react-router-dom';
import { CardsPackType, CardType } from '../../api/api';
import { Button } from 'antd';
import moment from 'moment';
import { PATH } from '../../components/routes/Pages';
import { Buttons } from './buttons/Buttons';
import { Table } from './Table';
import { useDispatch } from 'react-redux';
import { setPackName } from '../CardsList/cardsList-reducer';
import { Preloader } from '../../components/Preloader/Preloader';

type TableContainerPropsType = {
  type: 'card' | 'pack';
  packs?: Array<CardsPackType>;
  deletePackFun?: (pack_id: string) => void;
  user_id?: string;
  success?: boolean;
  deleteCardFun?: (id: string, cardPack_id: string) => void;
  cards?: Array<CardType>;
  titles: Array<string>;
};

export const TableContainer = (props: TableContainerPropsType) => {
  const dispatch = useDispatch();
  const onCardsClick = (name: string) => {
    dispatch(setPackName(name));
  };
  const array = [];
  if (props.packs) {
    for (let i = 0; i < props.packs.length; i++) {
      let arr = [];
      arr.push(
        <Button type="link" size="large">
          <NavLink to={`${PATH.CARDS_LIST}` + props.packs[i]._id} onClick={() => onCardsClick(props.packs![i].name)}>
            {props.packs[i].name.length > 25 ? props.packs[i].name.slice(0, 25) + '...' : props.packs[i].name}
          </NavLink>
        </Button>
      );
      arr.push(props.packs[i].cardsCount);
      arr.push(moment(props.packs[i].updated).format('DD.MM.YYYY'));
      arr.push(
        props.packs[i].user_name.length > 25 ? props.packs[i].user_name.slice(0, 25) + '...' : props.packs[i].user_name
      );
      arr.push(
        <Buttons
          user_id={props.user_id}
          userId={props.packs[i].user_id}
          id={props.packs[i]._id}
          packName={props.packs[i].name}
          type={'pack'}
          deletePackFun={props.deletePackFun}
        />
      );
      array.push(arr);
    }
  }
  if (props.cards) {
    for (let i = 0; i < props.cards.length; i++) {
      let arr = [];
      arr.push(
        props.cards[i].question.length > 25 ? props.cards[i].question.slice(0, 25) + '...' : props.cards[i].question
      );
      arr.push(props.cards[i].answer.length > 25 ? props.cards[i].answer.slice(0, 25) + '...' : props.cards[i].answer);
      arr.push(
        <Buttons
          user_id={props.user_id}
          userId={props.cards[i].user_id}
          id={props.cards[i]._id}
          answer={props.cards[i].answer}
          cardsPackId={props.cards[0].cardsPack_id}
          type={'card'}
          question={props.cards[i].question}
          deleteCardFun={props.deleteCardFun}
        />
      );
      array.push(arr);
    }
  }
  return props.success ? <Preloader /> : <Table items={array} titles={props.titles} />;
};
