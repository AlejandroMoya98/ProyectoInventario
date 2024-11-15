import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Producto } from './models/producto.model';
import { tap } from 'rxjs/operators';

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

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.cargarProductos(); // Cargar los productos al inicializar el servicio
   }

  private cargarProductos() {
    // Método privado para cargar los productos y actualizar el BehaviorSubject
  this.http.get<Producto[]>(this.apiUrl).subscribe({
    next: (productos) => this.productosSubject.next(productos),
    error: (error) => console.error('Error al cargar productos:', error)
  });
  }


  //private productos: Producto[] = [];

  getProductos(): Observable<Producto[]> {
    return this.productos$; // Retornar el observable de productos
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto).pipe(
      tap(() => this.cargarProductos()) // Actualizar la lista después de añadir un producto
    );
  }

  modificarUnidades(id: number, cantidad: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { cantidad }).pipe(
      tap(() => this.cargarProductos()) // Actualizar la lista después de modificar unidades
    );
  }

  // Método para modificar el tipo de producto y precio
  modificarProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${producto.id}`, producto).pipe(
      tap(() => this.cargarProductos())
    );
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.cargarProductos())
    );
  }

  buscarProducto(termino: string): Observable<Producto[]> {
    const url = `${this.apiUrl}?tipoProducto_like=${termino}`;
    return this.http.get<Producto[]>(url);
  }

}



