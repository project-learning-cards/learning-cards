
import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, useState, useEffect} from "react";
import s from "./SuperRadio.module.css"

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const [localValue, setLocalValue] = useState(value ?? '')

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.value) return;
        onChange && onChange(e)
        setLocalValue(e.target.value)
        onChangeOption && onChangeOption(e.target.value)
    }

    useEffect(() => {
        value && setLocalValue(value)
    }, [value])

    return (
        <>
            {options ? options.map((o: string, i) => (
                <label key={name + '-' + i} className={s.default}>
                    <input
                        type={'radio'}
                        onChange={onChangeCallback}
                        name={(i + 1).toString()}
                        value={o}
                        checked={localValue === o}
                        // name, checked, value, onChange
                    />
                    {o}
                </label>
            )): null}
        </>
    )
}

export default SuperRadio;