import {
    AddCardDataType,
    AddCardsPackDataType,
    CardsListAPI,
    CardType, GetCardsAPIParamsType,
    PacksListAPI,
} from "../../api/api";
import {AppThunkType, GetAppStateType} from "../../App/redux-store";
import {Dispatch} from "redux";
import {ActionPacksListType, GetPacksListAC, moreDetails} from "../PacksList/packsList-reducer";

const initialState = {
    arrayCard: [] as Array<CardType>,
    success: false
}

//types
type InitialStateType = typeof initialState
type GetCardsListAT = ReturnType<typeof GetCardsListAC>

export type ActionCardsListType = GetCardsListAT | SetSuccessAT
type SetSuccessAT = ReturnType<typeof SetSuccessAC>

//actionC
export const GetCardsListAC = (params: Array<CardType>) => ({type: "cardList/GET-CARDSLIST", params} as const)
export const SetSuccessAC = (success: boolean) => ({type: "cardList/SET-SUCCESS", success} as const)

export const cardsListReducer = (state = initialState, action: ActionCardsListType): InitialStateType => {
    switch (action.type) {
        case "cardList/GET-CARDSLIST":
            return {...state, arrayCard: action.params.map(cl => ({...cl}))}
        case "cardList/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//thunkC
export const getCardsList = (params: GetCardsAPIParamsType): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>, getStore: GetAppStateType) => {

    try {
        const response = await CardsListAPI.getCards({...params})
        dispatch(GetCardsListAC(response.data.cards))
        dispatch(SetSuccessAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
        dispatch(SetSuccessAC(false))
    } finally {
    }
}

export const addCard = (data: AddCardDataType): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
        const responseAdd = await CardsListAPI.addCard(data)
        const response = await CardsListAPI.getCards({cardPack_id: data.card.cardsPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

export const deleteCard = (params: {id: string, cardPack_id: string}): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
        const responseDelete = await CardsListAPI.deleteCard(params)
        const response = await CardsListAPI.getCards({cardPack_id: params.cardPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

export const updateCard = (data: { card: { _id: string, question?: string, answer?: string, comments?: string }, cardPack_id: string }): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
        const responseUpdate = await CardsListAPI.changeCard(data)
        const response = await CardsListAPI.getCards({cardPack_id: data.cardPack_id})
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

