import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogueado = new BehaviorSubject<boolean>(false); // Estado del login
  private usuariosAutorizados: { usuario: string; contrasena: string }[] = [
    { usuario: 'admin', contrasena: '1234' }, // Usuarios precargados
    { usuario: 'usuario1', contrasena: '5678' }
  ];

  

  iniciarSesion(usuario: string, contrasena: string): boolean {
    const usuarioValido = this.usuariosAutorizados.some(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    );

    this.usuarioLogueado.next(usuarioValido); // Actualiza el estado de login
    return usuarioValido;
  }

  cerrarSesion(): void {
    this.usuarioLogueado.next(false);
  }

  estaLogueado(): Observable<boolean> {
    return this.usuarioLogueado.asObservable();
  }

  
}
