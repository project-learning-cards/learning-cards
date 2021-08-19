import React from "react";
import style from './Preloader.module.scss'
import {Space, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export const Preloader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    return (
        <div className={style.preloaderContainer}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export const PreloaderForApp = () => {
    return (
        <div className={style.preloaderForApp}>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    )
}

