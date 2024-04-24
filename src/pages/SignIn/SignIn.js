import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Oval } from '@agney/react-loading';

import styles from './SignIn.module.scss';
import { EmailIcon, PasswordIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignIn() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState('password');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const checkSubmit = useCallback(() => {
    setSubmit(!emailRegex.test(email) || !passwordRegex.test(password) || email === '' || password === '');
  }, [emailRegex, passwordRegex, email, password]);

  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: t('errors.err02') });
    }
    if (email === '') {
      setErrors({ ...errors, email: t('errors.err01') });
    }
    if (emailRegex.test(email)) {
      setErrors({ ...errors, email: '' });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, checkSubmit, emailRegex, errors]);

  const handleChangePassword = useCallback(() => {
    if (!passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password: t('errors.err04'),
      });
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
    if (password === '') {
      setErrors({ ...errors, password: t('errors.err03') });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, password, errors, checkSubmit]);

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
    checkSubmit();
  };

  const handleSubmit = (e) => {};

  useEffect(() => {
    if (passwordRegex.test(password) && emailRegex.test(email)) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
  }, [password, passwordRegex, email, emailRegex, errors]);

  return (
    <div className={cx('login')}>
      <h1 className={cx('login__heading', 'shine')}>{t('login.heading')}</h1>
      <p className={cx('login__desc')}>{t('login.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e);
              }}
              onBlur={handleChangeEmail}
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon', errors.email && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.email}</p>
        </div>

        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.password !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange(e);
              }}
              onBlur={handleChangePassword}
              type={showPassword}
              name="password"
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.password && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.password}</p>
        </div>

        <div className={cx('form__group', 'form__group--inline')}>
          <label onChange={handleShowPassword} className={cx('form__checkbox')}>
            <input type="checkbox" name="" className={cx('form__checkbox-input')} />
            <span className={cx('form__checkbox-label')}>{t('form.lb01')}</span>
          </label>
          <a
            rel="noreferrer"
            target="_blank"
            className={cx('login__link', 'form__pull-right')}
            href="https://hauifood.com/auth/forgot-password"
          >
            {t('login.desc02')}
          </a>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'login__btn-group')}>
          <Button
            primary
            auth
            disabled={submit}
            onClick={handleSubmit}
            // leftIcon={loading && <Oval width="20" color="#fff" />}
          >
            {t('button.btn01')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
