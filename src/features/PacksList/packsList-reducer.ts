import {
  AddCardsPackDataType,
  CardsPackType,
  GetPacksAPIParamsType,
  PacksListAPI,
  UpdateParamsType,
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
  user_id: undefined,
  success: false,
}


export type InitialStateType = typeof InitialState

//types
type GetPacksListAT = ReturnType<typeof GetPacksListAC>
type SetPageNumber = ReturnType<typeof setPageNumberAC>
type SetTotalPacksCountAC = ReturnType<typeof setTotalPacksCountAC>
type SetPageCountAC = ReturnType<typeof setPageCountAC>
type SetSuccessAT = ReturnType<typeof SetSuccessAC>
// type AddPackAT = ReturnType<typeof AddPackAC>

export type ActionPacksListType =
  | GetPacksListAT
  | SetSuccessAT
  | SetPageNumber
  | SetTotalPacksCountAC
  | SetPageCountAC

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
    const { page } = getStore().packsList
   
    try {
      const response = await PacksListAPI.getPacks({ ...params, page })
      dispatch(GetPacksListAC(response.data.cardPacks))
      dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
      dispatch(SetSuccessAC(true))
      
    } catch (e) {
      const error = e.response ? e.response.data.error : e.message + moreDetails
      dispatch(SetSuccessAC(false))
      
    } finally {
    }
  }

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
      debugger
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
/*
export const updatePack = (_id: string, name: string, count: number): AppThunkType => dispatch => {
 /!* dispatch(setAppStatusAC('loading'))*!/
  PacksListAPI.changeCardsPack(_id, name)
      .then(() => {
        dispatch(getPackList({pageCount: count}))
     /!*   dispatch(setAppStatusAC('succeeded'))*!/
      })
      .catch(error => {
        console.log(error)
  /!*      dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC('failed'))*!/
      })
}*/
