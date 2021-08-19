import s from "./HeaderEnterApp.module.scss";
import React from "react";

type HeaderEnterAppType = {
    title?: string
}
export const HeaderEnterApp = ({ title }: HeaderEnterAppType) => {
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>MAP</div>
            <h1>{title}</h1>
        </div>
    )
}