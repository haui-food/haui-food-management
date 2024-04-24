import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <h1>Header</h1>
    </div>
  );
}

export default Header;
