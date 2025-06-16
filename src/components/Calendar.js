import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Stack, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  Badge,
  Grid
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Today, 
  Event, 
  Add 
} from '@mui/icons-material';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    const calendarDays = [];
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <Box 
          key={`prev-${i}`} 
          sx={{ 
            height: 100, 
            p: 1, 
            bgcolor: 'background.default', 
            color: 'text.disabled',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          {prevMonthDays - firstDayOfMonth + i + 1}
        </Box>
      );
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        today.getDate() === i && 
        today.getMonth() === currentDate.getMonth() && 
        today.getFullYear() === currentDate.getFullYear();
        
      const isSelected = 
        selectedDate.getDate() === i && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear();
        
      const hasEvent = i % 3 === 0 || i % 7 === 0;
        
      calendarDays.push(
        <Box 
          key={`current-${i}`} 
          onClick={() => handleDateClick(i)}
          sx={{ 
            height: 100, 
            p: 1, 
            cursor: 'pointer',
            position: 'relative',
            bgcolor: isSelected ? 'primary.light' : 'background.paper',
            color: isSelected ? 'primary.contrastText' : 'text.primary',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            '&:hover': {
              bgcolor: isSelected ? 'primary.light' : 'action.hover',
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" fontWeight={isToday ? 600 : 400}>
              {i}
            </Typography>
            {hasEvent && (
              <Badge 
                variant="dot" 
                color="error" 
                sx={{ 
                  position: 'absolute', 
                  top: 4, 
                  right: 4 
                }} 
              />
            )}
          </Box>
          {isToday && (
            <Box sx={{ 
              position: 'absolute', 
              top: 4, 
              left: 4, 
              width: 4, 
              height: 4, 
              borderRadius: '50%', 
              bgcolor: 'primary.main' 
            }} />
          )}
          {i === 10 && (
            <Typography variant="caption" sx={{ 
              display: 'block', 
              bgcolor: 'success.light', 
              color: 'success.dark', 
              borderRadius: 1, 
              p: 0.5, 
              mt: 0.5,
              fontSize: '0.65rem'
            }}>
              Team Meeting
            </Typography>
          )}
          {i === 15 && (
            <Typography variant="caption" sx={{ 
              display: 'block', 
              bgcolor: 'warning.light', 
              color: 'warning.dark', 
              borderRadius: 1, 
              p: 0.5, 
              mt: 0.5,
              fontSize: '0.65rem'
            }}>
              Project Deadline
            </Typography>
          )}
        </Box>
      );
    }
    
    // Next month days
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - calendarDays.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDays.push(
        <Box 
          key={`next-${i}`} 
          sx={{ 
            height: 100, 
            p: 1, 
            bgcolor: 'background.default', 
            color: 'text.disabled',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          {i}
        </Box>
      );
    }
    
    return calendarDays;
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  const events = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM - 11:30 AM', color: 'success' },
    { id: 2, title: 'Lunch with Client', time: '1:00 PM - 2:30 PM', color: 'primary' },
    { id: 3, title: 'Project Review', time: '3:00 PM - 4:00 PM', color: 'warning' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Calendar
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined" 
            startIcon={<Today />} 
            onClick={handleToday}
          >
            Today
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Add />}
          >
            New Event
          </Button>
        </Stack>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                {formatDate(currentDate)}
              </Typography>
              <Box>
                <IconButton onClick={handlePrevMonth}>
                  <ChevronLeft />
                </IconButton>
                <IconButton onClick={handleNextMonth}>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
            
            <Grid container spacing={1} mb={1}>
              {days.map((day) => (
                <Grid item xs key={day} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            
            <Grid container spacing={1}>
              {renderCalendar()}
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              height: '100%',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={3}>
              Upcoming Events
            </Typography>
            
            {selectedDate && (
              <Typography variant="subtitle1" mb={3}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </Typography>
            )}
            
            <List>
              {events.map((event) => (
                <ListItem 
                  key={event.id} 
                  sx={{ 
                    borderLeft: `3px solid`, 
                    borderColor: `${event.color}.main`,
                    mb: 1,
                    borderRadius: 1
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${event.color}.light`, color: `${event.color}.main` }}>
                      <Event />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.title}
                    secondary={event.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calendar;