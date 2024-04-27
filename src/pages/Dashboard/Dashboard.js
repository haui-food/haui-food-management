import React, { useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';

import item1 from '~/assets/images/dashboard/ic_glass_bag.png';
import item2 from '~/assets/images/dashboard/ic_glass_users.png';
import item3 from '~/assets/images/dashboard/ic_glass_buy.png';
import item4 from '~/assets/images/dashboard/ic_glass_message.png';
import BiaxialLineChart from '~/components/Charts/BiaxialLineChart/BiaxialLineChart';
import PieChart from '~/components/Charts/PieChart';
import { useTranslation } from 'react-i18next';
import RealTime from '~/components/RealTime';

const cx = classNames.bind(styles);

const DashBoard = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([
    { imgUrl: item1, data: '714k', name: t('dashboards.desc02'), border: '#21b77e' },
    { imgUrl: item2, data: '2m', name: t('dashboards.desc03'), border: '#3584e8' },
    { imgUrl: item3, data: '1.2m', name: t('dashboards.desc04'), border: '#fab72e' },
    { imgUrl: item4, data: '2.3k', name: t('dashboards.desc05'), border: '#fc8c66' },
  ]);

  return (
    <div className={cx('dashboard')}>
      <h1>{t('dashboards.desc01')} 👋</h1>
      <RealTime />
      <div className={cx('dashboard--pape')}>
        {data.map((item, index) => {
          return (
            <div key={index} className={cx('dashboard--pape--item')} style={{ '--dashboard-border': `${item.border}` }}>
              <img src={item.imgUrl} alt="img" style={{ width: '64px', height: '64px' }} />
              <div className={cx('dashboard--pape--description')}>
                <h2>{item.data}</h2>
                <h3>{item.name}</h3>
              </div>
            </div>
          );
        })}

        <div className={cx('dashboard--pape--chart-column')}>
          <h5>{t('dashboards.desc06')}</h5>
          <p>+43% {t('dashboards.lb01')}</p>
          <div className={cx('bar-chart')}>
            <BiaxialLineChart />
          </div>
        </div>
        <div className={cx('dashboard--pape--chart-circle')}>
          <div>
            <h5>{t('dashboards.desc07')}</h5>
          </div>
          <div className={cx('pie-chart')}>
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
