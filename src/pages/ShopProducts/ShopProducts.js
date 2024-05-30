import React, { useState, useEffect } from 'react';
import styles from './ShopProducts.module.scss';
import classNames from 'classnames/bind';
import { ProductIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const ShopProducts = () => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
  };
  return <div className={cx('wrapper')}></div>;
};

export default ShopProducts;
