import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Oval } from '@agney/react-loading';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import styles from './EditCategory.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function EditCategory({ handleInputChange, handleSelectImage, categoryCredentials, currentImage, currentName }) {
  const { t } = useTranslation();
  const loadingCategory = useSelector((state) => state.category.loading);

  return (
    <>
      {loadingCategory && (
        <div className={cx('modal-loading')}>
          <div className={cx('modal-loading__content')}>
            <Oval width="50" color="#00b14f" />
          </div>
        </div>
      )}
      <form action="" className={cx('form')} autoComplete="off">
        <div className={cx('form__row', 'form__row--three')}>
          <div className={cx('form__group')}>
            <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
              {t('category.title06')}
            </label>
            <div className={cx('form__text-input', 'form__text-input--sm')}>
              <input
                value={currentName || categoryCredentials.name}
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="category-name"
                name="category-name"
                placeholder={t('category.title06')}
                className={cx('form__input')}
              />
              <CategoryOutlinedIcon fontSize="large" className={cx('icon')} />
            </div>
          </div>
        </div>

        <div className={cx('form__row', 'form__row--three')}>
          <div className={cx('form__group')}>
            <label htmlFor="image" className={cx('form__label', 'form__label--medium', 'form__label-choose-file')}>
              {t('category.title07')}
            </label>

            <img
              className={cx('currentImage')}
              src={currentImage || categoryCredentials.image || images.noImage}
              alt=""
            />

            <div style={{ display: 'none' }} className={cx('form__text-input', 'form__text-input--sm')}>
              <input onInput={(e) => handleSelectImage(e)} type="file" accept="image/*" id="image" name="image" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditCategory;
