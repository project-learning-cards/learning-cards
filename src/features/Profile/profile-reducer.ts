import { AppThunkType } from '../../App/redux-store';
import { Dispatch } from 'redux';
import { authAPI, UserData } from '../../api/api';

const initialStateProfile = {
  profile: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
  } as ProfileResponseType,
  error: '',
  token: '',
  tokenDeathTime: 0,
  isLoading: true as boolean,
  success: false,
  isLanguage: true,
};

export const profileReducer = (state: InitialProfileType = initialStateProfile, action: ActionsProfileType) => {
  switch (action.type) {
    case 'PROFILE/SET_PROFILE_DATA': {
      return { ...state, ...action.payload };
    }
    case 'PROFILE/LOADING-START': {
      return {
        ...state,
        isLoading: true,
        success: true,
        profile: {
          ...state.profile,
          avatar: action.data.avatar,
          name: action.data.name,
        },
      };
    }
    case 'PROFILE/LOADING-SUCCESS': {
      return {
        ...state,
        isLoading: false,
        success: false,
        profile: {
          ...state.profile,
          avatar: action.params.avatar,
          name: action.params.name,
        },
      };
    }
    case 'PROFILE/LOADING-ERROR':
      return { ...state, success: false, isLoading: false };

    case 'PROFILE/UPDATE-LANGUAGE': {
      return { ...state, isLanguage: action.isLanguage };
    }

    /* case "PROFILE/LOADING-REQUEST":
             return {...state, ...action.payload}*/

    /* case "PROFILE/UPDATE-PROFILE":
             return {
                 ...state,
                 profile: {...state.profile, ...action.payload}
             }*/
    default:
      return state;
  }
};

//actionC
export const setProfileAC = (profile: ProfileResponseType) => {
  return {
    type: 'PROFILE/SET_PROFILE_DATA',
    payload: { profile },
  } as const;
};
const loadingRequestAC = (loadingRequest: boolean) => {
  return {
    type: 'PROFILE/LOADING-REQUEST',
    payload: { loadingRequest },
  } as const;
};
/*export const updateProfileAC = (avatar: string, name: string) => ({
    type: "PROFILE/UPDATE-PROFILE",
    payload: {avatar, name}
} as const)*/

export const StartProfileLoadingAC = (data: UserData) =>
  ({
    type: 'PROFILE/LOADING-START',
    data,
  } as const);
export const SuccessProfileLoadingAC = (params: ProfileResponseType) =>
  ({ type: 'PROFILE/LOADING-SUCCESS', params } as const);
export const LoadingErrorAC = (error: string) => ({ type: 'PROFILE/LOADING-ERROR', error } as const);
export const UpdateLanguageAC = (isLanguage: boolean) => ({ type: 'PROFILE/UPDATE-LANGUAGE', isLanguage } as const);

//thunkC
/*export const updateProfile = (avatar: string, name: string): AppThunkType => async (dispatch: Dispatch<ActionsProfileType>) => {
    dispatch(loadingRequestAC(true))
    try {
        const response = await authAPI.updateProfile(avatar, name)
        debugger
        dispatch(updateProfileAC(response.data.updatedUser.avatar, response.data.updatedUser.name))
    } catch (e) {
        /!*const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setServerErrorMessageRegistration(error))*!/
    } finally {
        dispatch(loadingRequestAC(false))
    }
}*/

export const updateProfile =
  (userData: UserData): AppThunkType =>
  async (dispatch: Dispatch<ActionsProfileType>) => {
    try {
      dispatch(StartProfileLoadingAC(userData));
      const response = await authAPI.updateProfile(userData);
      dispatch(SuccessProfileLoadingAC(response.data.updatedUser));
    } catch (e) {
      dispatch(LoadingErrorAC(e));
    }
  };

/*

export const setProfile = (): AppThunkType => async (dispatch: Dispatch<ActionsProfileType>) => {
    try {
        const response = await authAPI.me()
        dispatch(setProfileAC(response.data))
    } catch (e) {
    }
}
*/

//types
type InitialProfileType = typeof initialStateProfile;

export type ActionsProfileType =
  | ReturnType<typeof loadingRequestAC>
  | ReturnType<typeof StartProfileLoadingAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof SuccessProfileLoadingAC>
  | ReturnType<typeof LoadingErrorAC>
  | ReturnType<typeof UpdateLanguageAC>;

export type ProfileResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
};
