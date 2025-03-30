import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUserId().pipe(
      take(1),
      map((userId) => {
        if (!userId) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
