import {
    AddCardsAPIParamsType,
    CardsPackType,
    GetPacksListParamsType,
    PacksListAPI,
    ResultGetPacksAPIType,
} from '../../api/api'
import {AppThunkType, GetAppStateType} from '../../App/redux-store'
import {Dispatch} from 'redux'

const InitialState = {
    cardPacks: [] as CardsPackType[],
    packsParams: {
        max: 103,
        min: 0,
        page: 1 as number,
        pageCount: 6,
        sortPacks: "" as string | undefined,
        packName: "" as string | undefined,
    } as GetPacksListParamsType,
    cardPacksTotalCount: 14,
    token: "",
    tokenDeathTime: 0,
    user_id: undefined as string | undefined,
    success: false,
    isLoading: true as boolean
}

//types
export type InitialStateType = typeof InitialState

type StartPackListLoadingAT = ReturnType<typeof StartPackListLoadingAC>
type SuccessPackListLoadingAT = ReturnType<typeof SuccessPackListLoadingAC>
type LoadingErrorAT = ReturnType<typeof LoadingErrorAC>
type setPageNumberAT = ReturnType<typeof setPageNumberAC>

export type ActionPacksListType =
    | StartPackListLoadingAT
    | SuccessPackListLoadingAT
    | LoadingErrorAT
    | setPageNumberAT

//actionC
export const setPageNumberAC = (page: number) =>
    ({type: 'packList/SET-PAGE-NUMBER', page} as const)
export const StartPackListLoadingAC = (params: GetPacksListParamsType) =>
    ({type: 'packList/LOADING-START', params} as const)
export const SuccessPackListLoadingAC = (params: ResultGetPacksAPIType) =>
    ({type: 'packList/LOADING-SUCCESS', params} as const)
export const LoadingErrorAC = (error: string) =>
    ({type: 'packList/LOADING-ERROR', error} as const)


export const packsListReducer = (state = InitialState, action: ActionPacksListType): InitialStateType => {
    switch (action.type) {
        case 'packList/SET-PAGE-NUMBER': {
            return {
                ...state,
                packsParams: {...state.packsParams, page: action.page}
            }
        }
        case 'packList/LOADING-START':
            return {
                ...state,
                isLoading: true,
                packsParams: {
                    ...state.packsParams,
                    packName: action.params.packName,
                    min: action.params.min,
                    max: action.params.max,
                    sortPacks: action.params.sortPacks,
                    page: action.params.page,
                    pageCount: action.params.pageCount
                },
                user_id: action.params.user_id
            }
        case 'packList/LOADING-SUCCESS':
            return {
                ...state, isLoading: false,
                packsParams: {
                    ...state.packsParams,
                    page: 1,
                    min: action.params.minCardsCount,
                    max: action.params.maxCardsCount,
                    pageCount: action.params.pageCount
                },
                cardPacksTotalCount: action.params.cardPacksTotalCount,
                token: action.params.token,
                tokenDeathTime: action.params.tokenDeathTime,
                cardPacks: action.params.cardPacks,
            }
        case 'packList/LOADING-ERROR':
            return {...state, success: false, isLoading: false}
        default:
            return state
    }
}


//thunkC
export let moreDetails = ', more details in the console'


export const updatePackListTC = (params: GetPacksListParamsType): AppThunkType =>
    async (dispatch: Dispatch<ActionPacksListType>) => {
      try {
        const requestParams = {...params, /*min: params.user_id ? 0 : 1*/}
        dispatch(StartPackListLoadingAC(requestParams))
        const response = await PacksListAPI.getPacks(requestParams)
        dispatch(SuccessPackListLoadingAC(response.data))
      } catch (e) {
        dispatch(LoadingErrorAC(e))
      }
    }

