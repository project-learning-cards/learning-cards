import {AppStateType} from "../../App/redux-store";
import {useSelector} from "react-redux";
import {CardsPackType} from "../../api/api";

interface PackListSelector {
    isAuth: boolean,
    idUser: string,
    success: boolean,
    loadingRequest: boolean,
    cardPacksTotalCount: number,
    packsList: Array<CardsPackType>,
    page: number,
    pageCount: number,
    minFilter: number,
    maxFilter: number,
    id: string | undefined,
    packName: string | undefined,
    sortPacks: string | undefined,
}

const packListSelector = (state: AppStateType) => {
    return {
        isAuth: state.login.logIn,
        idUser: state.profile.profile._id,
        success: state.packsList.success,
        loadingRequest: state.login.loadingRequest,
        cardPacksTotalCount: state.packsList.cardPacksTotalCount,
        packsList: state.packsList.cardPacks,
        page: state.packsList.page,
        pageCount: state.packsList.pageCount,
        minFilter: state.search.min,
        maxFilter: state.search.max,
        id: state.packsList.user_id,
        packName: state.packsList.packName,
        sortPacks: state.packsList.sortPacks,
    }

}

export const usePackListSelector=():PackListSelector=> {
    return useSelector<AppStateType, PackListSelector>(packListSelector)
}
