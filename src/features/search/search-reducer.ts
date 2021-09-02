//state
const initialState = {
  min: 0,
  max: 103,
  search: '',
};

//actionC
export const setMinMaxValueAC = (values: Array<number>) => ({ type: 'search/SET-MIN-MAX-VALUE', values } as const);
export const setSearchValueAC = (value: string) => ({ type: 'search/SET-SEARCH-VALUE', value } as const);

//reducer
export const searchReducer = (state = initialState, action: ActionSearchType): InitialStateType => {
  switch (action.type) {
    case 'search/SET-MIN-MAX-VALUE':
      return { ...state, min: action.values[0], max: action.values[1] };
    case 'search/SET-SEARCH-VALUE':
      return { ...state, search: action.value };
    default:
      return state;
  }
};

//types
type setMinMaxValueAT = ReturnType<typeof setMinMaxValueAC>;
type setSearchValueAT = ReturnType<typeof setSearchValueAC>;

type InitialStateType = typeof initialState;

export type ActionSearchType = setMinMaxValueAT | setSearchValueAT;
