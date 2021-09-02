import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { PATH } from '../routes/Pages';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
        <h2>{t('MAP')}</h2>
      </div>
      <NavLink activeClassName={s.chosenBtn} className={s.mainBtn} to={PATH.PROFILE}>
        {t('profile')}
      </NavLink>
      <NavLink activeClassName={s.chosenBtn} className={s.mainBtn} to={PATH.PACKS_LIST}>
        {t('packs_lists')}
      </NavLink>
    </div>
  );
};
