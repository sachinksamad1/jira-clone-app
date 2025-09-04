import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from './task.service';
import { TasksActions } from './tasks.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TasksActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  //addEffect
  addtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      switchMap(({ taskData }) =>
        this.taskService.addTask(taskData).pipe(
          map((docRef) =>
            TasksActions.addTaskSuceess({
              task: { ...taskData, id: docRef.id },
            })
          ),
          catchError((error) =>
            of(TasksActions.addTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

    updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map(() => TasksActions.updateTaskSuccess({ task })),
          catchError((error) => of(TasksActions.updateTaskFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({ taskId }) =>
        this.taskService.deleteTask(taskId).pipe(
          map(() => TasksActions.deleteTaskSuccess({ taskId })),
          catchError((error) => of(TasksActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );

}