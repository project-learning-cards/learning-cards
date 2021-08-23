import {AppStateType} from "../../App/redux-store";
import {useSelector} from "react-redux";
import {CardsPackType} from "../../api/api";
import {ProfileResponseType} from "./profile-reducer";

interface ProfileSelector {
    packsList: Array<CardsPackType>,
    isAuth: boolean,
    idUser: string,
    loadingRequest: boolean,
    profile: ProfileResponseType,
    searchName: string,
    minFilter: number,
    maxFilter: number,
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    id: string | undefined
}

const profileSelector = (state: AppStateType) => {
    return {
        packsList: state.packsList.cardPacks,
        isAuth: state.login.logIn,
        idUser: state.profile.profile._id,
        loadingRequest: state.login.loadingRequest,
        profile: state.profile.profile,
        searchName: state.search.search,
        minFilter: state.search.min,
        maxFilter: state.search.max,
        page: state.packsList.page,
        pageCount: state.packsList.pageCount,
        cardPacksTotalCount: state.packsList.cardPacksTotalCount,
        id: state.packsList.user_id
    }

}

export const useProfileSelector=():ProfileSelector=> {
    return useSelector<AppStateType, ProfileSelector>(profileSelector)
}
