import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';

import item1 from '~/assets/images/dashboard/ic_glass_bag.png';
import item2 from '~/assets/images/dashboard/ic_glass_users.png';
import item3 from '~/assets/images/dashboard/ic_glass_buy.png';
import item4 from '~/assets/images/dashboard/ic_glass_message.png';
import BiaxialLineChart from '~/components/Charts/BiaxialLineChart/BiaxialLineChart';
import PieChart from '~/components/Charts/PieChart';
import TwinBarChart from '~/components/Charts/TwinBarChart/TwinBarChart';
import { useTranslation } from 'react-i18next';
import RealTime from '~/components/RealTime';
import { ArrowDownIcon } from '~/components/Icons';
import RevenueChart from '~/components/Charts/RevenueChart';
import GaugeChart from '~/components/Charts/GaugeChart';
import RecentOrder from '~/components/RecentOrder';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';

const cx = classNames.bind(styles);

const DashBoard = () => {
  const { t } = useTranslation();
  const revenueRef = useRef();

  const [data, setData] = useState([
    { imgUrl: item1, data: '714k', name: t('dashboards.desc02'), border: '#21b77e' },
    { imgUrl: item2, data: '2m', name: t('dashboards.desc03'), border: '#3584e8' },
    { imgUrl: item3, data: '1.2m', name: t('dashboards.desc04'), border: '#fab72e' },
    { imgUrl: item4, data: '2.3k', name: t('dashboards.desc05'), border: '#fc8c66' },
  ]);
  const [sortTypeData, setSortTypeData] = useState([
    { name: t('dashboards.cb01'), type: 'week' },
    { name: t('dashboards.cb02'), type: 'month' },
    { name: t('dashboards.cb03'), type: 'quarter' },
    { name: t('dashboards.cb04'), type: 'year' },
  ]);

  const [currentSortType, setCurrentSortType] = useState(sortTypeData[0]);
  const [isOpenSortTypeMenu, setIsOpenSortTypeMenu] = useState(false);

  const handleChangeSortType = (sortType) => {
    setCurrentSortType(sortType);
  };

  const handleOpenSortTypeMenu = () => {
    setIsOpenSortTypeMenu(!isOpenSortTypeMenu);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (revenueRef.current && !revenueRef.current.contains(e.target)) {
        setIsOpenSortTypeMenu(false);
      }
    };

    if (isOpenSortTypeMenu) {
      document.addEventListener('click', handleClickOutSide);
    } else {
      document.removeEventListener('click', handleClickOutSide);
    }

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, [isOpenSortTypeMenu]);

  return (
    <div className={cx('dashboard')}>
      <h1>{t('dashboards.desc01')} 👋</h1>

      <div className={cx('dashboard-title')}>
        <RealTime />
        <div className={cx('sort-box-wrapper')} ref={revenueRef}>
          <div className={cx('sort-box')} onClick={handleOpenSortTypeMenu}>
            {currentSortType.name}
            <ArrowDownIcon className={cx('arrow-down-icon', { 'arrow-down-icon--active': isOpenSortTypeMenu })} />
          </div>

          {isOpenSortTypeMenu && (
            <div className={cx('sort-box-menu')}>
              {sortTypeData.map((item, index) => {
                return (
                  <div
                    className={cx('sort-item')}
                    onClick={() => {
                      handleChangeSortType(item);
                      setIsOpenSortTypeMenu(false);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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

        {/* <div className={cx('dashboard--pape--chart-column')}>
          <div className={cx('revenue-header')}>
            <h5>{t('dashboards.desc06')}</h5>
          </div>
          <div className={cx('bar-chart')}>
            <BiaxialLineChart sortType={currentSortType} />
          </div>
        </div> */}

        <div className={cx('dashboard-revenue-chart')}>
          <div className={cx('dashboard-revenue-chart-header')}>
            <h5>{t('users.title16')}</h5>
          </div>
          <RevenueChart sortType={currentSortType} />
        </div>

        <div className={cx('dashboard--pape--chart-circle')}>
          <div>
            <h5>{t('dashboards.desc07')}</h5>
          </div>
          <div className={cx('pie-chart')}>
            <PieChart />
          </div>
        </div>

        <div className={cx('dashboard-container')}>
          <div className={cx('hybrid-chart')}>
            <h5>{t('users.desc03')}</h5>
            <TwinBarChart sortType={currentSortType} />
          </div>

          <div className={cx('group-chart-wrapper')}>
            <div className={cx('group-chart')}>
              <h5>{t('users.title13')}</h5>
              <div className={cx('group-chart-content')}>
                <span>9,000,000</span>
                <GaugeChart value={'40'} />
              </div>
            </div>

            <div className={cx('group-chart')}>
              <h5>{t('users.title14')}</h5>
              <div className={cx('group-chart-content')}>
                <span>9,000,000</span>
                <GaugeChart value={'40'} />
              </div>
            </div>

            <div className={cx('group-chart')}>
              <h5>{t('users.title15')}</h5>
              <div className={cx('group-chart-content')}>
                <span>9,000,000</span>
                <GaugeChart value={'40'} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className={cx('recent-orders')}>
          <h5>Recent Orders</h5>
          <RecentOrder />
        </div>

        <div className={cx('top-products')}>
          <div className={cx('top-products-header')}>
            <h5>Top Products</h5>

            <div className={cx('button-group')}>
              <button className={cx('btn-left')}>
                <ArrowLeftIcon className={cx('icon')} />
              </button>

              <button className={cx('btn-right')}>
                <ArrowRightIcon className={cx('icon')} />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;
