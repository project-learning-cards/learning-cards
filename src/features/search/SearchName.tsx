import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";
import {Button, Input} from 'antd';


type SearchPropsType = {
    setSearch: (value: string) => void
    setShowModalAdd: (showModalAdd: boolean) => void
    user_id: string | null
}

export const SearchName: React.FC<SearchPropsType>= ({setSearch, setShowModalAdd, user_id}) => {
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
        <div style={{textAlign: 'center'}}>
            <Search placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onChange={onSearchChange}
                    value={searchValue}
            style={{width: '90%'}}/>
            {(user_id) && <Button size={"large"} onClick={() => setShowModalAdd(true)}>ADD</Button>}
        </div>
    )
}

export default SearchName;