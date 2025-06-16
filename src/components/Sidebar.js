// import React from 'react';
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText, 
//   Divider, 
//   Tooltip,
//   useTheme,
//   Toolbar,
//   Box
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: theme.drawerWidth,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: theme.drawerWidth,
//     boxSizing: 'border-box',
//     backgroundColor: theme.palette.mode === 'dark' 
//       ? theme.palette.background.default 
//       : theme.palette.primary.dark,
//     color: theme.palette.primary.contrastText,
//     borderRight: 'none',
//   },
// }));

// const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
//   borderRadius: 12,
//   margin: theme.spacing(0, 2, 1),
//   padding: theme.spacing(1, 2),
//   backgroundColor: selected 
//     ? theme.palette.mode === 'dark' 
//       ? 'rgba(255, 255, 255, 0.1)' 
//       : 'rgba(255, 255, 255, 0.2)'
//     : 'transparent',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     backgroundColor: theme.palette.mode === 'dark' 
//       ? 'rgba(255, 255, 255, 0.1)' 
//       : 'rgba(255, 255, 255, 0.2)',
//   },
//   '& .MuiListItemIcon-root': {
//     minWidth: 40,
//     color: selected ? theme.palette.secondary.main : theme.palette.primary.contrastText,
//   },
//   '& .MuiListItemText-primary': {
//     fontWeight: selected ? 600 : 500,
//     color: selected ? theme.palette.secondary.main : theme.palette.primary.contrastText,
//   },
// }));

// const Sidebar = ({ open, drawerWidth, menuItems, activePage, setActivePage }) => {
//   const theme = useTheme();
  
//   return (
//     <StyledDrawer
//       variant="persistent"
//       anchor="left"
//       open={open}
//       sx={{
//         width: drawerWidth,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//         },
//       }}
//       theme={{ drawerWidth, ...theme }}
//     >
//       <Toolbar />
//       <Box sx={{ overflow: 'auto', mt: 2 }}>
//         <List>
//           {menuItems.map((item) => (
//             <Tooltip title={item.name} placement="right" key={item.id}>
//               <StyledListItem
//                 button
//                 selected={activePage === item.id}
//                 onClick={() => setActivePage(item.id)}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </StyledListItem>
//             </Tooltip>
//           ))}
//         </List>
//         <Divider sx={{ 
//           borderColor: theme.palette.mode === 'dark' 
//             ? 'rgba(255, 255, 255, 0.1)' 
//             : 'rgba(255, 255, 255, 0.3)',
//           mx: 3, 
//           my: 2 
//         }} />
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           p: 2,
//           color: theme.palette.primary.contrastText,
//           opacity: 0.7,
//           fontSize: '0.75rem'
//         }}>
//           v1.0.0 • Admin Dashboard
//         </Box>
//       </Box>
//     </StyledDrawer>
//   );
// };

// export default Sidebar;

import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Tooltip,
  useTheme,
  Toolbar,
  Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, drawerWidth, menuItems }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.background.default 
            : theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <Tooltip title={item.name} placement="right" key={item.id}>
              <ListItem
                button
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 12,
                  margin: theme.spacing(0, 2, 1),
                  padding: theme.spacing(1, 2),
                  backgroundColor: isActive(item.path) 
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(255, 255, 255, 0.2)',
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: 40,
                    color: isActive(item.path) 
                      ? theme.palette.secondary.main 
                      : theme.palette.primary.contrastText,
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive(item.path) ? 600 : 500,
                    color: isActive(item.path) 
                      ? theme.palette.secondary.main 
                      : theme.palette.primary.contrastText,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider sx={{ 
          borderColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(255, 255, 255, 0.3)',
          mx: 3, 
          my: 2 
        }} />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          p: 2,
          color: theme.palette.primary.contrastText,
          opacity: 0.7,
          fontSize: '0.75rem'
        }}>
          v1.0.0 • Admin Dashboard
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;