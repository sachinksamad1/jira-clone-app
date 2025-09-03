import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { AuthActions } from "./auth.actions";
import { catchError, map, switchMap, of, mergeMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    //login
    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(({ email, password }: { email: string; password: string }) => this.authService.login(email, password).pipe(
            map(userCred => AuthActions.loginSuccess({uid: userCred.user.uid, email: userCred.user.email})),
            catchError(error => of(AuthActions.loginFailure({error: error.message})))
        ))
    ));

    //register
    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        switchMap(({ name, email, password })=> this.authService.register(email, password).pipe(
            mergeMap(userCred => this.authService.createUserDocument(userCred.user.uid, userCred.user.email!, name).pipe(
                map(() => AuthActions.registerSuccess({uid: userCred.user.uid, email: userCred.user.email}))
            )),
            catchError(error => of(AuthActions.registerFailure({error: error.message})))
        ))
    )); 

    //logout
    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this.authService.logout().pipe(
            map(() => AuthActions.logoutSuccess()),
            tap(() => this.router.navigate(['/login'])),
        ))
    ));


    //authSucsess
    authSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/board']))
    ), { dispatch: false }
)

}