import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Stack, 
  FormControlLabel, 
  Switch, 
  Button,
  Grid,
  TextField,
  InputAdornment,
  Avatar
} from '@mui/material';
import { 
  Palette, 
  Notifications, 
  Lock, 
  Person, 
  Language, 
  Check 
} from '@mui/icons-material';
import { ChromePicker } from 'react-color';

const SettingsPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#556cd6');
  const [secondaryColor, setSecondaryColor] = useState('#19857b');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('primary');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    monthly: false,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (color) => {
    if (currentColor === 'primary') {
      setPrimaryColor(color.hex);
    } else {
      setSecondaryColor(color.hex);
    }
  };

  const openColorPicker = (colorType) => {
    setCurrentColor(colorType);
    setDisplayColorPicker(true);
  };

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Settings
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3,
            }
          }}
        >
          <Tab icon={<Palette />} label="Theme" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Lock />} label="Security" />
          <Tab icon={<Person />} label="Profile" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Theme Customization
                </Typography>
                
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body1" mb={1}>
                      Primary Color
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        width: '100%', 
                        height: 50, 
                        backgroundColor: primaryColor,
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: primaryColor,
                          opacity: 0.9
                        }
                      }}
                      onClick={() => openColorPicker('primary')}
                    >
                      {primaryColor}
                    </Button>
                  </Box>
                  
                  <Box>
                    <Typography variant="body1" mb={1}>
                      Secondary Color
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        width: '100%', 
                        height: 50, 
                        backgroundColor: secondaryColor,
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: secondaryColor,
                          opacity: 0.9
                        }
                      }}
                      onClick={() => openColorPicker('secondary')}
                    >
                      {secondaryColor}
                    </Button>
                  </Box>
                  
                  <Box>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Dark Mode"
                    />
                  </Box>
                  
                  <Box>
                    <FormControlLabel
                      control={<Switch />}
                      label="RTL Layout"
                    />
                  </Box>
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Preview
                </Typography>
                
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                    color: '#fff',
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Avatar sx={{ width: 64, height: 64, mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <Person sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Admin Dashboard
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                    Customizable and responsive admin template
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      mt: 3, 
                      bgcolor: '#fff', 
                      color: primaryColor,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    Preview Theme
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Notification Preferences
                </Typography>
                
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.email} 
                        onChange={handleNotificationChange} 
                        name="email" 
                      />
                    }
                    label="Email Notifications"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.push} 
                        onChange={handleNotificationChange} 
                        name="push" 
                      />
                    }
                    label="Push Notifications"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.monthly} 
                        onChange={handleNotificationChange} 
                        name="monthly" 
                      />
                    }
                    label="Monthly Reports"
                  />
                </Paper>
                
                <Typography variant="body2" color="text.secondary">
                  You can manage your notification preferences here. Disable any notifications you don't want to receive.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Notification History
                </Typography>
                
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.light' }}>
                        <Check sx={{ color: 'primary.main' }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>Profile updated</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your profile information was updated
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'success.light' }}>
                        <Language sx={{ color: 'success.main' }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>New feature available</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check out the latest dashboard features
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'warning.light' }}>
                        <Notifications sx={{ color: 'warning.main' }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>Security alert</Typography>
                        <Typography variant="body2" color="text.secondary">
                          New login from unknown device
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Security Settings
                </Typography>
                
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body1" mb={1}>
                      Current Password
                    </Typography>
                    <TextField 
                      type="password"
                      fullWidth 
                      placeholder="Enter current password"
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="body1" mb={1}>
                      New Password
                    </Typography>
                    <TextField 
                      type="password"
                      fullWidth 
                      placeholder="Enter new password"
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="body1" mb={1}>
                      Confirm New Password
                    </Typography>
                    <TextField 
                      type="password"
                      fullWidth 
                      placeholder="Confirm new password"
                    />
                  </Box>
                  
                  <Button variant="contained" size="large">
                    Change Password
                  </Button>
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Two-Factor Authentication
                </Typography>
                
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable 2FA"
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Two-factor authentication adds an extra layer of security to your account.
                  </Typography>
                  
                  <Button variant="outlined">
                    Configure Authenticator App
                  </Button>
                </Paper>
                
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Active Sessions
                </Typography>
                
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography fontWeight={500}>
                      Chrome • Windows
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Session
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    New York, USA • 2 hours ago
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar 
                    alt="User Profile" 
                    src="https://randomuser.me/api/portraits/men/41.jpg" 
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Button variant="outlined" size="small">
                    Change Avatar
                  </Button>
                  
                  <Typography variant="h6" fontWeight={600} mt={3}>
                    John Smith
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                  
                  <Button variant="contained" sx={{ mt: 3 }} fullWidth>
                    Save Changes
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Personal Information
                </Typography>
                
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      label="First Name"
                      fullWidth 
                      defaultValue="John"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      label="Last Name"
                      fullWidth 
                      defaultValue="Smith"
                    />
                  </Grid>
                </Grid>
                
                <TextField 
                  label="Email"
                  fullWidth 
                  defaultValue="john.smith@example.com"
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Check color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField 
                  label="Phone"
                  fullWidth 
                  defaultValue="+1 (555) 123-4567"
                  sx={{ mb: 2 }}
                />
                
                <TextField 
                  label="Bio"
                  fullWidth 
                  multiline
                  rows={4}
                  defaultValue="Senior administrator with 5+ years of experience in managing enterprise systems and applications."
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      
      {displayColorPicker && (
        <Box sx={{ position: 'absolute', zIndex: 2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Box sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setDisplayColorPicker(false)} />
          <ChromePicker 
            color={currentColor === 'primary' ? primaryColor : secondaryColor} 
            onChange={handleColorChange} 
          />
        </Box>
      )}
    </Box>
  );
};

export default SettingsPanel;