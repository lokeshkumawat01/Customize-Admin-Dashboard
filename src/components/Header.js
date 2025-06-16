import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Badge,
  Box,
  Tooltip,
  Popover
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { ChromePicker } from 'react-color';

const Header = ({
  sidebarOpen,
  toggleSidebar,
  darkMode,
  toggleTheme,
  theme,
  handleColorChange
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openColorPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeColorPicker = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
  position="fixed"
  sx={{
    zIndex: (theme) => theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(30, 30, 30, 0.85)' // Dark mode transparent dark
      : theme.palette.primary.main, // Light mode: use primary color
    color: theme.palette.getContrastText(theme.palette.primary.main), // Make icons/text readable
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(6px)',
  }}
>

      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Change Theme Color">
            <IconButton onClick={openColorPicker} color="inherit">
              <ColorLensIcon />
            </IconButton>
          </Tooltip>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={closeColorPicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2 }}>
              <ChromePicker
                color={theme.palette.primary.main}
                onChangeComplete={(color) => handleColorChange(color.hex, 'primary')}
              />
            </Box>
          </Popover>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={7} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            alt="User Profile"
            src="https://randomuser.me/api/portraits/men/41.jpg"
            sx={{ width: 36, height: 36 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

