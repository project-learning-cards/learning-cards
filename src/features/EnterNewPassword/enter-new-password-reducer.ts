import { SetNewPasswordAPI } from '../../api/api';
import { AppThunkType } from '../../App/redux-store';
import { moreDetails } from '../PacksList/packsList-reducer';

const initialStateSetNewPassword = {
  error: '',
  loadingRequest: false,
  success: false,
};

export const setNewPasswordReducer = (
  state: InitialSetNewPasswordType = initialStateSetNewPassword,
  action: ActionsSetNewPasswordType
): InitialSetNewPasswordType => {
  switch (action.type) {
    case 'SET-NEW-PASSWORD/SET-ERROR':
      return { ...state, ...action.payload };
    case 'SET-NEW-PASSWORD/SET-LOADING':
      return { ...state, ...action.payload };
    case 'SET-NEW-PASSWORD/SET-SUCCESS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

//AC
export const setServerErrorMessage = (error: string) =>
  ({ type: 'SET-NEW-PASSWORD/SET-ERROR', payload: { error } } as const);
const setLoading = (loadingRequest: boolean) =>
  ({ type: 'SET-NEW-PASSWORD/SET-LOADING', payload: { loadingRequest } } as const);
const setSuccess = (success: boolean) => ({ type: 'SET-NEW-PASSWORD/SET-SUCCESS', payload: { success } } as const);

//TC
export const setNewPasswordThunk =
  (password: string, token: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      await SetNewPasswordAPI.setNewPassword(password, token);
      dispatch(setSuccess(true));
    } catch (e) {
      const error = e.response ? e.response.data.error : e.message + moreDetails;
      dispatch(setServerErrorMessage(error));

      dispatch(setSuccess(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

//types
export type InitialSetNewPasswordType = typeof initialStateSetNewPassword;
export type ActionsSetNewPasswordType =
  | ReturnType<typeof setServerErrorMessage>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setSuccess>;
