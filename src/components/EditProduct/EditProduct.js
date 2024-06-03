import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './EditProduct.module.scss';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import images from '~/assets/images';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCategory } from '~/apiService/categoryService';

const cx = classNames.bind(styles);

const ComboBox = ({ onValueChange, value }) => {
  const dispatch = useDispatch();
  const [listCategory, setListCategory] = useState([]);

  // khi thay đổi option sẽ gán lại giá trị cho value rồi lấy chính giá trị đó để hiển thị
  const handleChange = (e, newValue) => {
    onValueChange({ name: newValue?.name, _id: newValue?._id });
  };

  useEffect(() => {
    dispatch(getAllCategory({ limit: 10000, page: 1 })).then((result) => {
      setListCategory(result.payload.categories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={listCategory}
      getOptionLabel={(option) => option.name}
      sx={{ width: '100%' }}
      onChange={handleChange}
      // lấy gía trị của value để hiển thị
      inputValue={value?.name}
      renderInput={(params) => <TextField {...params} placeholder={value?.name} />}
    />
  );
};

function EditProduct({ handleInputChange, productCredentials, onImageChange, onError, handleValidate }) {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState();
  const [imagePreview, setImagePreview] = useState();

  // gán gía trị ban đầu cho selectedCategory để hiển thị trên combobox
  useEffect(() => {
    // setSelectedCategory({ name: productCredentials.category.name, _id: productCredentials.category._id });
    setSelectedCategory({ ...productCredentials.category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // gán lại giá trị cho category selected khi thay đổi category
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    handleInputChange(null, newCategory);
  };

  // gán lại giá trị cho selectd image khi có thay đổi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (e) => {
    handleValidate(e);
  };

  return (
    <form action="" className={cx('form')} autoComplete="off">
      <div className={cx('form__row', 'form__row--three')}>
        {/* product name */}
        <div className={cx('form__group')}>
          <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
            {t('productPage.form.nameLabel')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm', { 'form-error': onError?.name })}>
            <input
              value={productCredentials?.name}
              onChange={(e) => {
                handleInputChange(e);
                validate(e);
              }}
              onBlur={(e) => {
                validate(e);
              }}
              type="text"
              id="name"
              name="name"
              placeholder={t('productPage.form.nameLabel')}
              className={cx('form__input')}
            />
            <CategoryOutlinedIcon fontSize="large" className={cx('icon')} />
          </div>
          {onError?.name && <p className={cx('form__error-message')}>{onError?.name}</p>}
        </div>
      </div>

      {/* product description */}
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
            {t('productPage.form.descLabel')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm')}>
            <input
              value={productCredentials?.description}
              onChange={(e) => handleInputChange(e)}
              type="text"
              id="description"
              name="description"
              placeholder={t('productPage.form.descLabel')}
              className={cx('form__input')}
            />
            <CategoryOutlinedIcon fontSize="large" className={cx('icon')} />
          </div>
        </div>
      </div>

      {/* product price */}
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
            {t('productPage.form.priceLabel')}
          </label>
          <div className={cx('form__text-input', 'form__text-input--sm', { 'form-error': onError?.price })}>
            <input
              value={productCredentials?.price}
              onChange={(e) => {
                handleInputChange(e);
                validate(e);
              }}
              onBlur={(e) => {
                validate(e);
              }}
              type="text"
              id="price"
              name="price"
              placeholder={t('productPage.form.priceLabel')}
              className={cx('form__input')}
            />
            <CategoryOutlinedIcon fontSize="large" className={cx('icon')} />
          </div>
          {onError?.price && <p className={cx('form__error-message')}>{onError?.price}</p>}
        </div>
      </div>

      {/* product category */}
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="category-name" className={cx('form__label', 'form__label--medium')}>
            {t('productPage.form.categoryLabel')}
          </label>

          <ComboBox onValueChange={handleCategoryChange} value={selectedCategory} />
          {onError?.category && <p className={cx('form__error-message')}>{onError?.category}</p>}
        </div>
      </div>

      {/* product image */}
      <div className={cx('form__row', 'form__row--three')}>
        <div className={cx('form__group')}>
          <label htmlFor="image" className={cx('form__label', 'form__label--medium', 'form__label-choose-file')}>
            {t('productPage.form.imgLabel')}
          </label>

          <img
            className={cx('currentImage')}
            src={imagePreview || productCredentials?.image || images.noImage}
            alt=""
          />

          <div style={{ display: 'none' }} className={cx('form__text-input', 'form__text-input--sm')}>
            <input onInput={(e) => handleImageChange(e)} type="file" accept="image/*" id="image" name="image" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProduct;
