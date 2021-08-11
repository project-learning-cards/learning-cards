import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";


type SearchPropsType = {
    setSearch: (value: string) => void
}

const Search: React.FC<SearchPropsType> = (props) => {

    const search = useSelector<AppStateType, string>(state => state.search.search)
    const [searchValue, setSearchValue] = useState(search);

    useEffect(() => {
        const timeoutId = setTimeout(() => props.setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    }, [props.setSearch, searchValue])


    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        setSearchValue(value);
    }

    return (
        <div>
          {/*  <Search value={searchValue}
                    onChange={onSearchChange}
                    placeholder="input search text"
                    enterButton="Search" size="large"
                    loading={loadingRequest} />*/}
        </div>
    )
}

export default Search;