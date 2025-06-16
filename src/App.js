import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
  Dashboard as DashboardIcon,
  TableChart,
  BarChart,
  CalendarToday,
  ViewKanban,
  Settings,
} from '@mui/icons-material';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import DataTable from './components/DataTable';
import Charts from './components/Charts';
import Calendar from './components/Calendar';
import KanbanBoard from './components/KanbanBoard';
import SettingsPanel from './components/SettingsPanel';
import { Routes, Route } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { id: 1, name: 'Dashboard', icon: <DashboardIcon />, path: '/', component: <DashboardHome /> },
  { id: 2, name: 'Tables', icon: <TableChart />, path: '/tables', component: <DataTable /> },
  { id: 3, name: 'Charts', icon: <BarChart />, path: '/charts', component: <Charts /> },
  { id: 4, name: 'Calendar', icon: <CalendarToday />, path: '/calendar', component: <Calendar /> },
  { id: 5, name: 'Kanban', icon: <ViewKanban />, path: '/kanban', component: <KanbanBoard /> },
  { id: 6, name: 'Settings', icon: <Settings />, path: '/settings', component: <SettingsPanel /> },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#556cd6');
  const [secondaryColor, setSecondaryColor] = useState('#19857b');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleColorChange = (colorValue, type) => {
    if (type === 'primary') {
      setPrimaryColor(colorValue);
    } else if (type === 'secondary') {
      setSecondaryColor(colorValue);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: darkMode ? '#121212' : '#f5f7fa',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h5: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          theme={theme}
          handleColorChange={handleColorChange}
        />
        <Sidebar 
          open={sidebarOpen} 
          drawerWidth={drawerWidth}
          menuItems={menuItems}
        />
        <Box
          component="main"
          sx={theme => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: sidebarOpen ? 0 : `-${drawerWidth}px`,
            ...(sidebarOpen && {
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          })}
        >
          <Box sx={{ marginTop: 8 }}>
            <Routes>
              {menuItems.map((item) => (
                <Route 
                  key={item.id} 
                  path={item.path} 
                  element={item.component} 
                />
              ))}
              <Route path="*" element={<DashboardHome />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
