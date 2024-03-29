import { AppThunkType } from '../../App/redux-store';
import { PasswordRecoveryAPI } from '../../api/api';
import { moreDetails } from '../PacksList/packsList-reducer';

const initialStatePasswordRecovery = {
  error: '',
  loadingRequest: false,
  success: false,
};

export const passwordRecoveryReducer = (
  state: InitialPasswordRecoveryType = initialStatePasswordRecovery,
  action: ActionsPasswordRecoveryType
): InitialPasswordRecoveryType => {
  switch (action.type) {
    case 'PASSWORD-RECOVERY/SET-ERROR':
      return { ...state, ...action.payload };
    case 'PASSWORD-RECOVERY/SET-LOADING':
      return { ...state, ...action.payload };
    case 'PASSWORD-RECOVERY/SET-SUCCESS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

//actionC
const setLoadingRequest = (loadingRequest: boolean) =>
  ({
    type: 'PASSWORD-RECOVERY/SET-LOADING',
    payload: { loadingRequest },
  } as const);
export const setSuccess = (success: boolean) =>
  ({
    type: 'PASSWORD-RECOVERY/SET-SUCCESS',
    payload: { success },
  } as const);
export const setServerErrorMessageRecovery = (error: string) => {
  return {
    type: 'PASSWORD-RECOVERY/SET-ERROR',
    payload: { error },
  } as const;
};

//thunkC
export const passwordRecoveryThunk =
  (email: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setLoadingRequest(true));

    try {
      await PasswordRecoveryAPI.forgot(email);
      dispatch(setSuccess(true));
    } catch (e) {
      const error = e.response ? e.response.data.error : e.message + moreDetails;
      dispatch(setServerErrorMessageRecovery(error));

      dispatch(setSuccess(false));
    } finally {
      dispatch(setLoadingRequest(false));
    }
  };

//types
export type InitialPasswordRecoveryType = typeof initialStatePasswordRecovery;
export type ActionsPasswordRecoveryType =
  | ReturnType<typeof setLoadingRequest>
  | ReturnType<typeof setSuccess>
  | ReturnType<typeof setServerErrorMessageRecovery>;
