import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthUser, logOutUser } from '../Login/login-reducer';
import s from './Profile.module.scss';
import style from './ProfilePackList.module.scss';
import { PersonalInformation } from './ProfileInfo/PersonalInformation';
import { Avatar, Button, Pagination, Typography } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { SuperDoubleRangeContainer } from '../search/SuperDoubleRangeContainer';
import { setPageNumberAC, updatePackListTC } from '../PacksList/packsList-reducer';
import SearchName from '../search/SearchName';
import { TableContainer } from '../table/TableContainer';
import { useTranslation } from 'react-i18next';
import { useProfileSelector } from './useProfileSelector';
import { PATH } from '../../components/routes/Pages';
import { PreloaderForApp } from '../../components/Preloader/Preloader';
import { usePackListSelector } from '../PacksList/usePackListSelector';
import { useWindowSize } from '../../components/useWindowSize/useWindowSize';

export const Profile = () => {
  const { width } = useWindowSize();
  const [editMode, setEditMode] = useState(true);
  const { Title } = Typography;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editModeProfile, setEditModeProfile] = useState<boolean>(false);

  const {
    packsList,
    idUser,
    loadingRequest,
    profile,
    min,
    max,
    page,
    pageCount,
    cardPacksTotalCount,
    id,
    sortPacks,
    searchName,
    successProfile,
  } = useProfileSelector();
  const { successPackList } = usePackListSelector();

  const onPageChangedHandler = useCallback(
    (currentPage: number): void => {
      dispatch(setPageNumberAC(currentPage));
    },
    [dispatch]
  );

  const closeModelWindow = () => setEditModeProfile(false);
  const logOut = () => {
    dispatch(logOutUser());
  };

  const titles = [t('name_2'), t('cards_count'), t('last_update'), t('created'), t('actions')];

  useEffect(() => {
    dispatch(
      updatePackListTC({
        packName: searchName || '',
        page,
        pageCount,
        max,
        sortPacks: sortPacks || '',
        min: min > 0 ? min : 1,
      })
    );
  }, [dispatch, page, min, max, searchName, idUser, pageCount]);

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
      <div className={width! > 768 ? s.profileInfoBlock : editMode ? style.mobilePage : s.profileInfoBlock}>
        <div className={s.profileInfo}>
          <div className={s.profilePhoto}>
            <Avatar size={100} src={successProfile ? <PreloaderForApp /> : profile.avatar} icon={<UserOutlined />} />
          </div>
          <div style={{ float: 'left', marginBottom: '10px' }}>
            <div>
              <b>{t('name')}:</b> {profile.name && profile.name}
            </div>
            <div>
              <b>{t('email')}:</b> {profile.email && profile.email}
            </div>
            <div>
              <b>{t('public_count')}:</b> {profile.publicCardPacksCount && profile.publicCardPacksCount}
            </div>
          </div>
          <div>
            <Button type="primary" size="small" onClick={() => setEditModeProfile(true)}>
              {t('edit_profile')}
            </Button>
            <Button
              type="primary"
              size="small"
              danger
              onClick={logOut}
              icon={<PoweroffOutlined />}
              loading={loadingRequest}
            >
              {t('logout')}
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
      <div className={width! > 768 ? style.content : !editMode ? s.mobileProfilePage : style.content}>
        <div className={style.header}>
          <Title className={style.title} level={2}>
            {t('packs_list_with_name', { name: profile.name })}
          </Title>
          <SearchName user_id={id} />
        </div>
        <div className={style.main}>
          <TableContainer
            packs={packsList}
            user_id={id || ''}
            success={successPackList}
            type={'pack'}
            titles={titles}
          />
        </div>
        <Pagination
          style={{ textAlign: 'center', marginBottom: '10px' }}
          defaultCurrent={page}
          total={cardPacksTotalCount}
          onChange={onPageChangedHandler}
          defaultPageSize={pageCount}
          pageSizeOptions={['10']}
        />
      </div>
      {editModeProfile && (
        <PersonalInformation onClick={closeModelWindow} name={profile.name} avatar={profile.avatar} />
      )}
    </div>
  );
};
