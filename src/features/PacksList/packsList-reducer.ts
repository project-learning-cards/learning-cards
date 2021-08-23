import {
  AddCardsPackDataType,
  CardsPackType,
  GetPacksAPIParamsType, GetPacksListParamsType,
  PacksListAPI, ResultGetPacksAPIType,
} from '../../api/api'
import {AppThunkType, GetAppStateType} from '../../App/redux-store'
import {Dispatch} from 'redux'

const InitialState = {
  cardPacks: [] as CardsPackType[],
  cardPacksTotalCount: 14,
  maxCardsCount: 103,
  minCardsCount: 0,
  page: 1 as number,
  pageCount: 6,
  token: "",
  tokenDeathTime: 0,
  sortPacks: "" as string | undefined,
  packName: "" as string | undefined,
  minParam: 0,
  maxParam: 103,
  user_id: undefined as string | undefined,
  success: false,
  isLoading: true as boolean
}


export type InitialStateType = typeof InitialState

//types
type GetPacksListAT = ReturnType<typeof GetPacksListAC>
type SetPageNumber = ReturnType<typeof setPageNumberAC>
type SetTotalPacksCountAC = ReturnType<typeof setTotalPacksCountAC>
type SetPageCountAC = ReturnType<typeof setPageCountAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>
type StartPackListLoadingAT = ReturnType<typeof StartPackListLoadingAC>
type SuccessPackListLoadingAT = ReturnType<typeof SuccessPackListLoadingAC>
type LoadingErrorAT = ReturnType<typeof LoadingErrorAC>
// type AddPackAT = ReturnType<typeof AddPackAC>

export type ActionPacksListType =
  | GetPacksListAT
  | SetSuccessAT
  | SetPageNumber
  | SetTotalPacksCountAC
  | SetPageCountAC
| StartPackListLoadingAT
| SuccessPackListLoadingAT
| LoadingErrorAT

//actionC
export const GetPacksListAC = (packs: Array<CardsPackType>) =>
  ({ type: 'packList/GET-PACKSLIST', packs } as const)
export const setPageNumberAC = (page: number) =>
  ({ type: 'packList/SET-PAGE-NUMBER', page } as const)
export const setTotalPacksCountAC = (cardPacksTotalCount: number) =>
  ({ type: 'packList/SET-PACKS-TOTAL-COUNT', cardPacksTotalCount } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packList/SET-PAGE-COUNT', pageCount } as const)

export const SetSuccessAC = (success: boolean) =>
  ({ type: 'packList/SET-SUCCESS', success } as const)

export const StartPackListLoadingAC = (params: GetPacksListParamsType) =>
  ({ type: 'packList/LOADING-START', params } as const)
export const SuccessPackListLoadingAC = (params: ResultGetPacksAPIType) =>
  ({ type: 'packList/LOADING-SUCCESS', params } as const)
export const LoadingErrorAC = (error: string) =>
  ({ type: 'packList/LOADING-ERROR', error } as const)

//export const AddPackAC = (payload: addCardsPackDataType) => ({type: "packList/ADD-PACK", payload} as const)

export const packsListReducer = (state = InitialState, action: ActionPacksListType): InitialStateType => {
  switch (action.type) {
    case 'packList/GET-PACKSLIST':
      return {
        ...state,
        cardPacks: action.packs,
      }
    case 'packList/SET-PAGE-NUMBER': {
      return {
        ...state,
        page: action.page
      }
    }
    case 'packList/SET-PACKS-TOTAL-COUNT': {
      return {
        ...state,
        cardPacksTotalCount: action.cardPacksTotalCount,
      }
    }
    case 'packList/SET-PAGE-COUNT': {
      return {
        ...state,
       pageCount: action.pageCount
      }
    }
    case 'packList/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'packList/LOADING-START':
      return {...state, isLoading: true, packName: action.params.packName, minCardsCount: action.params.min, maxCardsCount: action.params.max,
        sortPacks: action.params.sortPacks, page: action.params.page, pageCount: action.params.pageCount, user_id: action.params.user_id}
    case 'packList/LOADING-SUCCESS':
      return {...state, isLoading: false,
        page: action.params.page,
        cardPacksTotalCount: action.params.cardPacksTotalCount,
        maxCardsCount: action.params.maxCardsCount,
        minCardsCount: action.params.minCardsCount,
        pageCount: action.params.pageCount,
        token: action.params.token,
        tokenDeathTime: action.params.tokenDeathTime,
        cardPacks: action.params.cardPacks
      }
    case 'packList/LOADING-ERROR':
      return { ...state, success: false, isLoading: false }
    default:
      return state
  }
}



//thunkC
export let moreDetails = ', more details in the console'

export const getPackList =
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
  }


 /* export const getPackList=  (params: GetPacksListParamsType): AppThunkType=>
      async (dispatch: Dispatch<ActionPacksListType>,
    getStore: GetAppStateType
  ) => {
    const {page} = getStore().packsList
  try {
    const requestParams= {...params, page: page}
    dispatch(StartPackListLoadingAC(requestParams))
    const response= await PacksListAPI.getPacks(requestParams)
    dispatch(SuccessPackListLoadingAC(response.data))
  }
  catch (e) {
    dispatch(LoadingErrorAC(e))
  }
}
*/








export const addPack =
  (data: AddCardsPackDataType): AppThunkType =>
  async (
    dispatch: Dispatch<ActionPacksListType>,
    getState: GetAppStateType
  ) => {
    const { sortPacks, page, user_id, pageCount, packName } =
      getState().packsList
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
  }

export const deletePack =
  (params: { id: string }): AppThunkType =>
  async (
    dispatch: Dispatch<ActionPacksListType>,
    getState: GetAppStateType
  ) => {
    const { sortPacks, page, pageCount, packName } =
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
  }

export const updatePackTC =  (_id: string, name: string): AppThunkType =>
  async (
    dispatch: Dispatch<ActionPacksListType>,
    getState: GetAppStateType
  ) => {
    const { sortPacks, page, user_id, pageCount, packName } =
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
  }

  export const updatePackListTC=  (params: GetPacksListParamsType): AppThunkType=>
      async (dispatch: Dispatch<ActionPacksListType>) => {
  try {
    const requestParams= {...params, min: params.user_id ? 0 : 1}
    dispatch(StartPackListLoadingAC(requestParams))
    const response= await PacksListAPI.getPacks(requestParams)
    dispatch(SuccessPackListLoadingAC(response.data))
  }
  catch (e) {
    dispatch(LoadingErrorAC(e))
  }
}

