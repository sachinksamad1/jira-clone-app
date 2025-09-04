import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsLoggedIn } from './store/auth/auth.selectors';
import { AuthActions } from './store/auth/auth.actions';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jira-clone-app');

    private store = inject(Store);

  isLoggedIn$ : Observable<boolean> = this.store.select(selectIsLoggedIn);

  onLogout(){
    this.store.dispatch(AuthActions.logout());
  }
}
