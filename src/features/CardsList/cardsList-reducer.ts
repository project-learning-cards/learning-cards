import { AddCardDataType, CardsListAPI, CardType, GetCardsAPIParamsType, } from "../../api/api";
import { AppThunkType, GetAppStateType } from "../../App/redux-store";
import { Dispatch } from "redux";
import { moreDetails } from "../PacksList/packsList-reducer";

const initialState = {
    arrayCard: [] as Array<CardType>,
    grade: 0,
    sortCards: "" as string,
    maxGrade: 1000 as number | undefined,
    minGrade: 0 as number | undefined,
    page: 1,
    pageCount: 5,
    cardsTotalCount: 100,
    cardsPack_id: "",
    searchVal: "",
    sort: "",
    question: "",
    searchCardQuestion: "" as string | undefined,
    success: false,
    packName: ''
}

//types
type InitialStateType = typeof initialState

type GetCardsListAT = ReturnType<typeof GetCardsListAC>
type setGradeCardAT = ReturnType<typeof setGradeCardAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>
type SetPackNameAT = ReturnType<typeof setPackName>

export type ActionCardsListType = GetCardsListAT | SetSuccessAT | setGradeCardAT | SetPackNameAT


//actionC
export const GetCardsListAC = (params: Array<CardType>) => ({ type: "cardList/GET-CARDSLIST", params } as const)
export const SetSuccessAC = (success: boolean) => ({ type: "cardList/SET-SUCCESS", success } as const)
export const setGradeCardAC = (grade: number) => ({ type: "SET-GRADE", grade } as const)
export const setPackName = (name: string) => ({ type: "SET-PACK-NAME", name } as const)


export const cardsListReducer = (state = initialState, action: ActionCardsListType): InitialStateType => {
    switch (action.type) {
        case "cardList/GET-CARDSLIST":
            return { ...state, arrayCard: action.params.map(cl => ({ ...cl })) }
        case "cardList/SET-SUCCESS":
            return { ...state, success: action.success }
        case "SET-GRADE": {
            return { ...state, grade: action.grade };
        }
        case "SET-PACK-NAME": {
            return {...state, packName: action.name}
        }

        default:
            return state
    }
}

//thunkC
export const getCardsList = (params: GetCardsAPIParamsType): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>, getStore: GetAppStateType) => {

    try {
        const response = await CardsListAPI.getCards({ ...params })
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
        const response = await CardsListAPI.getCards({ cardPack_id: data.card.cardsPack_id })
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

export const deleteCard = (params: { id: string, cardPack_id: string }): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
        const responseDelete = await CardsListAPI.deleteCard(params)
        const response = await CardsListAPI.getCards({ cardPack_id: params.cardPack_id })
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

export const updateCard = (cardId: string, packId: string,  question: string, answer: string): AppThunkType => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
         await CardsListAPI.changeCard(cardId, question, answer)
        const response = await CardsListAPI.getCards({ cardPack_id: packId })
        dispatch(GetCardsListAC(response.data.cards))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + moreDetails);
    } finally {
    }
}

export const gradeCardTC = (grade: number, card_id: string) => async (dispatch: Dispatch<ActionCardsListType>) => {

    try {
        await CardsListAPI.setCardGrade(grade, card_id)
    } catch (e) {
        console.log('GRADE_CARD_ERROR: ', { ...e })
    } finally {

    }
}

