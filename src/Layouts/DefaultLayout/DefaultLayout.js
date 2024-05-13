import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';

import Header from '~/Layouts/components/Header';
import GoToTop from '~/Layouts/components/GoToTop';
import Navbar from '~/Layouts/components/Navbar';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [isOpenNav, setIsOpenNav] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const toggleNav = () => {
    if (isOpenNav === null) {
      setIsOpenNav(false);
      return;
    }
    setIsOpenNav(!isOpenNav);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpenNav(window.innerWidth > 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Header toggleNav={toggleNav} />
      </div>
      <div className={cx('content')}>
        <div
          className={cx(
            'content-left',
            { 'content-left-close': isOpenNav === false },
            { 'content-left-show': isOpenNav === true },
          )}
        >
          <Navbar toggleNav={toggleNav} isDesktop={isDesktop} />
        </div>
        <div className={cx('content-right', { 'content-right-full': isOpenNav === false })}>{children}</div>
      </div>
      <GoToTop />
    </div>
  );
}

export default DefaultLayout;
