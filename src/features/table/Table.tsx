import React from "react";
import s from './TableContainer.module.scss'

type TablePropsType = {
    items: (string | number | JSX.Element)[][]
    titles: Array<string>
}

export const Table = (props: TablePropsType) => {

    return (<>
            <table className={s.tableContainer}>
                <thead className={s.tableHeader}>
                <tr>
                    {props.titles.map((t, i) => {
                        return <td key={i}>{t}</td>
                    })}
                </tr>
                </thead>
                <tbody className={s.tableBody}>
                {props.items && props.items.map((item, i) => {
                    return <tr key={i} className={s.row}>
                        {item.map((s, i) => {
                            return <td key={i}>{s}</td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>

        </>
    )
}