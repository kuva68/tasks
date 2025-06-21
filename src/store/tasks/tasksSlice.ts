import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/interfaces';
import { RootState } from '../type';

interface TasksState {
  items: ITask[];
  activeTask: ITask | null;
}

const initialState: TasksState = {
  items: [],
  activeTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.items = action.payload;
    },
    setActiveTask: (state, action: PayloadAction<ITask | null>) => {
      state.activeTask = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectActiveTask = (state: RootState) => state.tasks.activeTask;
export const selectTasksResult = (state: RootState) =>
  (state.tasksApi.queries['subscribeTasks(undefined)']?.data as ITask[]) || [];

export const { setTasks, setActiveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
