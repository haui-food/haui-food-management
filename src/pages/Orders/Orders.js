import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import deliveryGif from '../../assets/images/shop/deliver.gif';
import empty from '../../assets/images/shop/empty.png';
import RecentOrder from '~/components/RecentOrder';
import { getOrders } from '~/apiService/shopService';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Orders = () => {
  const dispatch = useDispatch();

  const categories = [{ name: 'Chờ xác nhận' }, { name: 'Đang giao' }, { name: 'Đã giao' }, { name: 'Đã hủy' }];
  const [currentCategory, setCurrentCategory] = useState('Chờ xác nhận');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [deliveringOrders, setDeliveringOrders] = useState([{ name: 'cá mè' }]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    dispatch(getOrders()).then((result) => {
      if (result.payload.code !== 200) {
        return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
      toast('Lấy đơn hàng thành công');
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-content', { delivering: deliveringOrders.length > 0 })}>
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

        {/* Không có đơn hàng */}
        <div className={cx('empty-orders')}>
          <div className={cx('image')}>
            <img src={empty} alt="empty-orders" className={cx('empty')} />
          </div>
          <h3>Hiện không có đơn hàng nào</h3>
        </div>
        {/* Không có đơn hàng end */}

        {/* <RecentOrder /> */}
      </div>
    </div>
  );
};

export default Orders;
