import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Switch } from '@mui/material';

import styles from './CreateUser.module.scss';

import { EmailIcon, PasswordIcon, PhoneIcon, UserIcon, CalendarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const theme = createTheme({
  typography: {
    color: 'var(--text-color)',
    fontSize: 23,
    fontFamily: 'var(--font-family)',
  },
  rowChecked: {
    backgroundColor: '#1976d2',
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: 'var(--primary-color)',

            '& + .MuiSwitch-track': {
              backgroundColor: 'rgba(140, 238, 184, 0.5)',
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'var(--text-color)',
          fontSize: 20,
          '&.Mui-checked': {
            color: 'var(--primary-color)',
          },
          '&.MuiCheckbox-indeterminate': {
            color: 'var(--primary-color)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: '0',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'var(--text-color)',
          fontSize: '1.6rem',
        },
      },
    },
  },
});

function CreateUser({ handleInputChange, userCredentials }) {
  const { t } = useTranslation();

  return (
    <form action="" className={cx('form')} autoComplete="off">
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="fullname" className={cx('form__label', 'form__label--medium')}>
            FullName
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={userCredentials?.fullname}
              onChange={handleInputChange}
              type="text"
              id="fullname"
              name="fullname"
              placeholder="FullName"
              className={cx('form__input')}
            />
            <UserIcon />
          </div>
        </div>
        <div className={cx('form__group')}>
          <label htmlFor="email" className={cx('form__label', 'form__label--medium')}>
            {t('form.tp01')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={userCredentials.email}
              onChange={handleInputChange}
              id="email"
              type="email"
              name="email"
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon')} />
          </div>
        </div>
      </div>

      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="password" className={cx('form__label', 'form__label--medium')}>
            {t('form.tp02')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={userCredentials.password}
              onChange={handleInputChange}
              type="text"
              id="password"
              name="password"
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon />
          </div>
        </div>

        <div className={cx('form__group')}>
          <label htmlFor="phone" className={cx('form__label', 'form__label--medium')}>
            Điện thoại
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={userCredentials.phone}
              onChange={handleInputChange}
              type="text"
              id="phone"
              name="phone"
              placeholder="Điện thoại"
              className={cx('form__input')}
            />
            <PhoneIcon />
          </div>
        </div>
      </div>

      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="password" className={cx('form__label', 'form__label--medium')}>
            Ngày sinh
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={userCredentials.dateOfBirth}
              onChange={handleInputChange}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '12xpx',
                width: '24px',
                height: '24px',
                backgroundColor: '#fff',
                pointerEvents: 'none',
              }}
            >
              <CalendarIcon className={cx('icon')} />
            </div>
          </div>
        </div>
      </div>

      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="gender" className={cx('form__label', 'form__label--medium')}>
            Giới tính
          </label>

          <ThemeProvider theme={theme}>
            <RadioGroup
              value={userCredentials.gender}
              onChange={handleInputChange}
              row
              aria-labelledby="gender"
              name="gender"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </ThemeProvider>
        </div>

        <div className={cx('form__group', 'form__active')}>
          <label
            htmlFor="isVerify"
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className={cx('form__label', 'form__label--medium')}
          >
            Is verify
            <ThemeProvider theme={theme}>
              <Switch name="isVerify" type="checkbox" checked={userCredentials.isVerify} onChange={handleInputChange} />
            </ThemeProvider>
          </label>
          <label
            htmlFor="isLocked"
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className={cx('form__label', 'form__label--medium')}
          >
            Is locked
            <ThemeProvider theme={theme}>
              <Switch name="isLocked" type="checkbox" checked={userCredentials.isLocked} onChange={handleInputChange} />
            </ThemeProvider>
          </label>
          <label
            htmlFor="is2FA"
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className={cx('form__label', 'form__label--medium')}
            name="is2FA"
          >
            Is 2FA
            <ThemeProvider theme={theme}>
              <Switch name="is2FA" type="checkbox" checked={userCredentials.is2FA} onChange={handleInputChange} />
            </ThemeProvider>
          </label>
        </div>

        <div className={cx('form__group')}>
          <FormControl fullWidth color="info">
            <InputLabel sx={{ fontSize: 16 }} id="role">
              Role
            </InputLabel>
            <Select
              sx={{ height: 50, fontSize: 16 }}
              labelId="role"
              id="role-select"
              label="Role"
              value={userCredentials.role}
              onChange={handleInputChange}
              name="role"
            >
              <MenuItem sx={{ fontSize: 16 }} value={''}>
                Select Role
              </MenuItem>
              <MenuItem sx={{ fontSize: 16 }} value={'user'}>
                User
              </MenuItem>
              <MenuItem sx={{ fontSize: 16 }} value={'shop'}>
                Shop
              </MenuItem>
              <MenuItem sx={{ fontSize: 16 }} value={'admin'}>
                Admin
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </form>
  );
}

export default CreateUser;
