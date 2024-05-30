import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './User.module.scss';
import RealTime from '~/components/RealTime';
import Button from '~/components/Button';
import { EditIcon, PlusIcon } from '~/components/Icons';
import { Avatar, Chip } from '@mui/material';
import ConfirmModal from '~/components/ConfirmModal';
import FormModal from '~/components/FormModal';
import EditUser from '~/components/EditUser';
import CreateUser from '~/components/CreateUser';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';
import { getAllUser, createUser, deleteUserById, updateUserById, getUserById } from '~/apiService/userService';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { t } = useTranslation();

  const headCells = [
    { id: 'avatar', numeric: false, disablePadding: false, label: t('users.title03') },
    { id: 'fullname', numeric: false, disablePadding: true, label: t('users.title04') },
    { id: 'email', numeric: true, disablePadding: false, label: t('users.title05') },
    { id: 'phone', numeric: true, disablePadding: false, label: t('users.title06') },
    { id: 'dateOfBirth', numeric: true, disablePadding: false, label: t('users.title07') },
    { id: 'gender', numeric: true, disablePadding: false, label: t('users.title08') },
    { id: 'isVerify', numeric: false, disablePadding: true, label: t('users.title09') },
    { id: 'isLocked', numeric: false, disablePadding: true, label: t('users.title10') },
    { id: 'lastActive', numeric: true, disablePadding: false, label: t('users.title11') },
    { id: 'role', numeric: true, disablePadding: false, label: t('users.title12') },
  ];
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
        {headCells.map((headCell) => (
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
  const { numSelected, isEdit } = props;
  const { selected, setSelected } = props;
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    isVerify: false,
    isLocked: false,
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateUser = () => {
    try {
      dispatch(createUser(userCredentials)).then((result) => {
        if (result.payload.code === 201) {
          toast.success(result.payload.message);
          setCreateModalIsOpen(false);
          setTimeout(() => {
            window.location.href = '/users';
          }, 1000);
          return;
        }
        toast.error(result.payload.message);
      });
    } catch (error) {
      toast.error(error.message);
    }
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
  };

  const handleDelete = () => {
    try {
      console.log(selected);
      for (let i = 0; i < selected.length; i++) {
        dispatch(deleteUserById(selected[i])).then((result) => {
          if (result.payload.code === 200) {
            toast.success(result.payload.message);
            setTimeout(() => {
              window.location.href = '/users';
            }, 1000);
            return;
          }
          toast.error(result.payload.message);
        });
      }
    } catch (error) {
      toast.error({ ...error });
    }
    closeConfirmModal();
  };

  const handleEdit = () => {
    dispatch(updateUserById({ userid: selected[0], userCredentials })).then((result) => {
      if (result.payload.code === 200) {
        closeEditModal();
        toast.success(result.payload.message);
        setTimeout(() => {
          window.location.href = '/users';
        }, 1000);
        return;
      }
      toast.error(result.payload.message);
    });
  };

  const handleCreate = () => {
    closeEditModal();
  };

  useEffect(() => {
    if (selected && selected.length > 0) {
      dispatch(getUserById(selected[0])).then((result) => {
        setUserCredentials({
          ...userCredentials,
          fullname: result.payload.data.fullname,
          email: result.payload.data.email,
          password: result.payload.data.password,
          phone: result.payload.data.phone,
          dateOfBirth: result.payload.data.dateOfBirth,
          gender: result.payload.data.gender,
          isVerify: result.payload.data.isVerify,
          isLocked: result.payload.data.isLocked,
          role: result.payload.data.role,
        });
      });
    } else {
      setUserCredentials({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
        gender: 'male',
        isVerify: false,
        isLocked: false,
        role: 'user',
      });
    }
  }, [selected.length]);

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
              {t('users.title02')}
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
            {t('users.btn01')}
          </Button>
        )}
      </Toolbar>

      <ConfirmModal
        title="Xác nhận xóa người dùng"
        desc={
          isEdit
            ? 'Bạn có chắc chắn muốn xóa tất cả những người dùng này không?'
            : 'Bạn có chắc chắn muốn xóa người dùng này không?'
        }
        type="Xóa"
        isOpen={confirmModalIsOpen}
        closeModal={closeConfirmModal}
        handle={handleDelete}
      />

      <FormModal
        title="Sửa thông tin người dùng"
        type="Sửa"
        isOpen={editModalIsOpen}
        closeModal={closeEditModal}
        handleEdit={handleEdit}
      >
        <EditUser userCredentials={userCredentials} handleInputChange={handleInputChange} />
      </FormModal>

      <FormModal
        title="Tạo mới người dùng"
        type="Tạo"
        isOpen={createModalIsOpen}
        closeModal={closeCreateModal}
        handle={handleCreate}
        handleCreateUser={handleCreateUser}
      >
        <CreateUser handleInputChange={handleInputChange} userCredentials={userCredentials} />
      </FormModal>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
};

