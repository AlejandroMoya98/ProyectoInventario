import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogueado = new BehaviorSubject<boolean>(this.verificarEstadoInicial());
  private usuariosAutorizados: { usuario: string; contrasena: string }[] = [
    { usuario: 'admin', contrasena: '1234' }, // Usuarios precargados
    { usuario: 'usuario1', contrasena: '5678' }
  ];

  // Verificar el estado inicial de login al cargar la app
  private verificarEstadoInicial(): boolean {
    return localStorage.getItem('usuarioLogueado') === 'true';
  }

  iniciarSesion(usuario: string, contrasena: string): boolean {
    const usuarioValido = this.usuariosAutorizados.some(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioValido) {
      localStorage.setItem('usuarioLogueado', 'true'); 
    }

    this.usuarioLogueado.next(usuarioValido); // Actualiza el estado de login
    return usuarioValido;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.usuarioLogueado.next(false);
  }

  estaLogueado(): Observable<boolean> {
    return this.usuarioLogueado.asObservable();
  }

  
}