export const addPack = (data: AddCardsAPIParamsType, user_id: string | undefined): AppThunkType =>
    async (dispatch: Dispatch<ActionPacksListType>, getState: GetAppStateType) => {
        const {sortPacks, pageCount, packName, min, max, page} =
            getState().packsList.packsParams
        try {
            const requestParams = {user_id: user_id,sortPacks, pageCount, packName, min, max, page}
            const requestObj = {...data}
            dispatch(StartPackListLoadingAC(requestParams))
            await PacksListAPI.addCardsPack(requestObj)
            const response = await PacksListAPI.getPacks(requestParams)
            dispatch(SuccessPackListLoadingAC(response.data))
        } catch (e) {
            dispatch(LoadingErrorAC(e))
        }
    }

export const deletePack = (params: { id: string }, _id: string): AppThunkType =>
    async (dispatch: Dispatch<ActionPacksListType>, getState: GetAppStateType) => {
        const {sortPacks, pageCount, packName, min, max, page} =
            getState().packsList.packsParams
        try {
            const requestParams = {sortPacks, pageCount, packName, min, max, page, user_id: _id}
            const requestObj = {...params}
            dispatch(StartPackListLoadingAC(requestParams))
            await PacksListAPI.deleteCardsPack(requestObj)
            const response = await PacksListAPI.getPacks(requestParams)
            dispatch(SuccessPackListLoadingAC(response.data))
        } catch (e) {
            dispatch(LoadingErrorAC(e))
        }
    }









/*export const getPackList =
(params: GetPacksAPIParamsType): AppThunkType =>
    async (
        dispatch: Dispatch<ActionPacksListType>,
        getStore: GetAppStateType
    ) => {
        const {page} = getStore().packsList

        try {

            const response = await PacksListAPI.getPacks({...params, page})
            dispatch(GetPacksListAC(response.data.cardPacks))
            dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
            dispatch(SetSuccessAC(true))

        } catch (e) {
            const error = e.response ? e.response.data.error : e.message + moreDetails
            dispatch(SetSuccessAC(false))

        } finally {
        }
    }*/

/*export const addPack =
    (data: AddCardsPackDataType): AppThunkType =>
        async (
            dispatch: Dispatch<ActionPacksListType>,
            getState: GetAppStateType
        ) => {
            const {sortPacks, page, user_id, pageCount, packName} =
                getState().packsList.packsParams
            try {
                const responseAdd = await PacksListAPI.addCardsPack(data)
                const response = await PacksListAPI.getPacks({
                    pageCount,
                    user_id,
                    page,
                    sortPacks,
                    packName,
                })
                dispatch(GetPacksListAC(response.data.cardPacks))
            } catch (e) {
                const error = e.response ? e.response.data.error : e.message + moreDetails
            } finally {
            }
        }*/

/*export const deletePack =
(params: { id: string }): AppThunkType =>
    async (
        dispatch: Dispatch<ActionPacksListType>,
        getState: GetAppStateType
    ) => {
        const {sortPacks, page, pageCount, packName} =
            getState().packsList
        const _id = getState().profile.profile._id
        try {
            const responseDelete = await PacksListAPI.deleteCardsPack(params)
            const response = await PacksListAPI.getPacks({
                pageCount,
                user_id: _id,
                page,
                sortPacks,
                packName,
            })
            dispatch(GetPacksListAC(response.data.cardPacks))
        } catch (e) {
            const error = e.response ? e.response.data.error : e.message + moreDetails
        } finally {
        }
    }*/

/*export const updatePackTC = (_id: string, name: string): AppThunkType =>
    async (
        dispatch: Dispatch<ActionPacksListType>,
        getState: GetAppStateType
    ) => {
        const {sortPacks, page, user_id, pageCount, packName} =
            getState().packsList

        try {
            const responseUpdate = await PacksListAPI.changeCardsPack(_id, name)
            const response = await PacksListAPI.getPacks({
                pageCount,
                user_id,
                page,
                sortPacks,
                packName,
            })
            dispatch(GetPacksListAC(response.data.cardPacks))
        } catch (e) {
            const error = e.response ? e.response.data.error : e.message + moreDetails
        } finally {
        }
    }*/



