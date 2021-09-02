import s from './PacksList.module.scss';
import style from '../Profile/ProfilePackList.module.scss';
import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { GetPacksAPIParamsType } from '../../api/api';
import { AuthUser } from '../Login/login-reducer';
import { deletePack, updatePackListTC } from './packsList-reducer';
import SearchName from '../search/SearchName';
import { TableContainer } from '../table/TableContainer';
import { Button, Pagination, Typography } from 'antd';
import { SuperDoubleRangeContainer } from '../search/SuperDoubleRangeContainer';
import { useTranslation } from 'react-i18next';
import { usePackListSelector } from './usePackListSelector';
import { useWindowSize } from '../../components/useWindowSize/useWindowSize';

export const PacksList = () => {
  const { width } = useWindowSize();
  const [editMode, setEditMode] = useState(true);
  const { Title } = Typography;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    idUser,
    successPackList,
    loadingRequest,
    cardPacksTotalCount,
    packsList,
    page,
    pageCount,
    min,
    max,
    id,
    sortPacks,
    searchName,
  } = usePackListSelector();

  useEffect(() => {
    if (!idUser) {
      if (!loadingRequest) {
        dispatch(AuthUser());
      }
    } else {
      handleChangeParams({ user_id: id });
    }
  }, [dispatch, id, min, max, searchName, pageCount, idUser, loadingRequest]);

  const titles = useMemo(() => [t('name_2'), t('cards_count'), t('last_update'), t('created'), t('actions')], []);

  const deletePackFun = (pack_id: string) => {
    dispatch(deletePack({ id: pack_id }, idUser));
  };

  const handleChangeParams = (params: GetPacksAPIParamsType) => {
    dispatch(
      updatePackListTC({
        packName: searchName || '',
        sortPacks: sortPacks || '',
        page,
        pageCount,
        min,
        user_id: id,
        max,
        ...params,
      })
    );
  };

  const onClickHandler = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.navBurger} onClick={onClickHandler}>
        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="20" />
          <rect y="30" width="100" height="20" />
          <rect y="60" width="100" height="20" />
        </svg>
      </div>
      <div className={width! > 768 ? s.sidebar : editMode ? style.mobilePage : s.sidebar}>
        <div className={s.sidebarsBtns}>
          <Title level={4}>{t('show_packs')}</Title>
          <div style={{ marginBottom: '5px' }}>
            <Button type={id ? 'primary' : 'dashed'} onClick={() => handleChangeParams({ user_id: idUser })}>
              {t('my')}
            </Button>
            <Button type={id ? 'dashed' : 'primary'} onClick={() => handleChangeParams({ user_id: undefined, min: 0 })}>
              {t('all')}
            </Button>
          </div>
        </div>
        <div className={s.doubleRange}>
          <div>
            <Title level={4}>{t('number_cards')}</Title>
          </div>
          <SuperDoubleRangeContainer />
        </div>
        <div className={style.promotion}>{t('your_ad_could_be_here')}</div>
      </div>
      <div className={width! > 768 ? style.content : !editMode ? s.mobilePage : style.content}>
        <div className={style.header}>
          <Title className={style.title} level={2}>
            {t('packs_list')}
          </Title>
          <SearchName user_id={id || ''} />
        </div>
        <div className={style.main}>
          <TableContainer
            packs={packsList}
            deletePackFun={deletePackFun}
            user_id={id || ''}
            success={successPackList}
            type={'pack'}
            titles={titles}
          />
        </div>
        <div className={s.footer}>
          <Pagination
            style={{ textAlign: 'center', marginBottom: '10px' }}
            defaultCurrent={page}
            total={cardPacksTotalCount}
            onChange={(page) => handleChangeParams({ page })}
            defaultPageSize={pageCount}
            pageSizeOptions={['15']}
          />
        </div>
      </div>
    </div>
  );
};
