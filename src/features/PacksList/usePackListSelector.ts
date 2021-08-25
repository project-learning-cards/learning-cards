import {AppStateType} from "../../App/redux-store";
import {useSelector} from "react-redux";
import {CardsPackType} from "../../api/api";

interface PackListSelector {
    isAuth: boolean,
    idUser: string,
    successPackList: boolean,
    loadingRequest: boolean,
    cardPacksTotalCount: number,
    packsList: Array<CardsPackType>,
    page: number,
    pageCount: number,
    min: number,
    max: number,
    id: string | undefined,
    packName: string | undefined,
    sortPacks: string | undefined,
    searchName: string | undefined
}

const packListSelector = (state: AppStateType) => {
    return {
        isAuth: state.login.logIn,
        idUser: state.profile.profile._id,
        successPackList: state.packsList.success,
        loadingRequest: state.login.loadingRequest,
        cardPacksTotalCount: state.packsList.cardPacksTotalCount,
        packsList: state.packsList.cardPacks,
        page: state.packsList.packsParams.page,
        pageCount: state.packsList.packsParams.pageCount,
        min: state.search.min,
        max: state.search.max,
        id: state.packsList.user_id,
        packName: state.packsList.packsParams.packName,
        sortPacks: state.packsList.packsParams.sortPacks,
        searchName: state.search.search
    }

}

export const usePackListSelector=():PackListSelector=> {
    return useSelector<AppStateType, PackListSelector>(packListSelector)
}
