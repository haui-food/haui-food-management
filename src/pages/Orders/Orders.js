import React, { useState } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import deliveryGif from '../../assets/images/shop/deliver.gif';

const cx = classNames.bind(styles);

const Orders = () => {
  const categories = [{ name: 'Chờ xác nhận' }, { name: 'Đang giao' }, { name: 'Đã giao' }, { name: 'Đã hủy' }];
  const [currentCategory, setCurrentCategory] = useState('Chờ xác nhận');

  return (
    <div className={cx('wrapper')}>
      {/* <h1>Đơn hàng</h1> */}
      <div className={cx('left-content')}>
        <div className={cx('delivery-gif')}>
          <img src={deliveryGif} alt="gif" className={cx('gif')} />
        </div>
      </div>
      <div className={cx('orders')}>
        <h1>Đơn hàng</h1>
        <hr />
        <div className={cx('category')}>
          {categories.map((item, idx) => {
            return (
              <div
                className={cx('category-item', currentCategory === item.name ? 'active' : '')}
                key={idx}
                onClick={() => setCurrentCategory(item.name)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
