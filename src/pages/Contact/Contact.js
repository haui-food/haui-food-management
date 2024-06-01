import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import styles from './Contact.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from '~/components/Button';
import RealTime from '~/components/RealTime';
import ConfirmModal from '~/components/ConfirmModal';
import FormModal from '~/components/FormModal';
import ViewContact from '~/components/ViewContact';
import { getAllContacts, getContactById, deleteContactById } from '~/apiService/contactService';

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
          maxWidth: '250px',
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
    { id: 'fullname', numeric: false, disablePadding: false, label: t('users.title04') },
    { id: 'email', numeric: false, disablePadding: false, label: t('users.title05') },
    { id: 'phone', numeric: false, disablePadding: false, label: t('users.title06') },
    { id: 'message', numeric: true, disablePadding: false, label: t('contact.title01') },
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
            {headCell.id === 'message' ? (
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
  const { numSelected, isEdit, selected, setSelected, searchKeyword } = props;
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);

  const [contactCredentials, setContactCredentials] = useState({
    fullname: '',
    email: null,
    phone: null,
    message: null,
  });

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalIsOpen(false);
  };

  const openEditModal = () => {
    setViewModalIsOpen(true);
  };

  const closeEditModal = () => {
    setViewModalIsOpen(false);
  };

  const handleDelete = () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        dispatch(deleteContactById(selected[i])).then((result) => {
          if (result.payload.code === 200) {
            toast.success(result.payload.message);
            setTimeout(() => {
              window.location.href = '/contacts';
            }, 1000);
          } else {
            toast.error(result.payload.message);
          }
        });
      }
    } catch (error) {
      toast.error({ ...error });
    }
    closeConfirmModal();
  };

  const handleExportFile = () => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    if (searchKeyword) {
      return `https://api.hauifood.com/v1/contacts/exports?keyword=${searchKeyword}&token=${token}`;
    }
    return `https://api.hauifood.com/v1/contacts/exports?token=${token}`;
  };

  useEffect(() => {
    if (selected && selected.length > 0) {
      dispatch(getContactById(selected[0])).then((result) => {
        setContactCredentials({
          ...contactCredentials,
          fullname: result.payload.data.fullname,
          email: result.payload.data.email,
          phone: result.payload.data.phone,
          message: result.payload.data.message,
        });
      });
    } else {
      setContactCredentials({
        fullname: '',
        email: null,
        phone: null,
        message: null,
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
            {numSelected} {t('form.lb02')}
          </Typography>
        ) : (
          <>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
              {t('contact.heading02')}
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
            <Button
              primary
              addUser
              target="_blank"
              rel="noreferrer"
              href={handleExportFile()}
              leftIcon={<FileDownloadOutlinedIcon fontSize="medium" />}
            >
              {t('button.btn08')}
            </Button>
          </>
        )}

        {numSelected > 0 && (
          <>
            <Tooltip title={t('button.btn07')}>
              <IconButton disabled={isEdit} onClick={openEditModal}>
                <RateReviewOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('button.btn01')}>
              <IconButton onClick={openConfirmModal}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>

      <ConfirmModal
        title={t('contact.title02')}
        desc={isEdit ? t('contact.desc01') : t('contact.desc02')}
        type={t('button.btn01')}
        isOpen={confirmModalIsOpen}
        closeModal={closeConfirmModal}
        handle={handleDelete}
      />

      <FormModal readOnly title={t('contact.title03')} isOpen={viewModalIsOpen} closeModal={closeEditModal}>
        <ViewContact contactCredentials={contactCredentials} />
      </FormModal>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
};

export default function Contact() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(15);
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
        (row.fullname && row.fullname.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (row.email && row.email.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (row.phone && row.phone.toLowerCase().includes(searchKeyword.toLowerCase())),
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

  useEffect(() => {
    dispatch(getAllContacts({ limit: rowsPerPage, page: currentPage })).then((result) => {
      setRows(result.payload.contacts);
      setLoading(false);
      setTotalPage(result.payload.totalPage);
    });
  }, [currentPage, rowsPerPage]);

  return (
    <div className={cx('category')}>
      <h1 className={cx('category__heading')}>{t('contact.heading01')}</h1>
      <RealTime />
      <ThemeProvider theme={theme}>
        <Box className={cx('category__list')}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              isEdit={selected.length > 1}
              handleChangeSearch={(e) => {
                handleChangeSearch(e);
              }}
              selected={selected}
              searchKeyword={searchKeyword}
            />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
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
                  {visibleRows &&
                    visibleRows.map((row, index) => {
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
                              <TableCell component="th" id={labelId} scope="row">
                                <div className={cx('skeleton-name')}></div>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <div className={cx('skeleton-email')}></div>
                              </TableCell>
                              <TableCell align="center">
                                <div className={cx('skeleton-phone')}></div>
                              </TableCell>
                              <TableCell align="center">
                                <div className={cx('skeleton-content')}></div>
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
                              <TableCell component="th" id={labelId} scope="row">
                                {row.fullname && row.fullname}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.email}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.phone && row.phone}
                              </TableCell>
                              <TableCell align="center">{row.message}</TableCell>
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
