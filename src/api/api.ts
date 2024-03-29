import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

//API
export const loginAPI = {
  logIn(email: string, password: string, rememberMe: boolean = false) {
    return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe });
  },
};
export const PasswordRecoveryAPI = {
  forgot(email: string) {
    return instance.post<PasswordRecoveryDataType>('/auth/forgot', {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                        <a href="https://IvanStupchyk.github.io/learning-cards#/new-password/$token$">link</a></div>`,
    });
  },
};
export const registrationAPI = {
  register(email: string, password: string) {
    return instance.post<RegistrationResponseType>('auth/register', { email, password });
  },
};
export const SetNewPasswordAPI = {
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<SetNewPasswordDataType>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};
export const authAPI = {
  me() {
    return instance.post<LoginResponseType>('auth/me', {});
  },
  updateProfile(UserData: UserData) {
    return instance.put<ProfileResponseType>('auth/me', UserData);
  },
  logOut() {
    return instance.delete<LogOutType>('auth/me');
  },
};
export const PacksListAPI = {
  getPacks(params: GetPacksAPIParamsType) {
    const { page, max, min, packName, pageCount, user_id } = params;
    const user__id = user_id !== undefined ? `&user_id=${user_id}` : '';
    return instance.get(
      `cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}${user__id}`
    );
  },
  addCardsPack(data: AddCardsAPIParamsType) {
    return instance.post<Array<CardsPackType>>('/cards/pack', data);
  },
  deleteCardsPack(params: { id: string }) {
    return instance.delete<Array<CardsPackType>>('/cards/pack', { params });
  },
  changeCardsPack(_id: string, name: string) {
    debugger;
    return instance.put('/cards/pack', { cardsPack: { _id, name } });
  },
};
export const CardsListAPI = {
  getCards(params: GetCardsAPIParamsType) {
    return instance.get<ResultGetCardsAPIType>(`/cards/card?cardsPack_id=${params.cardPack_id}` + '&pageCount=50');
  },
  addCard(data: AddCardDataType) {
    return instance.post<Array<CardType>>('/cards/card', data);
  },
  deleteCard(params: { id: string }) {
    return instance.delete<Array<CardType>>('/cards/card', { params });
  },
  changeCard(_id: string, question?: string, answer?: string) {
    return instance.put<Array<CardType>>('/cards/card', { card: { _id, question, answer } });
  },
  setCardGrade(grade: number, card_id: string) {
    return instance.put<SetGradeResponseType>('/cards/grade', { grade, card_id });
  },
};

//TYPES=====

//loginAPI
export type LoginResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: '';
  updated: '';
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
};

//profileAPI
export type ProfileResponseType = {
  updatedUser: LoginResponseType;
  error?: string;
  token: string;
  tokenDeathTime: number;
};

//authAPI
type LogOutType = {
  info: string;
  error: string;
};

//PasswordRecoveryAPI
export type PasswordRecoveryDataType = {
  error: string;
};

//SetNewPasswordAPI
export type SetNewPasswordDataType = {
  info: string;
  error: string;
};

//registrationAPI
type RegistrationResponseType = {
  addedUser: AddedUserType;
  error?: string;
};
type AddedUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: 0;
  created: string;
  updated: string;
  __v: number;
};

//PacksListAPI
type CardAndPackType = 'pack' | 'folder' | 'card';
export type CardsPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private?: boolean;
  name: string;
  path?: string;
  grade?: number;
  shots?: number;
  deckCover: string;
  cardsCount: number;
  type?: CardAndPackType;
  rating?: number;
  created: string;
  updated: string;
  more_id: string;
  __v?: number;
};

export type GetPacksListParamsType = {
  packName: string;
  min: number;
  max: number;
  sortPacks: string;
  page: number;
  pageCount: number;
  user_id?: string;
};

export type GetPacksAPIParamsType = Partial<GetPacksListParamsType>;

export type ResultGetPacksAPIType = {
  cardPacks: Array<CardsPackType>;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
};
export type AddCardsPackDataType = {
  cardsPack: {
    name?: string;
    path?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    deckCover?: string;
    private?: boolean;
    type?: string;
  };
};

export type AddCardsAPIParamsType = Partial<AddCardsPackDataType>;

export type UserData = {
  name: string;
  avatar: string;
};

//CardsListAPI
export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  rating?: number;
  type?: CardAndPackType;
  created: string;
  updated: string;
  __v?: number;
  _id: string;
  user_id: string;
};
export type GetCardsAPIParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type ResultGetCardsAPIType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
export type AddCardDataType = {
  card: {
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    type?: CardAndPackType;
  };
};

//LearnAPI
type SetGradeResponseType = {
  updatedGrade: {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
  };
};
