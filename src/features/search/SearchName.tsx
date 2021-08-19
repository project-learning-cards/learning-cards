import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";
import {Button, Input, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";
import {addPack} from "../PacksList/packsList-reducer";
import { useTranslation } from "react-i18next";


type SearchPropsType = {
    setSearch: (value: string) => void
    user_id: string | null
}

export const SearchName: React.FC<SearchPropsType>= ({setSearch, user_id}) => {
    const {Search} = Input
    const search = useSelector<AppStateType, string>(state => state.search.search)
    const [searchValue, setSearchValue] = useState(search)
    const [showModalAddPack, setShowModalAddPack] = useState<boolean>(false)
    /*const [showModalAddCard, setShowModalAddCard] = useState<boolean>(true);*/
    const [newName, setNewName] = useState<string>('')
    const dispatch = useDispatch()
    const {t} = useTranslation()


    useEffect(() => {
        const timeoutId = setTimeout(() => setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    }, [setSearch, searchValue])


    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        setSearchValue(value)
    }

    const handleCancel = () => {
        setShowModalAddPack(false)
    }

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const saveNewPackHandler = () => {
        dispatch(addPack({cardsPack: {name: newName}}))
        setShowModalAddPack(false)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Search placeholder={t('search_text')}
                    enterButton={t('search')}
                    size="large"
                    onChange={onSearchChange}
                    value={searchValue}
            style={{width: '90%'}}/>
            {(user_id) && <Button size={"large"} onClick={()=> setShowModalAddPack(true)}>{t('add')}</Button>}



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

         {/*   {showModalAddPack && (user_id === id) &&
            <Modal width={600} title={'Pack info'} visible={showModalAddPack} onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Return
                       </Button>,
                       <Button key="submit" type="primary" onClick={saveNewPackHandler}>
                           Save
                       </Button>
                   ]}>
                <div style={{height: '150px'}}>
                    <InputContainer
                        title={"Name pack"}
                        placeholder={"enter name new pack"}
                        changeValue={changePackNameHandler}
                        errorMessage={""}
                        typeInput={"text"}
                        value={newName}
                    />
                </div>
            </Modal>
            }*/}



        </div>


    )
}

export default SearchName;