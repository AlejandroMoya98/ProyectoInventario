import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  
  title = 'Inventario de productos';

  usuarioLogueado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Suscripción al estado de autenticación
    this.authService.estaLogueado().subscribe((estado) => {
      this.usuarioLogueado = estado;
      // Redirigir al Login si no está logueado
      if (!estado && this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    });
  }

  irALogin() {
    this.router.navigate(['/login']); // Navega a la página de Login
  }

  cerrarSesion() {
    this.authService.cerrarSesion(); // Actualiza el estado de autenticación
    alert('Has cerrado sesión con éxito.');
  }
  
}
