import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './ViewContact.module.scss';

import { EmailIcon, PhoneIcon, UserIcon } from '../Icons';

const cx = classNames.bind(styles);

function ViewContact({ contactCredentials }) {
  const { t } = useTranslation();

  return (
    <form action="" className={cx('form')} autoComplete="off">
      <div className={cx('form__row')}>
        <div className={cx('form__group')}>
          <label htmlFor="phone" className={cx('form__label', 'form__label--medium')}>
            {t('users.title04')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              readOnly
              value={contactCredentials.fullname ? contactCredentials.fullname : t('form.lb04')}
              type="text"
              id="fullname"
              name="fullname"
              placeholder={t('users.title04')}
              className={cx('form__input')}
            />
            <UserIcon className={cx('icon')} />
          </div>
        </div>

        <div className={cx('form__group')}>
          <label htmlFor="email" className={cx('form__label', 'form__label--medium')}>
            {t('users.title05')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              readOnly
              value={contactCredentials.email}
              type="email"
              id="email"
              name="email"
              placeholder={t('users.title05')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('icon')} />
          </div>
        </div>
      </div>

      <div className={cx('form__row')}>
        <div className={cx('form__group')}>
          <label htmlFor="phone" className={cx('form__label', 'form__label--medium')}>
            {t('users.title06')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              readOnly
              value={contactCredentials.phone ? contactCredentials.phone : t('form.lb04')}
              type="phone"
              id="phone"
              name="phone"
              placeholder={t('users.title06')}
              className={cx('form__input')}
            />
            <PhoneIcon className={cx('icon')} />
          </div>
        </div>

        <div className={cx('form__group')}>
          <label htmlFor="message" className={cx('form__label', 'form__label--medium')}>
            {t('contact.title01')}
          </label>
          <div className={cx('form__text-area', 'form__text-area--sm')}>
            <textarea
              readOnly
              value={contactCredentials.message}
              id="message"
              name="message"
              placeholder={t('contact.title01')}
              className={cx('form__text-area-input')}
            />
          </div>
        </div>
      </div>

      <div className={cx('form__row')}></div>
    </form>
  );
}

export default ViewContact;
