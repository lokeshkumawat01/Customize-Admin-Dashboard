import React, { useState } from 'react';
import {
  Box, Grid, Typography, Paper, Stack, Avatar, LinearProgress, Button, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import {
  Person, ShoppingCart, MonetizationOn, ArrowUpward, ArrowDownward
} from '@mui/icons-material';
import CountUp from 'react-countup';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const dummyChartData = [
  { date: 'Jun 01', orders: 120, revenue: 2200 },
  { date: 'Jun 02', orders: 90, revenue: 1800 },
  { date: 'Jun 03', orders: 150, revenue: 2600 },
  { date: 'Jun 04', orders: 80, revenue: 1700 },
  { date: 'Jun 05', orders: 200, revenue: 3000 },
  { date: 'Jun 06', orders: 180, revenue: 2800 },
  { date: 'Jun 07', orders: 160, revenue: 2500 },
];

const pieData = {
  weekly: [
    { name: 'India', value: 400 },
    { name: 'USA', value: 300 },
    { name: 'UK', value: 300 },
    { name: 'Germany', value: 200 },
  ],
  monthly: [
    { name: 'India', value: 1000 },
    { name: 'USA', value: 700 },
    { name: 'UK', value: 600 },
    { name: 'Germany', value: 500 },
  ],
  yearly: [
    { name: 'India', value: 12000 },
    { name: 'USA', value: 9500 },
    { name: 'UK', value: 8500 },
    { name: 'Germany', value: 6000 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ title, value, icon, change, positive, color }) => (
  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
        <Typography variant="h4" fontWeight={600} mt={1}>
          <CountUp end={value} duration={1.5} separator="," />
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
          {positive ? (
            <ArrowUpward sx={{ color: 'success.main', fontSize: 16 }} />
          ) : (
            <ArrowDownward sx={{ color: 'error.main', fontSize: 16 }} />
          )}
          <Typography variant="body2" color={positive ? 'success.main' : 'error.main'}>
            {change}
          </Typography>
        </Stack>
      </Box>
      <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 56, height: 56 }}>
        {icon}
      </Avatar>
    </Stack>
  </Paper>
);

const ProjectCard = ({ title, progress, daysLeft, color }) => (
  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
    <Typography variant="subtitle1" fontWeight={500} mb={1}>{title}</Typography>
    <LinearProgress variant="determinate" value={progress} sx={{
      height: 8, borderRadius: 4, mb: 1,
      '& .MuiLinearProgress-bar': { backgroundColor: color }
    }} />
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">Progress</Typography>
      <Typography variant="body2" color="text.secondary">{daysLeft} days left</Typography>
    </Stack>
  </Paper>
);

const DashboardHome = () => {
  const [stats] = useState({ users: 24500, orders: 1250, revenue: 18000, conversion: 4.8 });
  const [pieRange, setPieRange] = useState('weekly');

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>Dashboard Overview</Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}><StatCard title="Total Users" value={stats.users} icon={<Person />} change="+2.5%" positive color="primary" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Revenue" value={stats.revenue} icon={<MonetizationOn />} change="+8.1%" positive color="success" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Orders" value={stats.orders} icon={<ShoppingCart />} change="-1.9%" positive={false} color="warning" /></Grid>
        <Grid item xs={12} md={3}><StatCard title="Conversion" value={stats.conversion + '%'} icon={<Person />} change="+0.6%" positive color="info" /></Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Line Chart - Weekly Sales</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dummyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Bar Chart - Revenue</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dummyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>Export by Country</Typography>
              <ToggleButtonGroup value={pieRange} exclusive onChange={(e, val) => val && setPieRange(val)} size="small">
                <ToggleButton value="weekly">Weekly</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="yearly">Yearly</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData[pieRange]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData[pieRange].map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Area Chart - Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dummyChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} mb={3}>Active Projects</Typography>
            <Stack spacing={2}>
              <ProjectCard title="Website Redesign" progress={75} daysLeft={12} color="primary" />
              <ProjectCard title="Mobile App" progress={45} daysLeft={24} color="success" />
              <ProjectCard title="API Integration" progress={90} daysLeft={5} color="warning" />
              <ProjectCard title="Dashboard UI" progress={30} daysLeft={18} color="info" />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
