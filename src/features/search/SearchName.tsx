import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";
import {Input} from 'antd';


type SearchPropsType = {
    setSearch: (value: string) => void
}

export const SearchName: React.FC<SearchPropsType>= ({setSearch}) => {
    const {Search} = Input;
    const search = useSelector<AppStateType, string>(state => state.search.search)
    const [searchValue, setSearchValue] = useState(search);

    useEffect(() => {
        const timeoutId = setTimeout(() => setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    }, [setSearch, searchValue])


    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        setSearchValue(value);
    }

    return (
        <div>         
            <Search placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onChange={onSearchChange}
                    value={searchValue}/>
        </div>
    )
}

export default SearchName;