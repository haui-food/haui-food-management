import React, { useEffect, useState } from 'react';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';

import logo from '~/assets/images/logo-round.png';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Account = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    const _user = localStorage.getItem('user');
    if (_user) {
      setUser(JSON.parse(_user));
      return;
    }
    toast.error('Bạn cần đăng nhập để xem trang này');
  }, []);

  const handleGenderChange = (gend) => {
    setGender(gend);
    console.log(gend);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (user) {
      const formatDate = () => {
        const isoDateString = user.dateOfBirth;
        const date = new Date(isoDateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

      setDateOfBirth(formatDate);
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className={cx('account-wrapper')}>
          <div className={cx('account-picture')}>
            <div className={cx('account-picture-title')}>
              <h4>{t('account.title01')}</h4>
            </div>
            <div className={cx('account-picture-content')}>
              <div className={cx('account-picture-img')}>
                <img src={user.avatar} alt="logo" className={cx('account-image')} />
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
              <input type="text" className={cx('input-detail-username')} defaultValue={user.fullname} />
            </div>

            {/* <div class={cx('button-group-wrapper')}>
              <div class={cx('button-group')}>
                <label>{t('account.lb02')}</label>
                <input type="text" className={cx('input-detail-firstname')} />
              </div>
              <div class={cx('button-group', 'button-group-left')}>
                <label>{t('account.lb03')}</label>
                <input type="text" className={cx('input-detail-lastname')} />
              </div>
            </div> */}

            <div class={cx('button-group')}>
              <label>{t('account.lb02')}</label>
              <div className={cx('button-group-gender')}>
                <div
                  name="male"
                  className={cx('gender-selected', 'gender-selected-left', {
                    'gender-selected--male': user.gender === 'male',
                  })}
                  onClick={(e) => {
                    handleGenderChange('male');
                  }}
                >
                  {t('account.lb03')}
                </div>
                <div
                  name="female"
                  className={cx('gender-selected', 'gender-selected-right', {
                    'gender-selected--female': user.gender === 'female',
                  })}
                  onClick={(e) => {
                    handleGenderChange('female');
                  }}
                >
                  {t('account.lb04')}
                </div>
              </div>
            </div>

            {/* <div class={cx('button-group')}>
              <label>{t('account.lb05')}</label>
              <input type="text" className={cx('input-detail-address')} defaultValue={user.address} />
            </div> */}
            {/* 
            <div class={cx('button-group')}>
              <label>{t('account.lb05')}</label>
              <input type="text" className={cx('input-detail-email')} />
            </div> */}

            <div class={cx('button-group-wrapper')}>
              <div class={cx('button-group')}>
                <label>{t('account.lb06')}</label>
                <input type="text" className={cx('input-detail-phone')} value={user.email} />
              </div>
              <div class={cx('button-group', 'button-group-left')}>
                <label>{t('account.lb08')}</label>
                <input
                  type="date"
                  className={cx('input-detail-birthday')}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>

            <button className={cx('btn-save')}>{t('account.btn02')}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
