import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/redux-store";
import {setMinMaxValueAC} from "./search-reducer";
import {SuperDoubleRange} from "./SuperDoubleRange";


export const SuperDoubleRangeContainer = () => {

    const min = useSelector<AppStateType, number>(state => state.search.min);
    const max = useSelector<AppStateType, number>(state => state.search.max);

    const [minCard, setMinCard] = useState<number>(min)
    const [maxCard, setMaxCard] = useState<number>(max)

    const dispatch = useDispatch()

    const onChange = (values: Array<number> ) => {
        setMinCard(values[0])
        setMaxCard(values[1])
        dispatch(setMinMaxValueAC(values))
    }




    return (

        <>
            <SuperDoubleRange onChange={onChange} defaultValue={[minCard, maxCard]}
            />
        </>
    )
}