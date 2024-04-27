import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';

import styles from './RealTime.module.scss';

const cx = classNames.bind(styles);

function RealTime() {
  const [time, setTime] = useState(new Date()); // Khởi tạo state với thời gian hiện tại

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={cx('real-time__date')}>
      <span className={cx('real-time__date-weekday')}>
        {time.toLocaleDateString(`${Cookies.get('lang')}-US`, {
          weekday: 'long',
        })}
      </span>
      {` · ${time.toLocaleDateString(`${Cookies.get('lang')}-US`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} · ${time.toLocaleTimeString(`${Cookies.get('lang')}-US`, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: ['en', 'zh'].includes(Cookies.get('lang')),
        hour24: Cookies.get('lang') === 'vi',
      })}`}
    </div>
  );
}

export default RealTime;
