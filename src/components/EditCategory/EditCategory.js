import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './EditCategory.module.scss';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function EditCategory({ handleInputChange, handleSelectImage, categoryCredentials, currentImage, currentName }) {
  const { t } = useTranslation();

  return (
    <form action="" className={cx('form')} autoComplete="off">
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
            Tên thể loại
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={currentName || categoryCredentials.categoryName}
              onChange={(e) => handleInputChange(e)}
              type="text"
              id="category-name"
              name="category-name"
              placeholder="Tên thể loại"
              className={cx('form__input')}
            />
            <CategoryOutlinedIcon fontSize="large" className={cx('icon')} />
          </div>
        </div>
      </div>

      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="image" className={cx('form__label', 'form__label--medium', 'form__label-choose-file')}>
            Chọn hình ảnh
          </label>

          <img
            className={cx('currentImage')}
            src={currentImage || categoryCredentials.categoryImage || images.noImage}
            alt=""
          />

          <div style={{ display: 'none' }} className={cx('form__text-input', 'form__text-input--sm')}>
            <input onInput={(e) => handleSelectImage(e)} type="file" accept="image/*" id="image" name="image" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditCategory;
