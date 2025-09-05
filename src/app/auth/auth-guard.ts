import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/auth.selectors'; 
import { take, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map((isLoggedIn: any) => {
      if (isLoggedIn) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  )
};
