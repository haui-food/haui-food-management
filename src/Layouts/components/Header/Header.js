import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

import { BellIcon, MenuIcon } from '~/components/Icons';
import logo from '~/assets/images/logo-round.png';
import HauiLogo from '~/assets/images/logo-vip2.png';
import viFlag from '~/assets/images/languages/vi.png';
import enFlag from '~/assets/images/languages/en.png';
import zhFlag from '~/assets/images/languages/zh.png';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Header({ toggleNav }) {
  const { t } = useTranslation();

  const langRef = useRef(null);

  const [langData, setLangData] = useState([
    { value: 'vi', flag: viFlag },
    { value: 'en', flag: enFlag },
    { value: 'zh', flag: zhFlag },
  ]);

  const [selectedLang, setSelectedLang] = useState(langData[0].flag);
  const [isOpenLangMenu, setIsOpenLangMenu] = useState(false);

  const toggleLangMenu = () => {
    setIsOpenLangMenu(!isOpenLangMenu);
  };

  const handleSelectedLang = (lang) => {
    setSelectedLang(lang.flag);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e?.target)) {
        setIsOpenLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cx('header-wrapper')}>
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
                  onClick={() => handleSelectedLang(lang)}
                >
                  <img src={lang.flag} alt="flag" className={cx('lang-img')} />
                  <span>{lang.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cx('btn-notification')}>
            <BellIcon className={cx('bell-icon')} />
          </div>
          <div className={cx('btn-user')}>
            <img src={logo} alt="ảnh" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
