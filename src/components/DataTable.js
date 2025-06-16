import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  Avatar,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';

const rows = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Emma Johnson', email: 'emma@example.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2 days ago' },
  { id: 4, name: 'Sophia Davis', email: 'sophia@example.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago' },
  { id: 5, name: 'William Wilson', email: 'william@example.com', role: 'Editor', status: 'Active', lastLogin: '3 hours ago' },
  { id: 6, name: 'Olivia Taylor', email: 'olivia@example.com', role: 'Viewer', status: 'Active', lastLogin: '1 day ago' },
  { id: 7, name: 'James Anderson', email: 'james@example.com', role: 'Editor', status: 'Inactive', lastLogin: '4 days ago' },
  { id: 8, name: 'Charlotte Martinez', email: 'charlotte@example.com', role: 'Admin', status: 'Active', lastLogin: '30 minutes ago' },
];

const headCells = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'lastLogin', label: 'Last Login', sortable: true },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600, backgroundColor: 'background.default' }}
          >
            {headCell.sortable ? (
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
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DataTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [filter, setFilter] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredRows = rows.filter((row) => 
    row.name.toLowerCase().includes(filter.toLowerCase()) ||
    row.email.toLowerCase().includes(filter.toLowerCase()) ||
    row.role.toLowerCase().includes(filter.toLowerCase()) ||
    row.status.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return b[orderBy] < a[orderBy] ? -1 : 1;
    }
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        User Management
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search users..."
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Box>
          <Chip label="Active: 6" color="success" variant="outlined" sx={{ mr: 1 }} />
          <Chip label="Inactive: 2" color="error" variant="outlined" />
        </Box>
      </Box>
      
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <EnhancedTableHead 
              order={order} 
              orderBy={orderBy} 
              onRequestSort={handleRequestSort} 
            />
            <TableBody>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={`https://i.pravatar.cc/40?img=${row.id}`} 
                        sx={{ width: 32, height: 32, mr: 2 }}
                      />
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.role} 
                      size="small" 
                      color={
                        row.role === 'Admin' ? 'primary' : 
                        row.role === 'Editor' ? 'secondary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      color={row.status === 'Active' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.lastLogin}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;