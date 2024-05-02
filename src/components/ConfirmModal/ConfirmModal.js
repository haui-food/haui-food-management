import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { Button } from '@mui/material';

import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    transition: 'transform linear 0.2s',
  },
};

function ConfirmModal({ title, desc, type, isOpen, closeModal, handle }) {
  return (
    <div className={cx('modal')}>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel={title}>
        <h2 className={cx('modal__heading')}>{title}</h2>
        <p className={cx('modal__desc')}>{desc}</p>
        <div className={cx('modal__btn-group')}>
          <Button onClick={handle} variant="contained" color={type === 'Xóa' ? 'error' : 'success'}>
            {type}
          </Button>
          <Button onClick={closeModal} variant="contained" color="warning">
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
