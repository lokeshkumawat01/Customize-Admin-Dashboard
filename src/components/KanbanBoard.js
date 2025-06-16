import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, Stack, TextField, Avatar, Badge,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

import {
  Add, Delete, Edit, DragIndicator
} from '@mui/icons-material';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columnIds = ['todo', 'inProgress', 'review', 'done'];
const columnTitles = {
  todo: 'To Do',
  inProgress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

const initialColumns = columnIds.reduce((acc, id) => {
  acc[id] = { id, title: columnTitles[id], taskIds: [] };
  return acc;
}, {});

const initialTasks = {
  task1: {
    id: 'task1',
    title: 'Design layout',
    description: 'Wireframe for dashboard',
    assignee: 'John Doe',
    priority: 'high',
    status: 'todo',
    date: 'Jun 20',
  },
  task2: {
    id: 'task2',
    title: 'Login Page',
    description: 'Implement login with auth',
    assignee: 'Jane Smith',
    priority: 'medium',
    status: 'inProgress',
    date: 'Jun 22',
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Populate initial column taskIds from task.status
  useEffect(() => {
    const newColumns = { ...initialColumns };
    Object.values(tasks).forEach(task => {
      newColumns[task.status].taskIds.push(task.id);
    });
    setColumns(newColumns);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setColumns({ ...columns, [newColumn.id]: newColumn });
      return;
    }

    const newStart = {
      ...start,
      taskIds: start.taskIds.filter(id => id !== draggableId),
    };
    const newFinish = {
      ...finish,
      taskIds: [...finish.taskIds.slice(0, destination.index), draggableId, ...finish.taskIds.slice(destination.index)],
    };

    // Update task status
    setTasks(prev => ({
      ...prev,
      [draggableId]: {
        ...prev[draggableId],
        status: destination.droppableId,
      },
    }));

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const addTask = (columnId) => {
    if (!newTaskTitle.trim()) return;
    const id = `task${Date.now()}`;
    const newTask = {
      id,
      title: newTaskTitle,
      description: newTaskDescription,
      assignee: 'Unassigned',
      priority: 'medium',
      status: columnId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setTasks({ ...tasks, [id]: newTask });
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: [...columns[columnId].taskIds, id],
      },
    });
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const deleteTask = (taskId) => {
    const task = tasks[taskId];
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];

    const updatedColumn = {
      ...columns[task.status],
      taskIds: columns[task.status].taskIds.filter(id => id !== taskId),
    };

    setTasks(updatedTasks);
    setColumns({ ...columns, [task.status]: updatedColumn });
  };

  const openEditDialog = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEditTask = () => {
    setTasks(prev => ({
      ...prev,
      [editTaskId]: {
        ...prev[editTaskId],
        title: editTitle,
        description: editDescription,
      }
    }));
    setEditTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleStatusChange = (taskId, newStatus) => {
    const oldStatus = tasks[taskId].status;
    if (oldStatus === newStatus) return;

    const updatedTask = {
      ...tasks[taskId],
      status: newStatus,
    };

    setTasks(prev => ({ ...prev, [taskId]: updatedTask }));

    // Remove from old column
    const updatedOld = {
      ...columns[oldStatus],
      taskIds: columns[oldStatus].taskIds.filter(id => id !== taskId),
    };

    // Add to new column
    const updatedNew = {
      ...columns[newStatus],
      taskIds: [...columns[newStatus].taskIds, taskId],
    };

    setColumns({ ...columns, [oldStatus]: updatedOld, [newStatus]: updatedNew });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Kanban Board
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {columnIds.map((colId) => {
            const column = columns[colId];
            return (
              <Droppable droppableId={colId} key={colId}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minWidth: 300,
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{column.title}</Typography>
                      <Badge badgeContent={column.taskIds.length} color="primary" />
                    </Box>

                    <Stack spacing={2} mb={2}>
                      <TextField
                        size="small"
                        placeholder="Task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        size="small"
                        placeholder="Description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => addTask(colId)}
                      >
                        Add Task
                      </Button>
                    </Stack>

                    <Stack spacing={2}>
                      {column.taskIds.map((taskId, index) => {
                        const task = tasks[taskId];
                        return (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  backgroundColor: 'background.default',
                                  position: 'relative',
                                }}
                              >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Box>
                                    <Typography fontWeight={600}>{task.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {task.description}
                                    </Typography>
                                  </Box>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton size="small" onClick={() => openEditDialog(task)}>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => deleteTask(task.id)}>
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Stack>
                                </Box>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                                  <Chip
                                    label={task.priority}
                                    size="small"
                                    color={getPriorityColor(task.priority)}
                                    variant="outlined"
                                  />
                                  <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                      value={task.status}
                                      label="Status"
                                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    >
                                      {columnIds.map(status => (
                                        <MenuItem key={status} value={status}>
                                          {columnTitles[status]}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Stack>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                  <Typography variant="caption">{task.date}</Typography>
                                  <Avatar
                                    alt={task.assignee}
                                    src={`https://i.pravatar.cc/30?u=${task.assignee}`}
                                    sx={{ width: 24, height: 24 }}
                                  />
                                </Stack>

                                <Box sx={{
                                  position: 'absolute',
                                  top: 8,
                                  left: 8,
                                  color: 'text.disabled',
                                }}>
                                  <DragIndicator fontSize="small" />
                                </Box>
                              </Paper>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Stack>
                  </Paper>
                )}
              </Droppable>
            );
          })}
        </Box>
      </DragDropContext>

      {/* Edit Task Dialog */}
      <Dialog open={Boolean(editTaskId)} onClose={() => setEditTaskId(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTaskId(null)}>Cancel</Button>
          <Button variant="contained" onClick={saveEditTask}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KanbanBoard;
