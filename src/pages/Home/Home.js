import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  const { t } = useTranslation();

  return (
    <div className={cx('home')}>
      <h1 className={cx('home__heading')}>Dashboard</h1>
    </div>
  );
}

export default Home;
