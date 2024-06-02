import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './Order.module.scss';

import deliveryGif from '../../assets/images/shop/deliver.gif';
import empty from '../../assets/images/shop/empty.png';
import { getOrdersByStatus, changeStatus, cancelOrder } from '~/apiService/shopService';
import { ArrowDownIcon } from '~/components/Icons';
import { convertIso8601ToDatetime } from '~/utils/convertDate';
import { convertToVND } from '~/utils/convertMoney';

const cx = classNames.bind(styles);

const EmptyComponent = () => {
  return (
    <div className={cx('empty-orders')}>
      <div className={cx('image')}>
        <img src={empty} alt="empty-orders" className={cx('empty')} />
      </div>
      <h3>Hiện không có đơn hàng nào</h3>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className={cx('skeleton')} style={{ marginTop: '20px' }}>
      <div className={cx('skeleton-header')}>
        <div className={cx('skeleton-header-image')}></div>
        <div className={cx('skeleton-header-name')}></div>
      </div>
      <div className={cx('skeleton-content')}></div>
      <div className={cx('skeleton-line-one')}></div>
      <div className={cx('skeleton-line-two')}></div>
    </div>
  );
};

const Product = ({ product, status }) => {
  const dispatch = useDispatch();
  const cartDetails = product.cartDetails;
  const [changeHeight, setChangeHeight] = useState(false);

  const handleChangeWidth = () => {
    setChangeHeight(!changeHeight);
  };

  const handleChangeStatus = (status) => {
    dispatch(changeStatus({ orderId: product._id, status })).then((result) => {
      if (result.payload.code !== 200) {
        return toast.error(result.payload.message);
      }
      toast.success(result.payload.message);
      setTimeout(() => {
        window.location.href = '/shop/orders';
      }, 1000);
    });
  };

  const handleCancelOrder = () => {
    dispatch(cancelOrder({ orderId: product._id })).then((result) => {
      console.log(result);
      if (result.payload.code !== 200) {
        return toast.error(result.payload.message);
      }
      toast.success(result.payload.message);
      setTimeout(() => {
        window.location.href = '/shop/orders';
      }, 1000);
    });
  };

  return (
    <div className={cx('order-wrapper')}>
      <div className={cx('user-information')}>
        <div className={cx('user-container')}>
          <div className={cx('user-image')}>
            <img src={product.user.avatar} alt="ảnh đại diện" />
          </div>
          <span>{product.user.fullname}</span>
        </div>

        <button onClick={handleChangeWidth} className={cx('arrow-button')}>
          <ArrowDownIcon className={cx('icon', { change: changeHeight })} />
        </button>
      </div>
      <div className={cx('product-container', { hidden: changeHeight })}>
        {cartDetails.map((cart, idx) => (
          <div key={idx} className={cx('product-wrapper', { 'first-product-wrapper': idx === 0 })}>
            <div className={cx('product-desc-container')}>
              <div className={cx('image-wrapper')}>
                <img src={cart.product?.image} alt={cart.product?.name} className={cx({ change: changeHeight })} />
              </div>
              <div className={cx('desc')}>
                <h3 className={cx('title')}>{cart.product?.name}</h3>
                <p className={cx('describe')}>{cart.product?.description}</p>
                <p className={cx('quantity')}>X {cart?.quantity}</p>
              </div>
            </div>
            <div className={cx('price')}>{convertToVND(cart.product?.price)}</div>
          </div>
        ))}
      </div>
      <div className={cx('product-desc', { 'product-desc-active': changeHeight })}>
        <p className={cx('address')}>Địa chỉ: {product.address}</p>
        <p className={cx('note')}>Ghi chú: {product.note}</p>
        <p className={cx('time')}>Thời gian tạo đơn: {convertIso8601ToDatetime(product.createdAt)}</p>
        <p className={cx('payment')}>Hình thức thanh toán: Thanh toán khi nhận hàng</p>
        <div className={cx('total')}>
          <p>Tổng tiền</p>
          <p>{convertToVND(product.totalMoney)}</p>
        </div>
      </div>
      <div className={cx('btn-active', { 'btn-active-change-width': changeHeight })}>
        {status === 'pending' && (
          <div className={cx('group-btn')}>
            <button
              className={cx('btn-cancel', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleChangeStatus({ status: 'reject' })}
            >
              Từ chối
            </button>
            <button
              className={cx('btn-restore', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleChangeStatus({ status: 'confirmed' })}
            >
              Xác nhận
            </button>
          </div>
        )}
        {status === 'confirmed' && (
          <div className={cx('group-btn')}>
            <button
              className={cx('btn-cancel', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleCancelOrder()}
            >
              Hủy đơn
            </button>
            <button
              className={cx('btn-restore', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleChangeStatus({ status: 'shipping' })}
            >
              Giao hàng
            </button>
          </div>
        )}

        {status === 'shipping' && (
          <div className={cx('group-btn')}>
            <button
              className={cx('btn-cancel', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleCancelOrder()}
            >
              Hủy đơn
            </button>
            <button
              className={cx('btn-restore', { 'btn-restore-change-width': changeHeight })}
              onClick={() => handleChangeStatus({ status: 'success' })}
            >
              Hoàn thành
            </button>
          </div>
        )}

        {/* {status === 'success' && (
          <button
            className={cx('btn-restore', { 'btn-restore-change-width': changeHeight })}
            onClick={() => handleChangeStatus({ status: 'success' })}
          >
            Đánh giá
          </button>
        )} */}
      </div>
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();

  const categories = [
    { status: 'pending', name: 'Chờ xác nhận' },
    { status: 'confirmed', name: 'Đã xác nhận' },
    { status: 'shipping', name: 'Đang giao' },
    { status: 'success', name: 'Đã giao' },
    { status: 'rejected', name: 'Từ chối' },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [successOrders, setSuccessOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (status === 'pending') {
      dispatch(getOrdersByStatus({ status: 'pending' })).then((result) => {
        if (result.payload.code !== 200) {
          return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
        setPendingOrders(result.payload.data.orders);
        setStatus('pending');
        setLoading(false);
      });
      return;
    }

    if (status === 'shipping') {
      dispatch(getOrdersByStatus({ status: 'shipping' })).then((result) => {
        console.log(result);
        if (result.payload.code !== 200) {
          return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
        setShippingOrders(result.payload.data.orders);
        setStatus('shipping');
        setLoading(false);
      });
      return;
    }

    if (status === 'confirmed') {
      dispatch(getOrdersByStatus({ status: 'confirmed' })).then((result) => {
        if (result.payload.code !== 200) {
          return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
        setConfirmedOrders(result.payload.data.orders);
        setStatus('confirmed');
        setLoading(false);
      });
      return;
    }

    if (status === 'success') {
      dispatch(getOrdersByStatus({ status: 'success' })).then((result) => {
        if (result.payload.code !== 200) {
          return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
        setSuccessOrders(result.payload.data.orders);

        setLoading(false);
      });
      return;
    }

    if (status === 'rejected') {
      dispatch(getOrdersByStatus({ status: 'reject' })).then((result) => {
        if (result.payload.code !== 200) {
          return toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
        setRejectedOrders(result.payload.data.orders);
        setLoading(false);
      });
    }

    // if(status === "cancel"){

    // }
  }, [status]);

  const getCurrentOrders = () => {
    switch (currentCategory.status) {
      case 'pending':
        return pendingOrders;
      case 'shipping':
        return shippingOrders;
      case 'confirmed':
        return confirmedOrders;
      case 'success':
        return successOrders;
      case 'rejected':
        return rejectedOrders;
      default:
        return [];
    }
  };

  const currentOrders = getCurrentOrders();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-content', { delivering: shippingOrders.length > 0 })}>
        <div className={cx('delivery-gif')}>
          <img src={deliveryGif} alt="gif" className={cx('gif')} />
        </div>
      </div>
      <div className={cx('orders')}>
        <h1>Đơn hàng</h1>
        <hr />
        <div className={cx('category')}>
          {categories.map((item, idx) => (
            <div
              className={cx('category-item', currentCategory.name === item.name ? 'active' : '')}
              key={idx}
              onClick={() => {
                setCurrentCategory(item);
                setStatus(item.status);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        {loading ? (
          <Skeleton />
        ) : currentOrders.length > 0 ? (
          currentOrders.map((order, index) => <Product key={index} product={order} status={order.status} />)
        ) : (
          <EmptyComponent />
        )}

        {/*  */}
      </div>
    </div>
  );
};

export default Orders;
