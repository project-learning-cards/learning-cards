import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";
import {Button, Input, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {useTranslation} from "react-i18next";
import {addPack} from "../PacksList/packsList-reducer";
import {setSearchValueAC} from "./search-reducer";


type SearchPropsType = {
    user_id: string | undefined
}

export const SearchName: React.FC<SearchPropsType> = ({user_id}) => {
    const {Search} = Input
    const search = useSelector<AppStateType, string>(state => state.search.search)
    const [searchValue, setSearchValue] = useState<string>(search)
    const [showModalAddPack, setShowModalAddPack] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>('')
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const setSearch = (searchValue: string) => {
        dispatch(setSearchValueAC(searchValue))
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    }, [setSearch, newName, setSearchValue])


    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const handleCancel = () => {
        setShowModalAddPack(false)
    }

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const saveNewPackHandler = () => {
        dispatch(addPack({cardsPack: {name: newName}}, user_id))
        setNewName('')
        setShowModalAddPack(false)
    }
    return (
        <div style={{textAlign: 'center', margin: '10px auto' }}>
            <Search placeholder={t('search_text')}
                    enterButton={t('search')}
                    size="large"
                    onChange={onSearchChange}
                    value={searchValue}
                    style={{width: '90%'}}/>
            {(user_id) && <Button size={"large"} onClick={() => setShowModalAddPack(true)}>{t('add')}</Button>}
            {showModalAddPack &&
            <Modal width={600} title={t('pack_info')} visible={showModalAddPack} onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           {t('return')}
                       </Button>,
                       <Button key="submit" type="primary" onClick={saveNewPackHandler}>
                           {t('save')}
                       </Button>
                   ]}>
                <div style={{height: '150px'}}>
                    <InputContainer
                        title={t('name_pack')}
                        placeholder={t('new_pack_name')}
                        changeValue={changePackNameHandler}
                        errorMessage={""}
                        typeInput={"text"}
                        value={newName}
                    />
                </div>
            </Modal>
            }
        </div>
    )
}

export default SearchName;