export default function Users() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
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
      const newSelected = rows.map((n) => n._id);
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
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('clicked');
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
    return rows.filter(
      (row) =>
        row.fullname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        row.email.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [rows, searchKeyword]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const convertISODate = (isoDateString) => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

    return formattedDate;
  };

  useEffect(() => {
    dispatch(getAllUser({ limit: rowsPerPage, page: currentPage })).then((result) => {
      setRows(result.payload.users);
      setLoading(false);
      setTotalPage(result.payload.totalPage);
    });
  }, [currentPage, rowsPerPage]);

  return (
    <div className={cx('user')}>
      <h1 className={cx('user__heading')}>{t('users.title01')}</h1>
      <RealTime />
      <ThemeProvider theme={theme}>
        <Box className={cx('user__list')}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              isEdit={selected.length > 1}
              handleChangeSearch={(e) => {
                handleChangeSearch(e);
              }}
              selected={selected}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />

                {/* Body */}

                <TableBody>
                  {visibleRows.map((row, index) => {
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
                            <TableCell>
                              <div className={cx('skeleton-isLocked')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-lastActive')}></div>
                            </TableCell>
                            <TableCell>
                              <div className={cx('skeleton-role')}></div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
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
                              <Avatar alt={row.fullname} src={row.avatar} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {row.fullname}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="left">{convertDate(row.dateOfBirth)}</TableCell>
                            <TableCell align="left">
                              <Chip
                                label={row.gender}
                                variant="outlined"
                                style={{
                                  color: row.gender === 'male' ? '#5ab0f5' : '#ec407a',
                                  borderColor: row.gender === 'male' ? '#64b5f6' : '#ec407a',
                                  backgroundColor: row.gender === 'male' ? '#64b5f633' : '#ec407a14',
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              {row.isVerify ? (
                                <CheckIcon style={{ color: 'var(--primary-color)' }} />
                              ) : (
                                <CloseIcon style={{ color: '#f44336' }} />
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {row.isLocked ? (
                                <CheckIcon style={{ color: 'var(--primary-color)' }} />
                              ) : (
                                <CloseIcon style={{ color: '#f44336' }} />
                              )}
                            </TableCell>
                            <TableCell align="left">{convertISODate(row.lastActive)}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={row.role}
                                variant="outlined"
                                style={{
                                  color: row.role === 'admin' ? '#f44336' : row.role === 'shop' ? '#ff9800' : '#4caf50',
                                  borderColor:
                                    row.role === 'admin' ? '#f44336' : row.role === 'shop' ? '#ff9800' : '#4caf50',
                                  backgroundColor:
                                    row.role === 'admin'
                                      ? '#f443361c'
                                      : row.role === 'shop'
                                      ? '#ff980029'
                                      : '#4caf5029',
                                }}
                              />
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
              count={rows.length}
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
