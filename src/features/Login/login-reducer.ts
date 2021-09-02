import { authAPI, loginAPI, LoginResponseType } from '../../api/api';
import { AppThunkType } from '../../App/redux-store';
import { moreDetails } from '../PacksList/packsList-reducer';
import { setProfileAC } from '../Profile/profile-reducer';
import { isInitializedAC } from '../../App/app-reducer';

export enum AuthStatusEnum {
  unknown,
  notAuthorized,
  authorized,
}

const initialStateLogin: InitialLoginType = {
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
  error: '',
  loadingRequest: false,
  logIn: false,
  authStatus: AuthStatusEnum.unknown,
};

export const loginReducer = (
  state: InitialLoginType = initialStateLogin,
  action: ActionsLoginType
): InitialLoginType => {
  switch (action.type) {
    case 'LOGIN/LOGIN-USER':
      return { ...state, ...action.payload };
    case 'LOGIN/SET-ERROR':
      return { ...state, ...action.payload /*authStatus: AuthStatusEnum.notAuthorized*/ };
    case 'LOGIN/LOADING-REQUEST':
      return { ...state, ...action.payload };
    case 'LOGIN/LOG-IN':
      return {
        ...state,
        ...action.payload,
        authStatus: action.payload.logIn ? AuthStatusEnum.authorized : AuthStatusEnum.notAuthorized,
      };
    default:
      return state;
  }
};

//actionC
export const loginUser = (userData: LoginResponseType) => {
  return {
    type: 'LOGIN/LOGIN-USER',
    payload: { ...userData },
  } as const;
};
const loadingRequest = (loadingRequest: boolean) => {
  return {
    type: 'LOGIN/LOADING-REQUEST',
    payload: { loadingRequest },
  } as const;
};
export const logIn = (logIn: boolean) => {
  return {
    type: 'LOGIN/LOG-IN',
    payload: { logIn },
  } as const;
};
export const setServerErrorMessageLogin = (error: string) => {
  return {
    type: 'LOGIN/SET-ERROR',
    payload: { error },
  } as const;
};

//thunkC
export const loginUserTC =
  (emailValue: string, passwordValue: string, rememberMe: boolean): AppThunkType =>
  async (dispatch) => {
    dispatch(loadingRequest(true));

    try {
      const response = await loginAPI.logIn(emailValue, passwordValue, rememberMe);
      dispatch(loginUser(response.data));
      dispatch(setProfileAC(response.data));
      dispatch(logIn(true));
    } catch (e) {
      const error = e.response ? e.response.data.error : e.message + moreDetails;
      dispatch(setServerErrorMessageLogin(error));
    } finally {
      dispatch(loadingRequest(false));
    }
  };

export const AuthUser = (): AppThunkType => async (dispatch) => {
  dispatch(loadingRequest(true));
  dispatch(isInitializedAC('loading'));
  try {
    const response = await authAPI.me();
    dispatch(logIn(true));
    dispatch(setProfileAC(response.data));
    dispatch(isInitializedAC('succeeded'));
  } catch (e) {
    const error = e.response ? e.response.data.error : e.message + moreDetails;
    dispatch(isInitializedAC('failed'));
    dispatch(logIn(false));
    console.log(error);
  } finally {
    dispatch(loadingRequest(false));
  }
};

export const logOutUser = (): AppThunkType => async (dispatch) => {
  dispatch(loadingRequest(true));
  try {
    await authAPI.logOut();
    dispatch(logIn(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(loadingRequest(false));
  }
};

//types
export type InitialLoginType = {
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
  error: string;
  loadingRequest: boolean;
  logIn: boolean;
  authStatus: AuthStatusEnum;
};
export type ActionsLoginType =
  | ReturnType<typeof loginUser>
  | ReturnType<typeof loadingRequest>
  | ReturnType<typeof logIn>
  | ReturnType<typeof setServerErrorMessageLogin>;
