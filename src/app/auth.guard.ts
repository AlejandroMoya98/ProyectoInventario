import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.estaLogueado().pipe(
      take(1), // Asegura que solo se emite un valor
      tap((logueado) => {
        if (!logueado) {
          alert('No puedes acceder sin iniciar sesión.');
          this.router.navigate(['/login']);
        }
      })
    );
  }
  
}
