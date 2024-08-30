
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: "Personal", tasks: [], completedTasks: [] },
  { name: "Work", tasks: [], completedTasks: [] },
  { name: "Shopping", tasks: [], completedTasks: [] },
  { name: "Fitness", tasks: [], completedTasks: [] },
];

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { listIndex, task } = action.payload;
      state[listIndex].tasks.push(task);
    },
    completeTask: (state, action) => {
      const { listIndex, taskIndex } = action.payload;
      const task = state[listIndex].tasks.splice(taskIndex, 1)[0];
      state[listIndex].completedTasks.push(task);
    },
    addList: (state, action) => {
      const newListName = action.payload;
      state.push({ name: newListName, tasks: [], completedTasks: [] });
    },
  },
});

export const { addTask, completeTask, addList } = listsSlice.actions;
export default listsSlice.reducer;
