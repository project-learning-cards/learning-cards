import {Slider} from "antd";
import React from "react";

type SuperDoubleRangePropsType={
    onChange: (value:[number, number] )=> void
    defaultValue: [number, number]
}

export const SuperDoubleRange=(props: SuperDoubleRangePropsType) => {

    return(
        <div>
            <Slider
                range
                step={1}
                onChange={props.onChange}
                value={props.defaultValue}
            />
        </div>
    )
}
