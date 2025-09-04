import { createReducer, on } from "@ngrx/store";
import { TasksState } from "./tasks.model";
import { TasksActions } from "./tasks.actions";

export const initialState : TasksState = {
  tasks: [],
  isLoading: false,
  error: null
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state) => ({
    ...state,
    isLoading : true
  })),
  on(TasksActions.loadTasksSuccess, (state, {tasks}) => ({
    ...state,
    tasks,
    isLoading : false,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(TasksActions.addTaskSuceess, (state, {task}) => ({
    ...state,
    tasks : [...state.tasks, task]
  })),
  on(TasksActions.updateTaskSuccess, (state, {task}) => ({
    ...state,
    tasks : state.tasks.map((t) => (t.id === task.id ? {...t, ...task} : t)),
  })),

    on(TasksActions.deleteTaskSuccess, (state, {taskId}) => ({
    ...state,
    tasks : state.tasks.filter((t) => t.id !== taskId),
  })),

    on(TasksActions.addTaskFailure, TasksActions.updateTaskFailure, TasksActions.deleteTaskFailure, (state, { error }) => ({
      ...state,
      error
  }))

)