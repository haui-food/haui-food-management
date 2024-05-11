import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import Cookies from 'js-cookie';

import { BellIcon, MenuIcon, SettingIcon, LogOutIcon } from '~/components/Icons';
import logo from '~/assets/images/logo-round.png';
import HauiLogo from '~/assets/images/logo-vip2.png';
import viFlag from '~/assets/images/languages/vi.png';
import enFlag from '~/assets/images/languages/en.png';
import zhFlag from '~/assets/images/languages/zh.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header({ toggleNav }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const langRef = useRef(null);
  const adminRef = useRef(null);
  const [langData, setLangData] = useState([
    { value: 'vi', flag: viFlag, title: 'Tiếng Việt' },
    { value: 'en', flag: enFlag, title: 'English' },
    { value: 'zh', flag: zhFlag, title: '中文' },
  ]);
  const [selectedLang, setSelectedLang] = useState(null);
  const [isOpenLangMenu, setIsOpenLangMenu] = useState(false);
  const [isOpenAdminMenu, setIsOpenAdminMenu] = useState(false);
  const [admin, setAdmin] = useState(null);

  const toggleLangMenu = () => {
    setIsOpenLangMenu(!isOpenLangMenu);
  };

  const handleSelectedLang = (lang) => {
    setSelectedLang(lang.flag);
    Cookies.set('lang', lang.value);
  };

  useEffect(() => {
    const storedLang = Cookies.get('lang');
    if (storedLang) {
      const currentLang = langData.find((lang) => lang.value === storedLang);
      setSelectedLang(currentLang.flag);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e?.target)) {
        setIsOpenLangMenu(false);
      }

      if (adminRef.current && !adminRef.current.contains(e?.target)) {
        setIsOpenAdminMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const _admin = JSON.parse(localStorage.getItem('user'));
    if (_admin) {
      setAdmin(_admin);
    }

    console.log(admin);
  }, []);

  const handleOpenAdminMenu = () => {
    setIsOpenAdminMenu(!isOpenAdminMenu);
  };

  const toggleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      // toast.success('Đăng xuất thành công');
      localStorage.setItem('showToast', 'true');
      window.location.href = '/';
    } catch (error) {
      toast.error(error.message);
    }

    // toast.success('Đăng xuất thành công');
  };

  return (
    <div className={cx('header-wrapper')}>
      {/* <div className={cx('toast-container')}>
        <ToastContainer />
      </div> */}
      <div className={cx('button-menu')}>
        <div className={cx('icon-wrap')} onClick={toggleNav}>
          <MenuIcon className={cx('menu-icon')} />
        </div>
        <div className={cx('menu-logo')}>
          <img src={HauiLogo} alt="logo" className={cx('haui-logo')} />
        </div>
      </div>
      <div className="button-active">
        <div className={cx('button-group')}>
          <div className={cx('flag-wrapper')} ref={langRef} onClick={toggleLangMenu}>
            <div className={cx('btn-flag', { 'lang-menu-open': isOpenLangMenu })}>
              <img src={selectedLang} alt="flag" className={cx('lang-img')} />
            </div>
            <div className={cx('lang-menu', { 'lang-menu-active': isOpenLangMenu })}>
              {langData.map((lang, index) => (
                <div
                  key={index}
                  className={cx('lang-item', { 'current-lang': lang.flag === selectedLang })}
                  onClick={() => {
                    handleSelectedLang(lang);
                    window.location.reload();
                  }}
                >
                  <span>{lang.title}</span>
                  <img src={lang.flag} alt="flag" className={cx('lang-img')} />
                </div>
              ))}
            </div>
          </div>
          <div className={cx('btn-notification')}>
            <BellIcon className={cx('bell-icon')} />
          </div>
          <div className={cx('admin-menu-wrapper')} ref={adminRef} onClick={handleOpenAdminMenu}>
            <div className={cx('btn-user')}>
              <img src={admin?.avatar} alt="ảnh" style={{}} />
            </div>

            {isOpenAdminMenu && (
              <div className={cx('admin-menu')}>
                <div className={cx('admin-infor')}>
                  <div className={cx('image-wrapper')}>
                    <img src={admin?.avatar} alt="ảnh" />
                  </div>
                  <div className={cx('admin-detail')}>
                    <h5>{admin.fullname}</h5>
                    <span>{admin.email}</span>
                  </div>
                </div>

                <div className={cx('admin-button-group')}>
                  <div
                    className={cx('account')}
                    onClick={() => {
                      navigate('/account');
                    }}
                  >
                    <SettingIcon className={cx('setting-icon')} />
                    <span>Account</span>
                  </div>
                  <div className={cx('logout')} onClick={toggleLogout}>
                    <LogOutIcon className={cx('logout-icon')} />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
