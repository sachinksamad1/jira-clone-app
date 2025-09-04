import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { selectAuthState } from '../../store/auth/auth.selectors';
import { AuthActions} from '../../store/auth/auth.actions';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
private store = inject(Store);

//form
email = '';
password = '';

// error & isloading
isLoading$ : Observable<boolean> = this.store.select(selectAuthState).pipe(
  map(loadingState => loadingState.isLoading)
);

error$ : Observable<string | null> = this.store.select(selectAuthState).pipe(
  map(errorMessage => errorMessage.error)
);

onSubmit(){
  this.store.dispatch(AuthActions.login({
    email : this.email,
    password : this.password
  }))
}
}
