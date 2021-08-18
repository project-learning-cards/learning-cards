import React, {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from "../../App/redux-store";
import {Button, Input, Modal} from 'antd';
import {InputContainer} from "../../components/InputContainer/InputContainer";


type SearchAddItemPropsType = {
    setSearch: (value: string) => void
    user_id: string | null
    id?: string
}

export const SearchAddItem: React.FC<SearchAddItemPropsType>= ({setSearch, user_id, id}) => {
    const {Search} = Input
    const search = useSelector<AppStateType, string>(state => state.search.search)
    const [searchValue, setSearchValue] = useState(search)
    const [showModalAddPack, setShowModalAddPack] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>('')
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
        setShowModalAddPack(false)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Search placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onChange={onSearchChange}
                    value={searchValue}
            style={{width: '90%'}}/>
            {(user_id === id) && <Button size={"large"} onClick={()=> setShowModalAddPack(true)}>ADD</Button>}



            {showModalAddPack &&
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
            }
        </div>
    )
}
