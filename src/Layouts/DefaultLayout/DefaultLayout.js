import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';

import Header from '~/Layouts/components/Header';
import GoToTop from '~/Layouts/components/GoToTop';
import Navbar from '~/Layouts/components/Navbar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('content')}>
        <Navbar />
        {children}
      </div>
      <GoToTop />
    </div>
  );
}

export default DefaultLayout;
