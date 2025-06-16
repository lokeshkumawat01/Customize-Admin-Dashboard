import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Tabs, 
  Tab, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { BarChart, PieChart, ShowChart } from '@mui/icons-material';

const ChartCard = ({ title, children, icon }) => {
  return (
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
};

const Charts = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [timeRange, setTimeRange] = React.useState('month');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const renderChart = (type) => {
    const colors = ['#556cd6', '#19857b', '#e53e3e', '#dd6b20', '#38a169'];
    
    return (
      <Box 
        sx={{ 
          height: 300, 
          backgroundImage: `linear-gradient(120deg, rgba(${type === 'bar' ? '85,108,214' : '25,133,123'},0.1) 0%, rgba(${type === 'bar' ? '25,133,123' : '85,108,214'},0.05) 100%)`, 
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          fontSize: '0.9rem',
          textAlign: 'center',
          p: 4
        }}
      >
        {type === 'bar' ? (
          <Box>
            Interactive bar chart showing data visualization
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
              {colors.map((color, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    width: 12, 
                    height: 40 * (index + 1), 
                    bgcolor: color, 
                    borderRadius: 2 
                  }} 
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            Interactive pie chart showing data distribution
            <Box sx={{ 
              width: 150, 
              height: 150, 
              borderRadius: '50%', 
              background: `conic-gradient(
                ${colors[0]} 0% 20%, 
                ${colors[1]} 20% 40%, 
                ${colors[2]} 40% 60%, 
                ${colors[3]} 60% 80%, 
                ${colors[4]} 80% 100%
              )`,
              mt: 2
            }} />
          </Box>
        )}
        <Box mt={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Analytics Dashboard
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Sales" />
          <Tab label="Traffic" />
          <Tab label="Performance" />
        </Tabs>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartCard title="Revenue Analysis" icon={<ShowChart />}>
            {renderChart('bar')}
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ChartCard title="Traffic Sources" icon={<PieChart />}>
            {renderChart('pie')}
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ChartCard title="User Engagement" icon={<BarChart />}>
            {renderChart('bar')}
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ChartCard title="Conversion Rate" icon={<BarChart />}>
            {renderChart('bar')}
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;