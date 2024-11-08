import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './models/producto.model';

/*interface Producto {
  id?: number;
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}*/

@Injectable({
  providedIn: 'root'
})
export class ServicioProductoService {

  private apiUrl = 'http://localhost:3000/api/productos';  // URL de la API

  constructor(private http: HttpClient) { }

  //private productos: Producto[] = [];

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  modificarUnidades(id: number, cantidad: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { cantidad }); 
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarProducto(termino: string): Observable<Producto[]> {
    const url = `${this.apiUrl}?tipoProducto_like=${termino}`;
    return this.http.get<Producto[]>(url);
  }

}



