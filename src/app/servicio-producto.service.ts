import { Injectable } from '@angular/core';

interface Producto {
  tipoProducto: string;
  precio: number;
  cantidadProducto: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioProductoService {

  //constructor() { }

  private productos: Producto[] = [];

  getProductos(): Producto[]  {
    return this.productos;
  }

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }

  modificarUnidades(index: number, cantidad: number) {
    if (this.productos[index].cantidadProducto + cantidad >= 0) {
      this.productos[index].cantidadProducto += cantidad;
    } else {
      throw new Error('No se pueden eliminar más unidades de las disponibles.');
    }
  }

  buscarProducto(termino: string): Producto[] {
    return this.productos.filter(p => p.tipoProducto.toLowerCase().includes(termino.toLowerCase()));
  }

}



