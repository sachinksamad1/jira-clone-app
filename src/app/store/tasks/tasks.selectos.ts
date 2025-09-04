import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState, TaskWithAssignee } from "./tasks.model";
import { selectAllUsers } from "../users/users.selectors";
import { selectCurrentUserId } from "../auth/auth.selectors";

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  (state) => state.tasks
);

export const selectTasksWithAssigneeInfo = createSelector(
  selectAllTasks,
  selectAllUsers,
  (tasks, users) : TaskWithAssignee[] => {

    const usersMap = new Map(users.map(user => [user.uid, user.name]));

    return tasks.map(task => ({
      ...task,
      assigneeName : task.assigneeId ? usersMap.get(task.assigneeId) : undefined
    }));

  }
);

export const selectTodoTasksWithAssignee = createSelector(
  selectTasksWithAssigneeInfo,
  (tasks) => tasks.filter(task => task.status === 'To Do')
);

export const selectInProgressTasksWithAssignee = createSelector(
  selectTasksWithAssigneeInfo,
  (tasks) => tasks.filter(task => task.status === 'In Progress')
);

export const selectDoneTasksWithAssignee = createSelector(
  selectTasksWithAssigneeInfo,
  (tasks) => tasks.filter(task => task.status === 'Done')
);


export const selectMyTasks = createSelector(
  selectTasksWithAssigneeInfo,
  selectCurrentUserId,
  (tasks, currentUserId) => {
    if(!currentUserId) return [];
    return tasks.filter(task =>
      task.assigneeId === currentUserId
    )
  }
)