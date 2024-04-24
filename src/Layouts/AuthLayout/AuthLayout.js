import classNames from 'classnames/bind';

import styles from './AuthLayout.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <img className={cx('logo__img')} src={images.logoVip2} alt="logo" />
      </div>
      <div className={cx('container')}>{children}</div>
    </div>
  );
}

export default AuthLayout;
