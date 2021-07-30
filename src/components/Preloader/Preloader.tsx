import React from "react";
import loadingProgress from '../../assets/loadings/loadingBtn.svg'
import spinner from '../../assets/loadings/Spinner.gif'
import st from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <div className={st.preloaderContainer}>
            <img alt={"preloader"} src={loadingProgress} />
        </div>
    )
}

export const PreloaderForApp = () => {
    return (
        <div className={st.preloaderForApp}>
            <img alt={"preloader"} src={spinner} />
        </div>
    )
}