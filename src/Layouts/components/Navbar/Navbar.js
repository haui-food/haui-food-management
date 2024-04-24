import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <h1>Navbar</h1>
    </div>
  );
}

export default Navbar;
