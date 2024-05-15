import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.scss';
import { DashBoardIcon, UserGroupIcon, ProductIcon, ShopIcon } from '~/components/Icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar({ toggleNav, isDesktop }) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  const [navigation, setNavigation] = useState([
    {
      path: '/dashboards',
      icon: <DashBoardIcon className={cx('icon')} />,
      title: t('dashboards.title02'),
      slug: 'dashboards',
    },
    {
      path: '/users',
      icon: <UserGroupIcon className={cx('icon')} />,
      title: t('dashboards.title03'),
      slug: 'users',
    },
    {
      path: '/shop',
      icon: <ShopIcon className={cx('icon')} />,
      title: 'Shop',
      slug: 'shop',
    },
    {
      path: '/products',
      icon: <ProductIcon className={cx('icon')} />,
      title: t('dashboards.title04'),
      slug: 'products',
    },
  ]);
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastElement = urlParts[urlParts.length - 1];
    setCurrentPage(lastElement);
  }, [window.location.pathname]);

  return (
    <div className={cx('nav-wrapper')}>
      <div className={cx('core')}>
        <h1>{t('dashboards.title01')}</h1>
        {navigation.map((item, index) => (
          <div
            className={cx('nav-item', { 'current-page': item.slug === currentPage })}
            key={index}
            onClick={() => {
              setCurrentPage(item.slug);
              if (!isDesktop) toggleNav();
              nav(item.path);
            }}
          >
            <div className={cx('nav-icon')}>{item.icon}</div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
