import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter, first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Task } from '../../store/tasks/tasks.model';
import { User } from '../../store/users/users.model';
import { selectAllUsers } from '../../store/users/users.selectors';
import { UsersActions } from '../../store/users/users.actions';
import { TasksActions } from '../../store/tasks/tasks.actions';
import { selectCurrentUserId } from '../../store/auth/auth.selectors';
import { CommentWithAuthName } from '../../store/comments/comments.model';
import { selectCommentsWithAuthorDetails } from '../../store/comments/comments.selectors';
import { CommentsActions } from '../../store/comments/comments.actions';

@Component({
  selector: 'app-add-edit-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-task.html',
  styleUrl: './add-edit-task.scss'
})
export class AddEditTask implements OnInit{
  private store = inject(Store);

   @Input() task?: Task | null;
  //add

  //edit
   @Output() close = new EventEmitter<void>();

   //form

   taskData : {
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    assigneeId: string | null;
   } = {
    title : '',
    description : '',
    status : 'To Do',
    assigneeId : null
   }

   isEditMode = false;

   users$ : Observable<User[]> = this.store.select(selectAllUsers);

   comments$ : Observable<CommentWithAuthName[]> = this.store.select(selectCommentsWithAuthorDetails);
   newComment = '';


   ngOnInit(): void {
     this.store.dispatch(UsersActions.loadUsers());

     if(this.task){
      this.isEditMode = true;
      this.taskData = {
        title : this.task.title,
        description: this.task.description,
        status: this.task.status,
        assigneeId: this.task.assigneeId || null
      }
      this.store.dispatch(CommentsActions.loadComments({taskId : this.task.id}))
     }else{
      this.isEditMode = false;
     }

   }

  onSubmit(){

    const payload = {
        title : this.taskData.title,
        description: this.taskData.description,
        status: this.taskData.status,
        assigneeId: this.taskData.assigneeId === null ? undefined : this.taskData.assigneeId
    }

    if(this.isEditMode && this.task){
      this.store.dispatch(TasksActions.updateTask({
        task : {id : this.task.id, ...payload}
      }))
    }else{
      //for new
      this.store.select(selectCurrentUserId).pipe(
        filter(uid => !!uid),
        first()
      ).subscribe(reporterId => {
        this.store.dispatch(TasksActions.addTask({
          taskData : {...payload, reporterId : reporterId!}
        }));
      });
    }

    this.onClose();
    //add
    //edit
  }

   onClose(): void {
    this.close.emit();
  }

  onAddComment(){
    if(!this.newComment.trim() || !this.task) return;
    this.store.dispatch(CommentsActions.addComment({taskId : this.task?.id, content :this.newComment}));
    this.newComment = '';
  }

}
