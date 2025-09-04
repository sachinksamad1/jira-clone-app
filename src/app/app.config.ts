import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/env';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer} from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { usersReducers } from './store/users/users.reducer';
import { commentsReducer } from './store/comments/comments.reducer';
import { TasksEffects } from './store/tasks/tasks.effects';
import { UsersEffects } from './store/users/users.effects';
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
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({
      router: routerReducer,
      auth: authReducer,
      tasks: tasksReducer,
      users: usersReducers,
      comments: commentsReducer
    }, { 
      metaReducers 
    }),
    provideEffects([AuthEffects, TasksEffects, UsersEffects, CommentsEffects]),
    provideStoreDevtools(),
    provideRouterStore(), 
    provideFirebaseApp(() => 
      initializeApp(environment.firebaseConfig)), // firebase configuration using envirnoments
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore())
]
};
