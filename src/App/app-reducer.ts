import React from 'react'
import { Dispatch } from 'redux'



const initialState = {
  appStatus: "idle" as AppStatusType,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
    switch(action.type){
        case "IS_INITIALIZED":
            return {...state, appStatus: action.status}
        default:
            return state
    }
}


//AC
export const isInitializedAC = (status: AppStatusType) => ({
  type: "IS_INITIALIZED",
  status,
} as const)

//TC

export const isInitializedTC = () =>  (dispatch: Dispatch) => {
   
}   


//types
type InitialStateType = typeof initialState
export type ActionType = IsInitializedType

export type IsInitializedType = ReturnType<typeof isInitializedAC>

export type AppStatusType = "idle" | "loading" | "succeeded" | "failed"
