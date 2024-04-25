import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.scss';
import { DashBoardIcon, UserGroupIcon, ProductIcon } from '~/components/Icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
  const { t } = useTranslation();

  const [navigation, setNavigation] = useState([
    {
      path: '/dashboards',
      icon: <DashBoardIcon className={cx('icon')} />,
      title: 'dashboards',
    },
    {
      path: '/users',
      icon: <UserGroupIcon className={cx('icon')} />,
      title: 'users',
    },
    {
      path: '/products',
      icon: <ProductIcon className={cx('icon')} />,
      title: 'products',
    },
  ]);
  const [currentPage, setCurrentPage] = useState('');

  const location = useLocation();

  useEffect(() => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastElement = urlParts[urlParts.length - 1];
    setCurrentPage(lastElement);
  }, [window.location]);

  return (
    <div className={cx('nav-wrapper')}>
      <div className={cx('core')}>
        <h1>Core</h1>
        {navigation.map((item, index) => (
          <div className={cx('nav-item', { 'current-page': item.title === currentPage })} key={index}>
            <div className={cx('nav-icon')}>{item.icon}</div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
