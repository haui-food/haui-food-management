import React from 'react';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';

import logo from '~/assets/images/logo-round.png';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Account = () => {
  const { t } = useTranslation();
  return (
    <div className={cx('account-wrapper')}>
      <div className={cx('account-picture')}>
        <div className={cx('account-picture-title')}>
          <h4>{t('account.title01')}</h4>
        </div>
        <div className={cx('account-picture-content')}>
          <div className={cx('account-picture-img')}>
            <img src={logo} alt="logo" className={cx('account-image')} />
          </div>
          <span className={cx('picture-text')}>{t('account.desc01')}</span>
          <button className={cx('btn-upload')}>
            <label className={cx('label-upload')}>
              {t('account.btn01')}
              <input type="file" className={cx('input-upload')} />
            </label>
          </button>
        </div>
      </div>

      <div className={cx('account-detail')}>
        <h4>{t('account.title02')}</h4>
        <div class={cx('button-group')}>
          <label>{t('account.lb01')}</label>
          <input type="text" className={cx('input-detail-username')} />
        </div>

        <div class={cx('button-group-wrapper')}>
          <div class={cx('button-group')}>
            <label>{t('account.lb02')}</label>
            <input type="text" className={cx('input-detail-firstname')} />
          </div>
          <div class={cx('button-group', 'button-group-left')}>
            <label>{t('account.lb03')}</label>
            <input type="text" className={cx('input-detail-lastname')} />
          </div>
        </div>

        <div class={cx('button-group')}>
          <label>{t('account.lb04')}</label>
          <input type="text" className={cx('input-detail-address')} />
        </div>

        <div class={cx('button-group')}>
          <label>{t('account.lb05')}</label>
          <input type="text" className={cx('input-detail-email')} />
        </div>

        <div class={cx('button-group-wrapper')}>
          <div class={cx('button-group')}>
            <label>{t('account.lb06')}</label>
            <input type="text" className={cx('input-detail-phone')} />
          </div>
          <div class={cx('button-group', 'button-group-left')}>
            <label>{t('account.lb07')}</label>
            <input type="date" className={cx('input-detail-birthday')} />
          </div>
        </div>

        <button className={cx('btn-save')}>{t('account.btn02')}</button>
      </div>
    </div>
  );
};

export default Account;
