import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {localStorageSync} from 'ngrx-store-localstorage';
import { authReducer } from './store/auth/auth.reducer';


import { routes } from './app.routes';
import { environment } from '../environments/env';
import { AuthEffects } from './store/auth/auth.effects';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { TasksEffects } from './store/tasks/tasks.effects';
import { usersReducers } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { commentsReducer } from './store/comments/comments.reducer';
import { CommentsEffects } from './store/comments/comments.effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys : ['auth'],
    rehydrate : true,
  })(reducer);
}

const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      router : routerReducer,
      auth : authReducer,
      tasks : tasksReducer,
      users : usersReducers,
      comments : commentsReducer,
    }, {metaReducers}),
    provideEffects([AuthEffects, TasksEffects, UsersEffects, CommentsEffects]),
    provideStoreDevtools(),
    provideRouterStore(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],
};