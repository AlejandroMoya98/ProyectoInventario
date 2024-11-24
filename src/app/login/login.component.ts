import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const logueado = this.authService.iniciarSesion(this.username, this.password);
    if (logueado) {
      alert('Inicio de sesión exitoso.');
      this.router.navigate(['/home']); 
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}
