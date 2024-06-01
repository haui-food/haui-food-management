import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { visuallyHidden } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

import styles from './Product.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import RealTime from '~/components/RealTime';
import Button from '~/components/Button';
import { EditIcon, PlusIcon } from '~/components/Icons';
import { Avatar } from '@mui/material';
import ConfirmModal from '~/components/ConfirmModal';
import FormModal from '~/components/FormModal';
import EditProduct from '~/components/EditProduct/EditProduct';

import { createUser, deleteUserById } from '~/apiService/userService';
import CreateProduct from '~/components/CreateProduct/CreateProduct';
import { createProduct, deleteProductById, getAllProduct, updateProduct } from '~/apiService/productService';

const cx = classNames.bind(styles);

const theme = createTheme({
  typography: {
    color: 'var(--text-color)',
    fontSize: 26,
    fontFamily: 'var(--font-family)',
  },
  rowChecked: {
    backgroundColor: '#1976d2',
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 20,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'var(--text-color)',
          '&.Mui-checked': {
            color: 'var(--primary-color)',
          },
          '&.MuiCheckbox-indeterminate': {
            color: 'var(--primary-color)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: 'var(--primary-color)',

            '& + .MuiSwitch-track': {
              backgroundColor: 'rgba(140, 238, 184, 0.5)',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          maxWidth: '280px',
          minWidth: '80px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: '0',
        },
      },
    },
  },
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;

  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { t } = useTranslation();

  const headCells = [
    { id: 'image', numeric: false, disablePadding: false, label: 'Ảnh sản phẩm' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Tên sản phẩm' },
    { id: 'description', numeric: true, disablePadding: false, label: 'Mô tả sản phẩm' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Giá' },
    { id: 'shop', numeric: true, disablePadding: false, label: 'Cửa hàng' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Thể loại' },
    { id: 'slug', numeric: false, disablePadding: true, label: 'Slug' },
  ];
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, onAddProduct } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'avatar' ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { numSelected, isEdit, selected, currentProductArray, onAddProduct, onUpdateProduct } = props;
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const [ProductCredentials, setProductCredentials] = useState({});
  const [oldProductCredentials, setOldProductCredentials] = useState({});
  const [imageSelected, setImageSelected] = useState(null);
  const [error, setError] = useState({});

  const handleInputChange = (e, category) => {
    // Nếu có sự kiện e được truyền vào (ví dụ: thay đổi giá trị của input)
    if (e) {
      const { name, value } = e.target;
      setProductCredentials((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Nếu có category được truyền vào (ví dụ: thay đổi giá trị của combobox)
    if (category) {
      setProductCredentials((prevState) => ({
        ...prevState,
        category: category,
      }));

      // Đặt message lỗi của category về rỗng
      setError((prevState) => ({
        ...prevState,
        category: '',
      }));
    }
  };

  const validate = (e) => {
    const inputs = e ? [e.target] : document.querySelectorAll('input');
    const validators = {
      name: (value) => !value && 'Tên sản phẩm không được để trống',
      price: (value) => !value && 'Giá sản phẩm không được để trống',

      // Thêm các trường hợp khác nếu cần
    };

    let newErrors = {};
    inputs.forEach((input) => {
      const { name, value } = input;
      const errorMessage = validators[name] ? validators[name](value) : '';
      newErrors[name] = errorMessage || '';
    });

    setError((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    const hasError = Object.values(newErrors).every((error) => error === '');
    return hasError;
  };

  const handleCreateProduct = () => {
    let isSubmit = true;
    const productData = {
      name: ProductCredentials?.name,
      description: ProductCredentials?.description,
      price: ProductCredentials?.price,
      category: ProductCredentials?.category?._id,
    };

    if (!validate()) {
      isSubmit = false;
    }

    if (!productData.category) {
      setError((prevState) => ({
        ...prevState,
        category: 'Thể loại sản phẩm không được để trống',
      }));
      isSubmit = false;
    }

    if (!isSubmit) {
      toast.info('Vui lòng nhập đúng thông tin các trường');
      return;
    }

    dispatch(
      createProduct({
        productData: productData,
        image: imageSelected,
      }),
    ).then((result) => {
      if (result.payload.code === 201) {
        toast.success(result.payload.message);
        console.log(result.payload);
        // setTimeout(() => {
        //   window.location.href = '/products';
        // }, 1000);
        onAddProduct(result.payload.data);
        closeCreateModal();
        return;
      }
      toast.error(result.payload.message);
    });
  };

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false);
  };

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalIsOpen(false);
    setError({});
  };

  const handleDelete = () => {
    // console.log(selected);
    for (let i = 0; i < selected?.length; i++) {
      dispatch(deleteProductById(selected[i])).then((result) => {
        console.log(result);
        if (result.payload.code === 200) {
          toast.success(result.payload.message);
          // setTimeout(() => {
          //   window.location.href = '/users';
          // }, 1000);
          return;
        } else {
          toast.error(result.payload.message);
        }
      });
    }

    closeConfirmModal();
  };

  const handleEdit = () => {
    // console.log(ProductCredentials);

    const productData = {
      name: ProductCredentials?.name,
      description: ProductCredentials?.description,
      price: ProductCredentials?.price,
      category: ProductCredentials?.category?._id,
    };

    // kiểm tra xem có thay dữ liệu không
    if (JSON.stringify(productData) === JSON.stringify(oldProductCredentials) && !imageSelected) {
      toast.info('Không có thay đổi nào');
      return;
    }

    dispatch(
      updateProduct({
        productData: productData,
        image: imageSelected,
        productId: selected[0],
      }),
    ).then((result) => {
      if (result.payload.code === 200) {
        toast.success(result.payload.message);
        console.log(result.payload);
        onUpdateProduct(result.payload.data);
        closeEditModal();
      } else {
        toast.error(result.payload.message);
      }
    });
  };

  const handleCreate = () => {
    closeEditModal();
  };

  // lấy sản thông tin sản phẩm đã được chọn, category là 1 object để lấy cả tên và id
  useEffect(() => {
    if (selected?.length === 1) {
      const selectedProduct = currentProductArray.filter((product) => product._id === selected[0]);
      setProductCredentials({
        name: selectedProduct[0].name,
        description: selectedProduct[0].description ?? '',
        price: selectedProduct[0].price,
        category: { name: selectedProduct[0]?.category?.name ?? '', _id: selectedProduct[0]?.category?._id ?? '' },
        image: selectedProduct[0].image,
      });
      setOldProductCredentials({
        name: selectedProduct[0].name,
        description: selectedProduct[0]?.description ?? '',
        price: selectedProduct[0].price,
        category: selectedProduct[0]?.category?._id ?? '',
      });
    } else {
      setProductCredentials({
        name: '',
        description: '',
        price: '',
        category: {},
        image: null,
      });
    }
    //gán lại giá trị cho image selected mỗi khi đóng mở modal
    setImageSelected(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.length, editModalIsOpen, createModalIsOpen]);

  return (
    <div>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
          flex: '1 1 100%',
        }}
        className={cx('toolbar')}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
              Sản phẩm
            </Typography>
            <TextField
              label={t('users.inp01')}
              variant="standard"
              placeholder={t('users.inp02')}
              fullWidth
              margin="normal"
              size="small"
              sx={{ mr: 2, fontSize: '14px', mt: -0.7 }}
              onChange={(e) => {
                props.handleChangeSearch(e);
              }}
              className={cx('text-field')}
            />
          </>
        )}

        {numSelected > 0 ? (
          <>
            <Tooltip title="Delete">
              <IconButton onClick={openConfirmModal}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton disabled={isEdit} onClick={openEditModal}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Button onClick={openCreateModal} leftIcon={<PlusIcon />} addUser primary>
            Thêm sản phẩm
          </Button>
        )}
      </Toolbar>

      <ConfirmModal
        title="Xác nhận xóa sản phẩm"
        desc={
          isEdit
            ? 'Bạn có chắc chắn muốn xóa tất cả những sản phẩm này không?'
            : 'Bạn có chắc chắn muốn xóa sản phẩm này không?'
        }
        type="Xóa"
        isOpen={confirmModalIsOpen}
        closeModal={closeConfirmModal}
        handle={handleDelete}
      />

      <FormModal
        title="Sửa thông tin sản phẩm"
        type="Sửa"
        isOpen={editModalIsOpen}
        closeModal={closeEditModal}
        handleEdit={handleEdit}
      >
        {/* truyền thông tin sản phẩm và các hàm set lai thông tin sản phẩm khi thay đổi */}
        <EditProduct
          productCredentials={ProductCredentials}
          handleInputChange={handleInputChange}
          onImageChange={setImageSelected}
        />
      </FormModal>

      <FormModal
        title="Tạo sản phẩm mới"
        type="Tạo"
        isOpen={createModalIsOpen}
        closeModal={closeCreateModal}
        handle={handleCreate}
        handleCreateUser={handleCreateProduct}
      >
        <CreateProduct
          productCredentials={ProductCredentials}
          handleInputChange={handleInputChange}
          onImageChange={setImageSelected}
          onError={error}
          handleValidate={validate}
        />
      </FormModal>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
};

export default function Products() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log('clicked');
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage === totalPage) {
      return setCurrentPage(currentPage);
    }
    setLoading(true);
    setCurrentPage(currentPage + 1);
  };

  const hanldePrevPage = () => {
    if (currentPage === 1) {
      return setCurrentPage(1);
    }
    setLoading(true);
    setCurrentPage(currentPage - 1);
  };

  const filteredRows = useMemo(() => {
    return rows?.filter(
      (row) =>
        row?.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        row?.description?.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [rows, searchKeyword]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  const handleAddProduct = (newProduct) => {
    setRows((preRows) => {
      return [newProduct, ...preRows];
    });
  };

  const handleUpdateProduct = (updateProduct) => {
    setRows((prevRows) => prevRows.map((product) => (product._id === updateProduct._id ? updateProduct : product)));
  };

  //lấy thông tin tất cả các sản phẩm
  useEffect(() => {
    dispatch(getAllProduct({ limit: rowsPerPage, page: currentPage })).then((result) => {
      setRows(result.payload.products);
      setLoading(false);
      setTotalPage(result.payload.totalPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage]);

  return (
    <div className={cx('user')}>
      <h1 className={cx('user__heading')}>Danh sách sản phẩm</h1>
      <RealTime />
      <ThemeProvider theme={theme}>
        <Box className={cx('user__list')}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected?.length}
              isEdit={selected?.length > 1}
              handleChangeSearch={(e) => {
                handleChangeSearch(e);
              }}
              selected={selected}
              currentProductArray={rows}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                  numSelected={selected?.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows?.length}
                />

                {/* Body */}

                <TableBody>
                  {visibleRows?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <>
                        {loading ? (
                          <TableRow>
                            <TableCell role="checkbox" className={cx('skeleton-checkBox')}>
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                disabled
                                style={{ marginLeft: '-10px' }}
                              />
                            </TableCell>
                            <TableCell style={{ width: '80px' }}>
                              <div className={cx('skeleton-avatar')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-name')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-email')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-phone')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-dateOfBirth')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-gender')}></div>
                            </TableCell>

                            <TableCell>
                              <div className={cx('skeleton-isVerify')}></div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row._id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Avatar alt={row.name} src={row?.image} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {row?.name}
                            </TableCell>
                            <TableCell align="center">{row?.description ?? ''}</TableCell>
                            <TableCell align="center">{row?.price}</TableCell>
                            <TableCell align="center">{row?.shop?.fullname}</TableCell>
                            <TableCell align="center">{row?.category?.name}</TableCell>
                            <TableCell align="left" padding="none">
                              {row?.slug.trim()}
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* Body */}
              </Table>
            </TableContainer>
            <div className={cx('button-group')}>
              <button
                onClick={() => {
                  hanldePrevPage();
                }}
                style={{ backgroundColor: '#fff' }}
              >
                <ArrowLeftIcon className={cx('icon')} />
              </button>
              <button
                onClick={() => {
                  handleNextPage();
                }}
                style={{ backgroundColor: '#fff' }}
              >
                <ArrowRightIcon className={cx('icon')} />
              </button>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label={t('users.desc02')}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}
