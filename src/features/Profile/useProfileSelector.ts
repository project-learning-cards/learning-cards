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
    searchName: string | undefined,
    min: number,
    max: number,
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    id: string | undefined,
    packName: string | undefined,
    sortPacks: string,
    successProfile: boolean
}

const profileSelector = (state: AppStateType) => {
    return {
        packsList: state.packsList.cardPacks,
        isAuth: state.login.logIn,
        idUser: state.profile.profile._id,
        loadingRequest: state.login.loadingRequest,
        profile: state.profile.profile,
        searchName: state.search.search,
        min: state.search.min,
        max: state.search.max,
        page: state.packsList.packsParams.page,
        pageCount: state.packsList.packsParams.pageCount,
        cardPacksTotalCount: state.packsList.cardPacksTotalCount,
        id: state.packsList.user_id,
        packName: state.packsList.packsParams.packName,
        sortPacks: state.packsList.packsParams.sortPacks,
        successProfile: state.profile.success
    }

}

export const useProfileSelector=():ProfileSelector=> {
    return useSelector<AppStateType, ProfileSelector>(profileSelector)
}
